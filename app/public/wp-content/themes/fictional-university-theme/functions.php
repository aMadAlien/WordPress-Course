<?php

// connect styles
function university_files(){
    // connect js code
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    // add fonts
    wp_enqueue_style('custom-google0fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    // add icons to the footer
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    // connect styles from style-index.css
    wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
}

add_action('wp_enqueue_scripts', 'university_files');


function university_features(){
    // automatically change the title of the tab
    add_theme_support('title-tag');
    // automatically change the professor`s photo in the page
    add_theme_support('post-thumbnails');
    // change size of the professor`s photo
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 359, true);
}

add_action('after_setup_theme', 'university_features');


// created relations -?
function university_adjust_queries($query) {
    if (!is_admin() AND is_post_type_archive('program') AND is_main_query()) {
        $query -> set('orderby', 'title');
        $query -> set('order', 'ASC');
        $query -> set('posts_per_page', -1);
    }

    if (!is_admin() AND is_post_type_archive('event') AND $query -> is_main_query()) {
        $today = date('Ymd');
        $query -> set('meta_key', 'event_date');
        $query -> set('orderby', 'meta_value_num');
        $query -> set('order', 'ASC');
        $query -> set('meta_query', array(
            array(
                'key' => 'event_date',
                'compare' => '>=',
                'value' => $today,
                'type' => 'numeric'
            )
        ));
    }
}

add_action('pre_get_posts', "university_adjust_queries");