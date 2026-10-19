<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="contenido" class="wrap section wc-shell">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<article class="page-content"><h1 class="section-title"><?php the_title(); ?></h1><?php the_content(); ?></article>
<?php endwhile; else : ?><h1 class="section-title">CONTENIDO NO DISPONIBLE</h1><a class="button lime" href="<?php echo esc_url(home_url('/')); ?>">Volver al inicio</a><?php endif; ?>
</main>
<?php get_footer(); ?>
