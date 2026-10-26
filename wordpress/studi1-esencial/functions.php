<?php
/** STUDI-1: integración con las páginas y los flujos oficiales de WooCommerce. */
defined('ABSPATH') || exit;
require_once get_template_directory() . '/inc/enrollment.php';

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
    add_theme_support('woocommerce', array('product_grid' => array('default_columns' => 3)));
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
});

add_action('wp_enqueue_scripts', function () {
    $base = get_template_directory_uri();
    wp_enqueue_style('studi1', $base . '/assets/css/styles.css', array(), '2.0.0');
    wp_enqueue_style('studi1-dossier', $base . '/assets/css/dossier.css', array('studi1'), '1.1.0');
    wp_enqueue_style('studi1-media', $base . '/assets/css/real-media.css', array('studi1'), '2.0.0');
    wp_enqueue_script('studi1-media', $base . '/assets/js/real-media.js', array(), '2.0.0', true);
    wp_enqueue_style('studi1-info', $base . '/assets/css/gym-info.css', array('studi1'), '1.0.0');
    wp_enqueue_style('studi1-commerce', $base . '/assets/css/woocommerce.css', array('studi1'), '2.0.0');
    wp_enqueue_style('studi1-enrollment', $base . '/assets/css/enrollment.css', array('studi1'), '1.1.0');
    wp_enqueue_style('studi1-logo', $base . '/assets/css/logo-animation.css', array('studi1'), '5.1.0');
    wp_enqueue_script('studi1-gym-data', $base . '/assets/js/gym-data.js', array(), '3.1.0', true);
    wp_enqueue_script('studi1', $base . '/assets/js/app.js', array('studi1-gym-data'), '2.4.0', true);
    wp_enqueue_script('studi1-enrollment-model', $base . '/assets/js/enrollment-model.js', array('studi1-gym-data'), '2.0.0', true);
    wp_enqueue_script('studi1-enrollment', $base . '/assets/js/enrollment.js', array('studi1-enrollment-model'), '2.1.0', true);
    if (function_exists('is_checkout') && is_checkout()) {
        wp_enqueue_style('studi1-payment-card', $base . '/assets/css/payment-card.css', array('studi1'), '1.0.0');
        wp_enqueue_script('studi1-payment-card', $base . '/assets/js/payment-card.js', array('jquery'), '1.0.0', true);
    }
    wp_enqueue_script('studi1-shine', $base . '/assets/js/logo-shine.js', array('studi1-logo'), '1.0.0', true);
    wp_enqueue_script('studi1-logo-data', $base . '/assets/js/logo-morph-data.js', array(), '5.1.0', true);
    wp_enqueue_script('studi1-logo-morph', $base . '/assets/js/logo-morph.js', array('studi1-logo-data'), '5.1.0', true);
    wp_enqueue_script('studi1-logo', $base . '/assets/js/logo-animation.js', array('studi1-logo-morph'), '5.1.0', true);
});

function studi1_url($file) {
    $parts = explode('#', $file, 2);
    $map = array('index.html' => '', 'gimnasio.html' => 'gimnasio', 'servicios.html' => 'servicios', 'actividades.html' => 'actividades', 'tienda.html' => 'tienda', 'inscripcion.html' => 'inscripcion', 'legal.html' => 'informacion-legal');
    if ($parts[0] === 'checkout.html' && function_exists('wc_get_checkout_url')) {
        $url = wc_get_checkout_url();
    } elseif ($parts[0] === 'tienda.html' && function_exists('wc_get_page_permalink') && wc_get_page_id('shop') > 0) {
        $url = wc_get_page_permalink('shop');
    } elseif ($parts[0] === 'index.html') {
        $url = home_url('/');
    } else {
        $slug = isset($map[$parts[0]]) ? $map[$parts[0]] : '';
        $page = $slug ? get_page_by_path($slug) : null;
        $url = $page ? get_permalink($page) : home_url('/' . $slug . '/');
    }
    return $url . (isset($parts[1]) ? '#' . rawurlencode($parts[1]) : '');
}

function studi1_cart_link() {
    if (!function_exists('WC') || !WC()->cart) {
        return '';
    }
    return '<a class="icon-button cart-trigger" href="' . esc_url(wc_get_cart_url()) . '" aria-label="Ver carrito"><i data-icon="bag"></i><span>' . absint(WC()->cart->get_cart_contents_count()) . '</span></a>';
}

function studi1_fragment($name, $partial = false) {
    $allowed = $partial ? array('header', 'footer', 'rates') : array('index', 'gimnasio', 'servicios', 'actividades', 'legal');
    if (!in_array($name, $allowed, true)) { return; }
    $path = get_template_directory() . '/content/' . ($partial ? 'partials/' : 'pages/') . $name . '.html';
    if (!is_readable($path)) { return; }
    $html = file_get_contents($path);
    $html = str_replace('assets/', esc_url(get_template_directory_uri() . '/assets/'), $html);
    $html = preg_replace_callback('/href="([a-z-]+\.html(?:#[a-z-]+)?)"/', function ($m) {
        return 'href="' . esc_url(studi1_url($m[1])) . '"';
    }, $html);
    if ($partial && $name === 'header') {
        $html = preg_replace('/<div class="preview-bar".*?<\/div>/s', '', $html);
        $html = preg_replace('/<button class="icon-button cart-trigger".*?<\/button>/s', studi1_cart_link(), $html);
        $logo_id = get_theme_mod('custom_logo');
        if ($logo_id) {
            $logo_url = wp_get_attachment_image_url($logo_id, 'full');
            if ($logo_url) { $html = str_replace(esc_url(get_template_directory_uri() . '/assets/img/logo-oficial.png'), esc_url($logo_url), $html); }
        }
    }
    if ($partial && $name === 'footer') {
        $html = preg_replace('/<dialog\b[^>]*\bid="(?:cart-dialog|product-dialog|result-dialog)"[^>]*>.*?<\/dialog>/s', '', $html);
        $logo_id = get_theme_mod('custom_logo');
        if ($logo_id) {
            $logo_url = wp_get_attachment_image_url($logo_id, 'full');
            if ($logo_url) { $html = str_replace(esc_url(get_template_directory_uri() . '/assets/img/logo-oficial.png'), esc_url($logo_url), $html); }
        }
    }
    // HTML de archivos del tema, nunca contenido de una petición o de un visitante.
    echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function studi1_config() {
    $path = get_template_directory() . '/assets/data/gym.json';
    $gym = is_readable($path) ? json_decode(file_get_contents($path), true) : array();
    if (!is_array($gym)) { $gym = array(); }
    $pages = array();
    foreach (array('index.html', 'gimnasio.html', 'servicios.html', 'actividades.html', 'tienda.html', 'inscripcion.html', 'index.html#contacto', 'gimnasio.html#equipo', 'actividades.html#clases', 'actividades.html#horarios', 'inscripcion.html#tarifas', 'inscripcion.html#entrenamientos', 'inscripcion.html#otros-servicios') as $file) { $pages[$file] = studi1_url($file); }
    $phone = get_theme_mod('studi1_phone', '') ?: ($gym['phone'] ?? '');
    return array_merge($gym, array(
        'mode' => 'woocommerce', 'assetBase' => get_template_directory_uri() . '/assets', 'pages' => $pages,
        'phone' => $phone,
        'phoneDisplay' => $phone === ($gym['phone'] ?? '') ? ($gym['phoneDisplay'] ?? $phone) : $phone,
        'whatsapp' => get_theme_mod('studi1_whatsapp', ''), 'email' => get_theme_mod('studi1_email', ''),
        'address' => get_theme_mod('studi1_address', '') ?: ($gym['address'] ?? ''),
        'hours' => get_theme_mod('studi1_hours', '') ?: ($gym['hours'] ?? '')
    ));
}

add_action('customize_register', function ($customizer) {
    $customizer->add_section('studi1_settings', array('title' => 'STUDI-1: contacto y alta', 'priority' => 30));
    $fields = array('studi1_phone' => array('Teléfono para llamadas', 'text', 'sanitize_text_field'), 'studi1_whatsapp' => array('WhatsApp (prefijo y número)', 'text', 'sanitize_text_field'), 'studi1_email' => array('Correo de contacto', 'email', 'sanitize_email'), 'studi1_address' => array('Dirección completa', 'text', 'sanitize_text_field'), 'studi1_hours' => array('Horarios', 'textarea', 'sanitize_textarea_field'));
    foreach (studi1_enrollment_catalog() as $plan) {
        $fields[studi1_enrollment_setting($plan['id'])] = array('ID WooCommerce · ' . $plan['group'] . ' · ' . $plan['name'], 'number', 'absint');
    }
    foreach ($fields as $id => $field) {
        $customizer->add_setting($id, array('default' => '', 'sanitize_callback' => $field[2]));
        $customizer->add_control($id, array('label' => $field[0], 'section' => 'studi1_settings', 'type' => $field[1]));
    }
});

add_filter('woocommerce_add_to_cart_fragments', function ($fragments) {
    $link = studi1_cart_link();
    // Icono SVG servido directamente porque este fragmento se reemplaza por AJAX.
    $link = str_replace('<i data-icon="bag"></i>', '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/></svg>', $link);
    $fragments['.cart-trigger'] = $link;
    return $fragments;
});
