<?php

/*
Plugin Name: Our Word Filter Plugin
Description: Replaced a list of words.
Version: 1.0
Author: Iren
*/

// exit if accessed directly
if(! defined('ABSPATH')) exit; 

class OurWordFilterPlugin {

    function __construct() {
        add_action('admin_menu' ,array($this, 'ourMenu'));
    }

    function ourMenu() {
        add_menu_page('Words To Filter', 'Word Filter', 'manage_options', 'ourwordfilter', array($this, 'wordFilterPage'), 'dashicons-smiley', 100);
        add_submenu_page('ourwordfilter', 'Words To Filter', 'Words List', 'manage_options', 'ourwordfilter', array($this, 'wordFilterPage'));
        add_submenu_page('ourwordfilter', 'Word Filter Options', 'Options', 'manage_options', 'word-filter-options', array($this, 'optionsSubPage'));
    }

    // main page for plugin
    function wordFilterPage() { ?>
        hello...
    <?php }

    // subMenu => "Options"
    function optionsSubPage() { ?>
        hello... submenu
    <?php }
}

$ourWordFilterPlugin = new OurWordFilterPlugin();