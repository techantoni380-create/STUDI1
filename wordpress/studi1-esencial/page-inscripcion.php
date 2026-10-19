<?php
/* Template Name: STUDI-1 · Inscripción */
defined('ABSPATH') || exit;
get_header();
$plans = studi1_enrollment_catalog();
$options = '';
$last_group = '';
$selected = false;
foreach ($plans as $plan) {
    if ($last_group !== $plan['group']) {
        if ($last_group !== '') { $options .= '</optgroup>'; }
        $options .= '<optgroup label="' . esc_attr($plan['group']) . '">';
        $last_group = $plan['group'];
    }
    $choose = !$selected && $plan['available'];
    $selected = $selected || $choose;
    $suffix = $plan['basis'] === 'person' ? ' / persona' : ' total';
    $price = $plan['available'] ? wp_strip_all_tags(wc_price($plan['price'])) . $suffix : 'Próximamente';
    $options .= '<option value="' . esc_attr($plan['id']) . '"' . ($choose ? ' selected' : '') . (!$plan['available'] ? ' disabled' : '') . '>' . esc_html($plan['name'] . ' · ' . html_entity_decode($price, ENT_QUOTES, 'UTF-8')) . '</option>';
}
if ($last_group !== '') { $options .= '</optgroup>'; }
$fields_path = get_template_directory() . '/content/partials/enrollment-fields.html';
$fields = is_readable($fields_path) ? file_get_contents($fields_path) : '';
$fields = preg_replace_callback('/(<select id="enrollment-plan"[^>]*>).*?(<\/select>)/s', function ($m) use ($options) { return $m[1] . $options . $m[2]; }, $fields);
?>
<main id="contenido" class="enrollment-page"><section class="wrap enrollment-layout">
<div class="enrollment-story"><img class="enrollment-photo" src="<?php echo esc_url(get_template_directory_uri() . '/assets/img/fuerza.webp'); ?>" alt="Imagen conceptual de una sala de entrenamiento"><div class="enrollment-story-copy"><p class="eyebrow white">GIMNASIO EN REUS</p><h1>TU RITMO.<br><span>TU FUERZA.</span></h1><p>En solitario, en pareja o en familia.<br>Encuentra tu forma de entrenar.</p></div></div>
<div class="enrollment-form-wrap"><p class="eyebrow">INSCRIPCIÓN ONLINE</p><h2>APÚNTATE A <span>STUDI-1</span></h2><p>Cuota individual, de pareja o familiar. Pago puntual, sin renovación automática.</p>
<ol class="steps"><li class="active"><span>1</span> Elige tu modalidad</li><li><span>2</span> Datos y pago</li></ol>
<?php if (function_exists('wc_print_notices')) { wc_print_notices(); } ?>
<form id="enrollment-form" data-mode="woocommerce" method="post" action="<?php echo esc_url(studi1_url('inscripcion.html')); ?>">
<?php wp_nonce_field('studi1_enrollment', 'studi1_nonce'); ?>
<?php echo $fields; // HTML interno del tema y opciones escapadas arriba. ?>
<div id="enrollment-description" class="enrollment-description"></div>
<input type="hidden" name="add-to-cart" value=""><input type="hidden" name="quantity" value="1">
<p class="plan-note">Completarás los datos de la primera persona, las condiciones y el pago en el siguiente paso.</p>
<button class="button lime full large" id="enrollment-submit" type="submit" disabled>Continuar a datos y pago <i data-icon="arrow"></i></button>
<noscript><p>Activa JavaScript para elegir tu inscripción o contacta con el gimnasio.</p></noscript>
</form>
<?php if (!$selected) : ?><p class="plan-note">La contratación online estará disponible próximamente. Puedes consultar todas las tarifas más abajo.</p><button class="button outline-blue full" data-contact>Contactar con el gimnasio <i data-icon="phone"></i></button><?php endif; ?>
<script id="enrollment-config" type="application/json"><?php echo wp_json_encode(array('enrollmentPlans' => $plans, 'enrollmentMaxPeople' => 12, 'currency' => function_exists('get_woocommerce_currency') ? get_woocommerce_currency() : 'EUR'), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?></script>
</div></section><?php studi1_fragment('rates', true); ?></main>
<?php get_footer(); ?>
