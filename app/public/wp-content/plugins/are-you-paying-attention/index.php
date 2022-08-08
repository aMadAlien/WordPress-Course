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
        // using block.json we don't need the next 4 lines:
        // wp_register_style('quizeditcss', plugin_dir_url(__FILE__) . 'build/index.css');
        // wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type(__DIR__, array(
            // 'editor_script' => 'ournewblocktype',
            // 'editor_style' => 'quizeditcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    function theHTML($attributes) {
        // using block.json we don't this condition:
        // enqueues scripts and styles only for the page which has the block (quiz)
        // if(!is_admin()) {
        //     wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
        //     wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        // }

        ob_start(); ?>
        <div class="paying-attention-update-me"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
        <?php return ob_get_clean();
    }
    
}

$AreYouPayingAttention = new AreYouPayingAttention();