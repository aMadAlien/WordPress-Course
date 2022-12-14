<?php

require get_theme_file_path('/includes/like-route.php');
// imports search-route.php file
require get_theme_file_path('/includes/search-route.php');

function university_custom_rest() {
    // add "authorName" : "name" into API array
    register_rest_field('post', 'authorName', array(
        'get_callback' => function() {return get_the_author();}
    ));
    // count number of user notes
    register_rest_field('note', 'userNoteCount', array(
        'get_callback' => function() {return count_user_posts(get_current_user_id(), 'note');}
    ));
}

add_action('rest_api_init', 'university_custom_rest');

// dispalys the main screen
function pageBanner($args = NULL) {
    if (!$args['title']) {
        $args['title'] = get_the_title();
    }

    if (!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }

    if (!$args['photo']) {
        if (get_field('page_banner_background_image') AND !is_archive() AND !is_home()) {
            $args['photo'] = get_field('page_banner_background_image')['size']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
    ?>
    <div class="page-banner">
        <!-- the pic into 1st section -->
        <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo']; ?>);"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php echo $args['title'] ?></h1>
            <div class="page-banner__intro">
                <p><?php echo $args['subtitle'] ?></p>
            </div>
        </div>
    </div>
<?php }

// connect styles
function university_files(){
    // connect js code
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    // add fonts
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    // add icons to the footer
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    // connect styles from style-index.css
    wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));

    wp_localize_script('main-university-js', 'universityData', array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
    ));
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
    // adds the styles for block banner (theme)
    add_theme_support('editor-styles');
    add_editor_style(array('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i', 'build/style-index.css', 'build/index.css'));
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


// redirects subscriber accounts out of admin and onto homepage
add_action('admin_init', 'redirectSubsToFrontend');

function redirectSubsToFrontend() {
    $ourCurrentUser = wp_get_current_user();

    if (count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == 'subscriber' ) {
        wp_redirect(site_url('/'));
        exit;
    }
}

// hides the admin bar from certain user type (subscriber)
add_action('wp_loaded', 'noSubsAdminBar');

function noSubsAdminBar() {
    $ourCurrentUser = wp_get_current_user();

    if (count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == 'subscriber' ) {
        show_admin_bar(false);
    }
}


// customuize Login Screen
// in the login screen the title has link to homepage
add_filter('login_headerurl', 'ourHeaderUrl');

function ourHeaderUrl() {
    return esc_url(site_url('/'));
}

// adds styles for the login screen
add_action('login_enqueue_scripts', 'ourLoginCSS');

function ourLoginCSS() {
    // add fonts
    wp_enqueue_style('custom-google0fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    // add icons to the footer
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    // connect styles from style-index.css
    wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
}

// changes the title in the login screen
add_filter('login_headertitle', 'ourLoginTitle');

function ourLoginTitle() {
    return get_bloginfo('name');
}


// force note posts to be private
// "10" means priority
// "2" means - we want to work with 2 parameters($data and $postarr)
add_filter('wp_insert_post_data', 'maleNotePrivate', 10, 2);

function maleNotePrivate($data, $postarr) {
    if($data['post_type'] == 'note') {
        // doesn't allow to create more than 5 notes and delete some of them
        if(count_user_posts(get_current_user_id(), 'note') > 4 AND !$postarr['ID']) {
            die("You have reached your note limit.");
        }

        // deletes possible attributes in note field written by users
        $data['post_content'] = sanitize_textarea_field($data['post_content']);
        $data['post_title'] = sanitize_text_field($data['post_title']);
    }

    // gives users notes "private" status
    if($data['post_type'] == 'note' AND $data['post_status'] != 'trash') {
        $data['post_status'] = "private";
    }

    return $data;
}


// displays "close in editor" blocks
class PlaceholderBlock {
    function __construct($name) {
        $this->name = $name;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallback($attributes, $content) {
        ob_start();
        require get_theme_file_path("/our-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/our-blocks/{$this->name}.js", array('wp-blocks', 'wp-editor'));

        register_block_type("ourblocktheme/{$this->name}", array(
            'editor_script' => $this->name,
            'render_callback' => [$this, 'ourRenderCallback']
        ));    
    }
}
new PlaceholderBlock("eventsandblogs");
new PlaceholderBlock("header");
new PlaceholderBlock("footer");
new PlaceholderBlock("singlepost");
new PlaceholderBlock("page");
new PlaceholderBlock("blogindex");
new PlaceholderBlock("programarchive");
new PlaceholderBlock("singleprogram");
new PlaceholderBlock("singleprofessor");
new PlaceholderBlock("mynotes");
new PlaceholderBlock("archivecampus");
new PlaceholderBlock("archiveevent");
new PlaceholderBlock("archive");
new PlaceholderBlock("pastevents");
new PlaceholderBlock("search");
new PlaceholderBlock("searchresults");
new PlaceholderBlock("singlecampus");
new PlaceholderBlock("singleevent");

// displays blocks
class JSXBlock {
    function __construct($name, $renderCallback = null, $data = null) {
        $this->name = $name;
        $this->data = $data;
        $this->renderCallback = $renderCallback;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallback($attributes, $content) {
        ob_start();
        require get_theme_file_path("/our-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));

        // set default img for banner into editor
        if ($this->data) {
            wp_localize_script($this->name, $this->name, $this->data);
        }

        $ourArgs = array(
            'editor_script' => $this->name
        );

        if ($this->renderCallback) {
            $ourArgs['render_callback'] = [$this, 'ourRenderCallback'];
        }

        register_block_type("ourblocktheme/{$this->name}", $ourArgs);    
    }
}

// invoke banner and generic heading and btn blocks
new JSXBlock('banner', true, ['fallbackimage' => get_theme_file_uri('/images/library-hero.jpg')]);
new JSXBlock('genericheading');
new JSXBlock('genericbutton');
// invoke slide-show and slides blocks
new JSXBlock('slideshow', true);
new JSXBlock('slide', true, ['themeimagepath' => get_theme_file_uri('/images/')]);


function myallowedblocks($allowed_block_types, $editor_context) {
    // if you are on a page/post editor => you may not use header and footer blocks
    if (!empty($editor_context->post)) {
        return $allowed_block_types;
    }

    // if you are on the front page editor => you may use header and footer blocks
    return array('ourblocktheme/header', 'ourblocktheme/footer');
}

add_filter('allowed_block_types_all', 'myallowedblocks', 10, 2);