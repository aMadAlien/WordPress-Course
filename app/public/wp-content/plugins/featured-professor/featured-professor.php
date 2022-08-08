<?php

/*
  Plugin Name: Featured Professor Block Type
  Version: 1.0
  Author: Iren
  Text Domain: featured-professor
  Domain Path: /languages
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

require_once plugin_dir_path(__FILE__) . 'includes/generateProfessorHTML.php';
require_once plugin_dir_path(__FILE__) . 'includes/relatedPostsHTML.php';

class FeaturedProfessor {
  function __construct() {
    add_action('init', [$this, 'onInit']);
    add_action('rest_api_init', [$this, 'profHtml']);
    add_filter('the_content', [$this, 'addRelatedPosts']);
  }

  // adds a list of related post under professor content in a professor page
  function addRelatedPosts($content) {
    if (is_singular('professor') && in_the_loop() && is_main_query()) {
      return $content . relatedPostsHTML(get_the_id());
    }
    return $content;
  }

  function profHtml() {
    register_rest_route('featuredProfessor/v1', 'getHTML', array(
      'method' => WP_REST_SERVER::READABLE,
      'callback' => [$this, 'getProfHtml']
    ));
  }

  function getProfHtml($data) {
    return generateProfessorHTML($data['profId']);
  }

  function onInit() {
    load_plugin_textdomain('featured-professor', false, dirname(plugin_basename(__FILE__)) . '/languages');

    // 1 post with its post_id has 1 and more professors with different professor_id
    register_meta('post', 'featuredprofessor', array(
      'show_in_rest' => true,
      'type' => 'number',
      'single' => false
    ));

    wp_register_script('featuredProfessorScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-i18n', 'wp-editor'));
    wp_register_style('featuredProfessorStyle', plugin_dir_url(__FILE__) . 'build/index.css');

    wp_set_script_translations('featuredProfessorScript', 'featured-professor', plugin_dir_path(__FILE__) . '/languages');

    register_block_type('ourplugin/featured-professor', array(
      'render_callback' => [$this, 'renderCallback'],
      'editor_script' => 'featuredProfessorScript',
      'editor_style' => 'featuredProfessorStyle'
    ));
  }

  function renderCallback($attributes) {
    if ($attributes['profId']) {
      // if block is used, enqueuee styles
      wp_enqueue_style('featuredProfessorStyle');
      // diaplays the layout in frontend
      return generateProfessorHTML($attributes['profId']);
    } else {
      // if no professor is selected we can't update the post
      return NULL;
    }
  }
}

$featuredProfessor = new FeaturedProfessor();