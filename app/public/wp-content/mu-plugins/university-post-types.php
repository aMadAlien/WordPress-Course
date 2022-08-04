<?php

// create new post type => 'event'
// change its name to 'Events' and etc.
// change its icon to 'dashicons-calendar'
function university_post_types(){
    // EVENT POST TYPE
    register_post_type('event', array(
        // allows to create parmision to edit events for other members
        'capability_type' => 'event',
        'map_meta_cap' => true,
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
        // change 'program' to 'programs' in url address
        'rewrite' => array('slug' => 'programs'),
        // make programs avaliable
        'has_archive' => true,
        
        'public' => true,
        'show_in_rest' => true,
        'labels' => array(
            'name' => 'Programs',
            'add_new_item' => 'Add New Program',
            'edit_item' => 'Edit Program',
            'all_items' => 'All Programs',
            'singular_name' => 'Program'
        ),
        'menu_icon' => 'dashicons-awards'
    ));

    // PROFESSOR POST TYPE
    register_post_type('professor', array(
        // add excerpt field in WordPress settings
        'supports' => array('title', 'editor', 'thumbnail'),
        
        'public' => true,
        'show_in_rest' => true,
        'labels' => array(
            'name' => 'Professors',
            'add_new_item' => 'Add New Professor',
            'edit_item' => 'Edit Professor',
            'all_items' => 'All Professors',
            'singular_name' => 'Professor'
        ),
        'menu_icon' => 'dashicons-welcome-learn-more'
    ));

    // NOTE POST TYPE
    register_post_type('note', array(
        'capability_type' => 'note',
        'map_meta_cap' => true,
        // add excerpt field in WordPress settings
        'supports' => array('title', 'editor'),
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'labels' => array(
            'name' => 'Notes',
            'add_new_item' => 'Add New Notes',
            'edit_item' => 'Edit Notes',
            'all_items' => 'All Notes',
            'singular_name' => 'Note'
        ),
        'menu_icon' => 'dashicons-welcome-write-blog'
    ));

    // LIKE POST TYPE
    register_post_type('like', array(
        // add excerpt field in WordPress settings
        'supports' => array('title'),
        'public' => false,
        'show_ui' => true,
        'labels' => array(
            'name' => 'Likes',
            'add_new_item' => 'Add New Likes',
            'edit_item' => 'Edit Likes',
            'all_items' => 'All Likes',
            'singular_name' => 'Like'
        ),
        'menu_icon' => 'dashicons-heart'
    ));
}

add_action('init', 'university_post_types');