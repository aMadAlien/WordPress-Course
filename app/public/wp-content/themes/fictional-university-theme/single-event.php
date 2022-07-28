<?php

    get_header();

    while(have_posts()) {
        the_post(); ?>
            <!-- main screen section -->
            <div class="page-banner">
                <!-- the pic into 1st (Privacy Policy) section) -->
                <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('images/ocean.jpg'); ?>)"></div>
                <div class="page-banner__content container container--narrow">
                    <h1 class="page-banner__title"><?php echo the_title(); ?></h1>
                    <div class="page-banner__intro">
                        <p>DON'T FORGET TO REPLACE ME LATER</p>
                    </div>
                </div>
            </div>
            <!-- THE POST GENERAL CONTENT -->
            <div class="container container--narrow page-section">
                <div class="metabox metabox--position-up metabox--with-home-link">
                    <p>
                        <!-- BACK-BLOG-PAGE BUTTON -->
                        <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('event'); ?>"><i class="fa fa-home" aria-hidden="true"></i>Events Home</a>
                        <!-- ADDITIONAL INFORMATION -->
                        <span class="metabox__main"><?php the_title(); ?></span>
                    </p>
                </div>
                <!-- THE POST CONTENT -->
                <div class="gereric-content"><?php the_content(); ?></div>
            </div>
    <?php }

    get_footer();

?>
