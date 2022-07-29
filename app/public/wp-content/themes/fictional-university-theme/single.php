<?php

    get_header();

    while(have_posts()) {
        the_post(); 
        // MAIN SCREEN
        pageBanner();
        ?>
            <!-- THE POST -->
            <div class="container container--narrow page-section">
                <div class="metabox metabox--position-up metabox--with-home-link">
                    <p>
                        <!-- BACK-BLOG-PAGE BUTTON -->
                        <a class="metabox__blog-home-link" href="<?php echo site_url('/blog'); ?>"><i class="fa fa-home" aria-hidden="true"></i>Blog Home</a>
                        <!-- ADDITIONAL INFORMATION -->
                        <span class="metabox__main">Posted by <?php the_author_posts_link(); ?> on <?php the_time('n.j.y'); ?> in <?php echo get_the_category_list(', '); ?></span>
                    </p>
                </div>
                <!-- THE POST CONTENT -->
                <div class="gereric-content"><?php the_content(); ?></div>
            </div>
    <?php }

    get_footer();

?>
