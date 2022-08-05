<?php

/*
Plugin Name: Our Test Plugin
Description: A truly amazing plugin.
Version: 1.0
Author: Iren

*/

add_filter('the_content', 'addToEnfOfPost');

function addToEnfOfPost($content) {
    if (is_single() && is_main_query()) {
        return $content . '<p>My name is Iren</p>';
    }

    return $content;
}