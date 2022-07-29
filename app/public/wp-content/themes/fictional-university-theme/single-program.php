<?php

    get_header();

    while(have_posts()) {
        the_post(); ?>
            <!-- MAIN SCREEN -->
            <div class="page-banner">
                <!-- the pic into 1st section -->
                <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('images/ocean.jpg'); ?>)"></div>
                <div class="page-banner__content container container--narrow">
                    <h1 class="page-banner__title"><?php echo the_title(); ?></h1>
                    <div class="page-banner__intro">
                        <p>DON'T FORGET TO REPLACE ME LATER</p>
                    </div>
                </div>
            </div>
            <!-- THE PROGRAM -->
            <div class="container container--narrow page-section">
                <div class="metabox metabox--position-up metabox--with-home-link">
                    <p>
                        <!-- BACK-PROGRAM-PAGE BUTTON -->
                        <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program'); ?>"><i class="fa fa-home" aria-hidden="true"></i>All Programs</a>
                        <!-- ADDITIONAL INFORMATION -->
                        <span class="metabox__main"><?php the_title(); ?></span>
                    </p>
                </div>
                <!-- THE PROGRAM CONTENT -->
                <div class="gereric-content"><?php the_content(); ?></div>
                
                <!-- THE RELATED EVENTS -->
                <?php 
                    $today = date('Ymd');
                    $homepageEvents = new WP_Query(array(
                        'posts_per_page' => 2,
                        'post_type' => 'event',
                        'meta_key' => 'event_date',
                        'orderby' => 'meta_value_num',
                        'order' => 'ASC',
                        'meta_query' => array(
                            array(
                                'key' => 'event_date',
                                'compare' => '>=',
                                'value' => $today,
                                'type' => 'numeric'
                            ),
                            array(
                                'key' => 'related_programs',
                                'compare' => 'LIKE',
                                'value' => '"' . get_the_ID() . '"'
                            )
                        )
                    ));

                    // check if the program has some relations
                    if ($homepageEvents -> have_posts()) {
                        
                    echo '<hr class="section-break">';
                    echo '<h2 class="headline headline--medium" >Upcomig ' . get_the_title() . ' Events</h2>';

                    while($homepageEvents -> have_posts()) {
                        $homepageEvents -> the_post(); ?>
                        <!-- THE EVENT -->
                        <div class="event-summary">
                            <!-- THE TIME 
                                the event was published and a link for it -->
                            <a class="event-summary__date t-center" href="#">
                                <span class="event-summary__month"><?php 
                                    $eventDate = new DateTime(get_field('event_date'));
                                    echo $eventDate -> format('M');
                                ?></span>
                                <span class="event-summary__day"><?php echo $eventDate -> format('d'); ?></span>
                            </a>
                            <!-- EVENT CONTENT
                                wp_trim_words() func presents necessary amount of posts words
                                get_the_content() func presents posts content -->
                            <div class="event-summary__content">
                                <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                                <p><?php if(has_excerpt()) {
                                    // for changed excerpt in WordPress for some special
                                    echo get_the_excerpt();
                                } else {
                                    echo wp_trim_words(get_the_content(), 18);
                                }
                                ?><a href="<?php the_permalink(); ?>" class="nu gray">Learn more</a></p>
                            </div>
                        </div>
                    <?php }
                    }
                ?>

            </div>
    <?php }

    get_footer();

?>
