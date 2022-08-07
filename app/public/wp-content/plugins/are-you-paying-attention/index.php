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
        add_action('enqueue_block_editor_assets', array($this, 'adminAssets'));
    }

    function adminAssets() {
        wp_enqueue_script('ournewblocktype', plugin_dir_url(__FILE__) . 'test.js', array('wp-blocks', 'wp-element'));
    }
}

$AreYouPayingAttention = new AreYouPayingAttention();