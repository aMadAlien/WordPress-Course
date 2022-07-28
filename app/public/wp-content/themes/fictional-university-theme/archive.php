<?php get_header(); ?>

<!-- MAIN SCREEN -->
<div class="page-banner">
    <!-- the pic into 1st section -->
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('images/ocean.jpg'); ?>)"></div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title">
            <!-- THE POST TITLE (CATEGORY OR AUTHOR) -->
            <?php the_archive_title(); ?>

            <!-- check if the page is for authors or categories
            <?php if(is_category()) {
            // THE TITLE OF THE CATEGORY
            single_cat_title();
            };
            if(is_author()) {
                // NAME OF THE AUTHOR
                echo 'Posts by '; the_author();
            }; ?> -->
        </h1>
        <div class="page-banner__intro">
            <p>
                <!-- DESCRIPTION ABOUT THE AUTHOR -->
                <?php the_archive_description(); ?>
            </p>
        </div>
    </div>
</div>

<div class="container container--narrow page-section">
    <?php
        while(have_posts()) {
            the_post(); ?>
            <!-- THE POST -->
            <div classpost-item>
                <!-- POST TITLE -->
                <h2 class="headline headline--medium headline--post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <!-- ADDITIONAL INFORMATION -->
                <div class="metabox">
                    <p>Posted by <?php the_author_posts_link(); ?> on <?php the_time('n.j.y'); ?> in <?php echo get_the_category_list(', '); ?></p>
                </div>
                <div class="generic-content">
                    <!-- THE POST CONTENT -->
                    <?php the_excerpt(); ?>
                    <!-- BTN "READ MORE" -->
                    <p><a class="btn btn--blue" href="<?php the_permalink(); ?>">Continue reading &raquo</a></p>
                </div>
            </div>
    <?php } 
        // PAGINATION
        echo paginate_links();
    ?>
</div>

<?php get_footer(); ?>