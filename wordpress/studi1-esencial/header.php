<?php defined('ABSPATH') || exit; ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#101722">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> data-page="<?php echo esc_attr(is_front_page() ? 'inicio' : get_post_field('post_name', get_queried_object_id())); ?>">
<?php wp_body_open(); ?>
<script id="studi-config" type="application/json"><?php echo wp_json_encode(studi1_config(), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?></script>
<?php studi1_fragment('header', true); ?>
