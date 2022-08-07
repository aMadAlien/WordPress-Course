<?php

/*
Plugin Name: Are you paying attention quiz
Description: Give your readers a multiple choise question.
Version: 1.0
Author: Iren
*/

// exit if accessed directly
if(! defined('ABSPATH')) exit; 

class AreYouPayingAttention {
    function __construct() {
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets() {
        wp_register_style('quizeditcss', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type('ourplugin/are-you-paying-attention', array(
            'editor_script' => 'ournewblocktype',
            'editor_style' => 'quizeditcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    function theHTML($attributes) {
        ob_start(); ?>
        <h3>Today the sky is <?php echo esc_html($attributes['skyColor']) ?> and the grass is <?php echo esc_html($attributes['grassColor']) ?>!</h3>
        <?php return ob_get_clean();
    }
    
}

$AreYouPayingAttention = new AreYouPayingAttention();