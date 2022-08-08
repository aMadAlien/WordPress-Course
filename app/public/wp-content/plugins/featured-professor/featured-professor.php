<?php

/*
  Plugin Name: Featured Professor Block Type
  Version: 1.0
  Author: Iren
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

require_once plugin_dir_path(__FILE__) . 'includes/generateProfessorHTML.php';

class FeaturedProfessor {
  function __construct() {
    add_action('init', [$this, 'onInit']);
    add_action('rest_api_init', [$this, 'profHtml']);
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
    // 1 post with its post_id has 1 and more professors with different professor_id
    register_meta('post', 'featuredprofessor', array(
      'show_in_rest' => true,
      'type' => 'number',
      'single' => false
    ));

    wp_register_script('featuredProfessorScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-i18n', 'wp-editor'));
    wp_register_style('featuredProfessorStyle', plugin_dir_url(__FILE__) . 'build/index.css');

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