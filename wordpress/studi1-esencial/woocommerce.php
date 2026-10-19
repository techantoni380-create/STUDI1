<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="contenido" class="wrap section wc-shell">
<?php if (function_exists('woocommerce_content')) { woocommerce_content(); } else { echo '<p>La tienda estará disponible próximamente.</p>'; } ?>
</main>
<?php get_footer(); ?>
