<?php

/* Enqueue Scripts and Styles
-------------------------------------------------------------- */

function reassign_jQuery()
{
  wp_deregister_script('jquery');
  wp_deregister_script('jquery-core'); // do not forget this
  wp_deregister_script('jquery-migrate'); // do not forget this

  wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', array(), '1.12.4', TRUE);
  wp_enqueue_script('jquery');
}

if (!is_admin())
  add_action('init', 'reassign_jQuery');


function theme_name_scripts()
{

  wp_enqueue_style('screen.css', get_template_directory_uri() . '/css/screen.css');


  wp_enqueue_script('slick-carousel.js', get_template_directory_uri() . '/js/slick.js', array('jquery'), '', true);
  wp_enqueue_script('match-height.js', get_template_directory_uri() . '/js/match-height.js', array('jquery'), '', true);
  wp_enqueue_script('main', get_template_directory_uri() . '/js/site.js',
    array('jquery',
      'slick-carousel.js',
      'match-height.js'), '', true);
}

add_action('wp_enqueue_scripts', 'theme_name_scripts');


/* Remove Unnecessary Scripts
-------------------------------------------------------------- */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');

/* Register Nav-Menus
-------------------------------------------------------------- */

register_nav_menus(array(
  'main_menu' => 'Main Menu',
  'sidebar_menu' => 'Sidebar Menu',
  'practice_areas_menu' => 'Practice Areas Menu',
));

/* No Tab Conflicts Gravity Forms
-------------------------------------------------------------- */

add_filter('gform_tabindex', 'gform_tabindexer', 10, 2);
function gform_tabindexer($tab_index, $form = false)
{
  $starting_index = 1000; // if you need a higher tabindex, update this number
  if ($form)
    add_filter('gform_tabindex_' . $form['id'], 'gform_tabindexer');
  return GFCommon::$tab_index >= $starting_index ? GFCommon::$tab_index : $starting_index;
}

/* Dynamic Sidebars
-------------------------------------------------------------- */

if (function_exists('register_sidebars')) {

  register_sidebar(array(
    'name' => 'Sidebar',
    'id' => 'sidebar',
    'description' => '',
    'before_widget' => '<div id="%1$s" class="widget %2$s">',
    'after_widget' => '</div>',
    'before_title' => '<h3 class="widgettitle">',
    'after_title' => '</h3>'
  ));

  register_sidebar(array(
    'name' => 'Blog Sidebar',
    'id' => 'blog_sidebar',
    'description' => '',
    'before_widget' => '<div id="%1$s" class="widget %2$s">',
    'after_widget' => '</div>',
    'before_title' => '<h3 class="widgettitle">',
    'after_title' => '</h3>'
  ));
}

/* Add Theme Support Page Thumbnails & Title Tag
-------------------------------------------------------------- */

add_theme_support('post-thumbnails');
add_theme_support('title-tag');

/* Modify the_excerpt() " read more "
-------------------------------------------------------------- */

function new_excerpt_more($more)
{
  global $post;
  return '... <a href="' . get_permalink($post->ID) . '">' . 'read more' . '</a>';
}

add_filter('excerpt_more', 'new_excerpt_more');

/* Add Page Slug to Body Class
-------------------------------------------------------------- */
function add_slug_body_class($classes)
{
  global $post;
  if (isset($post)) {
    $classes[] = $post->post_type . '-' . $post->post_name;
  }
  return $classes;
}

add_filter('body_class', 'add_slug_body_class');


/* GRAVITY FORMS: MOVE SCRIPTS TO FOOTER
-------------------------------------------------------------- */
add_filter('gform_init_scripts_footer', '__return_true');

/* ACF: CREATE OPTIONS PAGE
-------------------------------------------------------------- */
if (function_exists('acf_add_options_page')) {
  acf_add_options_page(array(
    'page_title' => 'Theme General Settings',
    'menu_title' => 'Theme Settings',
    'menu_slug' => 'theme-general-settings',
    'capability' => 'edit_posts',
    'redirect' => false
  ));
}

/* ALLOW SVGs IN MEDIA UPLOAD
-------------------------------------------------------------- */
function cc_mime_types($mimes)
{
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}

add_filter('upload_mimes', 'cc_mime_types');

/* WP CUSTOMER REVIEWS
-------------------------------------------------------------- */
function fix_reviews_plugin()
{
  wp_deregister_script('wp-customer-reviews-3-frontend');
  wp_enqueue_script('slick-carousel.js', get_home_url() . 'plugins/wp-customer-reviews/js/wp-customer-reviews.js', array('jquery'), '', true);

}

add_action('wp_enqueue_scripts', 'fix_reviews_plugin');
