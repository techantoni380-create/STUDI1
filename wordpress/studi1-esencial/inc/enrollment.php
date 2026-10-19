<?php
/** Solo inscripciones: selección validada; precios y cobro de WooCommerce. */
defined('ABSPATH') || exit;

function studi1_enrollment_setting($id) {
    return $id === 'membership-individual' ? 'studi1_membership_id' : 'studi1_plan_' . str_replace('-', '_', $id);
}

/** Bloquea los productos de entrenamiento vinculados en versiones anteriores. */
function studi1_training_product_ids() {
    $ids = array();
    foreach (array('members', 'nonmembers') as $audience) {
        foreach (array('individual', 'couple', 'group4') as $kind) {
            $ids[] = absint(get_theme_mod(studi1_enrollment_setting('training-' . $audience . '-' . $kind), 0));
        }
    }
    $memberships = array();
    foreach (array('individual', 'couple', 'family') as $kind) {
        $memberships[] = absint(get_theme_mod(studi1_enrollment_setting('membership-' . $kind), 0));
    }
    // Un ID reasignado explícitamente a una inscripción utiliza su nueva modalidad.
    return array_values(array_diff(array_filter(array_unique($ids)), $memberships));
}

add_filter('woocommerce_is_purchasable', function ($purchasable, $product) {
    return in_array((int) $product->get_id(), studi1_training_product_ids(), true) ? false : $purchasable;
}, 10, 2);

function studi1_enrollment_catalog() {
    $path = get_template_directory() . '/assets/data/gym.json';
    $data = is_readable($path) ? json_decode(file_get_contents($path), true) : array();
    $plans = is_array($data) && isset($data['enrollmentPlans']) ? $data['enrollmentPlans'] : array();
    $plans = array_values(array_filter($plans, function ($plan) {
        return ($plan['kind'] ?? '') === 'membership' && strpos($plan['id'] ?? '', 'membership-') === 0;
    }));
    $ids = array();
    foreach ($plans as &$plan) {
        $plan['productId'] = absint(get_theme_mod(studi1_enrollment_setting($plan['id']), 0));
        if ($plan['productId']) { $ids[] = $plan['productId']; }
    }
    unset($plan);
    $counts = array_count_values($ids);
    foreach ($plans as &$plan) {
        $product = function_exists('wc_get_product') && $plan['productId'] ? wc_get_product($plan['productId']) : false;
        $plan['available'] = $product && ($counts[$plan['productId']] ?? 0) === 1 && $product->get_status() === 'publish' && $product->is_type('simple') && $product->is_virtual() && $product->is_purchasable() && $product->is_in_stock();
        if ($product) {
            $plan['price'] = (float) wc_get_price_to_display($product);
            $plan['description'] = wp_strip_all_tags($product->get_short_description());
            if ($plan['basis'] === 'person' && $plan['people'] !== 1 && $product->is_sold_individually()) { $plan['available'] = false; }
        }
    }
    unset($plan);
    return $plans;
}

function studi1_enrollment_post($key) {
    return isset($_POST[$key]) && is_string($_POST[$key]) ? trim(sanitize_text_field(wp_unslash($_POST[$key]))) : '';
}

function studi1_enrollment_request($product_id, $quantity) {
    if (!wp_verify_nonce(studi1_enrollment_post('studi1_nonce'), 'studi1_enrollment')) {
        return new WP_Error('nonce', 'Abre de nuevo la página de inscripción para continuar.');
    }
    $key = sanitize_key(studi1_enrollment_post('studi1_plan'));
    $selected = null;
    foreach (studi1_enrollment_catalog() as $plan) {
        if ($plan['id'] === $key && (int) $plan['productId'] === (int) $product_id) { $selected = $plan; break; }
    }
    if (!$selected || !$selected['available']) { return new WP_Error('plan', 'Esta modalidad todavía no está disponible online.'); }
    $people = $selected['people'] ?: filter_var(studi1_enrollment_post('studi1_people'), FILTER_VALIDATE_INT, array('options' => array('min_range' => 1, 'max_range' => 12)));
    $expected = $selected['basis'] === 'person' ? $people : 1;
    if (!$people || (float) $quantity !== (float) $expected) { return new WP_Error('quantity', 'Revisa el número de personas en la página de inscripción.'); }
    $raw = isset($_POST['studi1_participants']) ? wp_unslash($_POST['studi1_participants']) : array();
    if (!is_array($raw) || count($raw) !== $people-1) { return new WP_Error('people', 'Indica el nombre de cada acompañante.'); }
    $names = array();
    foreach ($raw as $name) {
        if (!is_string($name)) { return new WP_Error('name', 'Revisa los nombres de los acompañantes.'); }
        $name = trim(sanitize_text_field($name));
        $length = function_exists('mb_strlen') ? mb_strlen($name) : strlen($name);
        if ($name === '' || $length > 100) { return new WP_Error('name', 'Cada acompañante necesita un nombre válido, de hasta 100 caracteres.'); }
        $names[] = $name;
    }
    return array('plan' => $selected['id'], 'name' => $selected['name'], 'people' => (int) $people,
        'quantity' => (int) $expected, 'participants' => $names);
}

add_filter('woocommerce_add_to_cart_validation', function ($passed, $product_id, $quantity) {
    if (in_array((int) $product_id, studi1_training_product_ids(), true)) {
        wc_add_notice('Los entrenamientos se acuerdan directamente con el gimnasio y no se pagan online.', 'error');
        return false;
    }
    $mapped = array_column(studi1_enrollment_catalog(), 'productId');
    if (!in_array((int) $product_id, $mapped, true)) { return $passed; }
    $details = studi1_enrollment_request($product_id, $quantity);
    if (is_wp_error($details)) { wc_add_notice($details->get_error_message(), 'error'); return false; }
    if (WC()->cart) {
        foreach (WC()->cart->get_cart() as $line) {
            if (isset($line['studi1_enrollment']) || in_array((int) $line['product_id'], $mapped, true)) {
                wc_add_notice('Ya tienes una inscripción en el carrito. Finalízala o elimínala antes de elegir otra.', 'error');
                return false;
            }
        }
    }
    return $passed;
}, 10, 3);

add_filter('woocommerce_add_cart_item_data', function ($cart_data, $product_id, $variation_id, $quantity) {
    if (!in_array((int) $product_id, array_column(studi1_enrollment_catalog(), 'productId'), true)) { return $cart_data; }
    $details = studi1_enrollment_request($product_id, $quantity);
    if (!is_wp_error($details)) { $cart_data['studi1_enrollment'] = $details; }
    return $cart_data;
}, 10, 4);

add_filter('woocommerce_add_to_cart_redirect', function ($url, $product = null) {
    return $product && in_array($product->get_id(), array_column(studi1_enrollment_catalog(), 'productId'), true) ? wc_get_checkout_url() : $url;
}, 10, 2);

add_filter('woocommerce_get_item_data', function ($rows, $line) {
    if (empty($line['studi1_enrollment'])) { return $rows; }
    $info = $line['studi1_enrollment'];
    $rows[] = array('key' => 'Modalidad', 'value' => esc_html($info['name']));
    $rows[] = array('key' => 'Personas', 'value' => absint($info['people']));
    if ($info['participants']) { $rows[] = array('key' => 'Acompañantes', 'value' => esc_html(implode(', ', $info['participants']))); }
    return $rows;
}, 10, 2);

add_filter('woocommerce_update_cart_validation', function ($passed, $key, $line, $quantity) {
    if (isset($line['studi1_enrollment']) && (float) $quantity !== 0.0 && (float) $quantity !== (float) $line['studi1_enrollment']['quantity']) {
        wc_add_notice('Para cambiar las personas, elimina esta inscripción y selecciona de nuevo la modalidad.', 'error');
        return false;
    }
    return $passed;
}, 10, 4);

add_filter('woocommerce_cart_item_quantity', function ($html, $key, $line) {
    if (empty($line['studi1_enrollment'])) { return $html; }
    return '<span>' . absint($line['quantity']) . '</span><input type="hidden" name="cart[' . esc_attr($key) . '][qty]" value="' . absint($line['quantity']) . '">';
}, 10, 3);

add_action('woocommerce_check_cart_items', function () {
    if (!WC()->cart) { return; }
    $catalog = studi1_enrollment_catalog();
    foreach (WC()->cart->get_cart() as $line) {
        if (in_array((int) $line['product_id'], studi1_training_product_ids(), true) || strpos($line['studi1_enrollment']['plan'] ?? '', 'training-') === 0) {
            wc_add_notice('Elimina el entrenamiento del carrito. Su horario se acuerda directamente con el gimnasio, sin pago online.', 'error');
            continue;
        }
        if (!in_array((int) $line['product_id'], array_column($catalog, 'productId'), true) && empty($line['studi1_enrollment'])) { continue; }
        $info = $line['studi1_enrollment'] ?? array();
        $plan = null;
        foreach ($catalog as $candidate) { if (($info['plan'] ?? '') === $candidate['id']) { $plan = $candidate; break; } }
        $people = $info['people'] ?? 0;
        $quantity = $plan && $plan['basis'] === 'person' ? $people : 1;
        $valid = $plan && $plan['available'] && $plan['productId'] === (int) $line['product_id'] && is_int($people) && $people >= 1 && $people <= 12;
        $valid = $valid && (!$plan['people'] || $plan['people'] === $people) && (float) $line['quantity'] === (float) $quantity;
        $valid = $valid && is_array($info['participants'] ?? null) && count($info['participants']) === $people-1;
        if (!$valid) { wc_add_notice('Revisa tu inscripción: elimínala del carrito y vuelve a seleccionar la modalidad y sus personas.', 'error'); }
    }
});

add_action('woocommerce_checkout_create_order_line_item', function ($item, $key, $line, $order) {
    if (empty($line['studi1_enrollment'])) { return; }
    $info = $line['studi1_enrollment'];
    $item->add_meta_data('Modalidad', $info['name']);
    $item->add_meta_data('Personas', $info['people']);
    $item->add_meta_data('Primera persona', trim($order->get_billing_first_name() . ' ' . $order->get_billing_last_name()));
    if ($info['participants']) { $item->add_meta_data('Acompañantes', implode(', ', $info['participants'])); }
}, 10, 4);

/** Vista decorativa; la pasarela mantiene sus propios campos y su validación. */
add_action('woocommerce_review_order_before_payment', function () {
    if (!WC()->cart || !WC()->cart->needs_payment()) { return; }
    $has_membership = false;
    foreach (WC()->cart->get_cart() as $line) {
        if (strpos($line['studi1_enrollment']['plan'] ?? '', 'membership-') === 0) { $has_membership = true; break; }
    }
    if (!$has_membership) { return; }
    $path = get_template_directory() . '/content/partials/payment-card.html';
    if (!is_readable($path)) { return; }
    $html = file_get_contents($path);
    $logo = get_theme_mod('custom_logo') ? wp_get_attachment_image_url(get_theme_mod('custom_logo'), 'full') : false;
    $logo = $logo ?: get_template_directory_uri() . '/assets/img/logo-oficial.png';
    $html = str_replace('assets/img/logo-oficial.png', esc_url($logo), $html);
    $html = str_replace('data-card-widget ', 'data-card-widget data-card-production ', $html);
    $html = str_replace('data-card-visa>', 'data-card-visa hidden>', $html);
    $html = str_replace('data-card-generic hidden>', 'data-card-generic>', $html);
    $html = str_replace('•••• •••• •••• 4242', '•••• •••• •••• ••••', $html);
    $html = str_replace('Vista previa de tu tarjeta · datos de muestra', 'Diseño ilustrativo · refleja tu nombre de facturación', $html);
    echo $html; // HTML interno del tema, logo escapado arriba.
    echo '<p class="payment-production-note">Elige el medio de pago a continuación. Los datos de tarjeta se introducen únicamente en los campos de la pasarela.</p>';
});
