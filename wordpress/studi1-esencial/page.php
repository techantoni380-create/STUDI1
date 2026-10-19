<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="contenido" class="wrap section wc-shell">
<?php while (have_posts()) : the_post(); ?>
<h1 class="section-title"><?php the_title(); ?></h1>
<div class="page-content"><?php the_content(); ?></div>
<?php endwhile; ?>
</main>
<?php get_footer(); ?>
