<?php

// create new post type => 'event'
// change its name to 'Events' and etc.
// change its icon to 'dashicons-calendar'
function university_post_types(){
    register_post_type('event', array(
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
}

add_action('init', 'university_post_types');