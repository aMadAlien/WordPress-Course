<?php get_header(); ?>

<!-- main screen -->
<div class="page-banner">
    <!-- the pic into 1st section -->
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('images/ocean.jpg'); ?>)"></div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title">All Events</h1>
        <div class="page-banner__intro">
            <p>See what is going on in the world!</p>
        </div>
    </div>
</div>

<div class="container container--narrow page-section">
    <?php
        while(have_posts()) {
            the_post(); ?>
            <!-- THE EVENT -->
            <div class="event-summary">
                <a class="event-summary__date t-center" href="#">
                    <span class="event-summary__month"><?php the_time('M'); ?></span>
                    <span class="event-summary__day"><?php the_time('d'); ?></span>
                </a>
                <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                    <p><?php echo wp_trim_words(get_the_content(), 18); ?><a href="<?php the_permalink(); ?>" class="nu gray">Learn more</a></p>
                </div>
            </div>
    <?php } 
        // PAGINATION
        echo paginate_links();
    ?>
</div>

<?php get_footer(); ?>