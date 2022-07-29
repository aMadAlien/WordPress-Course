<?php

// create new post type => 'event'
// change its name to 'Events' and etc.
// change its icon to 'dashicons-calendar'
function university_post_types(){
    // EVENT POST TYPE
    register_post_type('event', array(
        // add excerpt field in WordPress settings
        'supports' => array('title', 'editor', 'excerpt'),
        // change 'event' to 'events' in url address
        'rewrite' => array('slug' => 'events'),
        // make events avaliable
        'has_archive' => true,
        
        'public' => true,
        'show_in_rest' => true,
        'labels' => array(
            'name' => 'Events',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events',
            'singular_name' => 'Event'
        ),
        'menu_icon' => 'dashicons-calendar'
    ));

    // PROGRAM POST TYPE
    register_post_type('program', array(
        // add excerpt field in WordPress settings
        'supports' => array('title', 'editor'),
        // change 'event' to 'events' in url address
        'rewrite' => array('slug' => 'programs'),
        // make events avaliable
        'has_archive' => true,
        
        'public' => true,
        'show_in_rest' => true,
        'labels' => array(
            'name' => 'Programs',
            'add_new_item' => 'Add New Program',
            'edit_item' => 'Edit Program',
            'all_items' => 'All Programs',
            'singular_name' => 'Programs'
        ),
        'menu_icon' => 'dashicons-awards'
    ));
}

add_action('init', 'university_post_types');