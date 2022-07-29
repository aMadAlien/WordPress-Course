<!-- get_header and get_footer functions add header and footer from header.php and footer.php file in the main index.php file -->
<?php get_header(); ?>
    <!-- MAIN SCREEN -->
    <div class="page-banner">
        <!-- the pic into 1st (welcome) section -->
        <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('/images/library-hero.jpg'); ?>)"></div>
        
        <div class="page-banner__content container t-center c-white">
            <h1 class="headline headline--large">Welcome!</h1>
            <h2 class="headline headline--medium">We think you&rsquo;ll like it here.</h2>
            <h3 class="headline headline--small">Why don&rsquo;t you check out the <strong>major</strong> you&rsquo;re interested in?</h3>
            <a href="<?php echo get_post_type_archive_link('program'); ?>" class="btn btn--large btn--blue">Find Your Major</a>
        </div>
    </div>

    <!-- START THE CONTENT SECTION -->

    <!-- STATRT THE EVENTS-LIST SECTION -->
    <div class="full-width-split group">
        <div class="full-width-split__one">
            <div class="full-width-split__inner">
                <h2 class="headline headline--small-plus t-center">Upcoming Events</h2>

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
                        )
                    )
                ));

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
                ?>


                <p class="t-center no-margin"><a href="<?php echo get_post_type_archive_link('event'); ?>" class="btn btn--blue">View All Events</a></p>
            </div>
        </div>

        <!-- START THE BLOG-LIST SECTION -->
        <div class="full-width-split__two">
            <div class="full-width-split__inner">
                <h2 class="headline headline--small-plus t-center">From Our Blogs</h2>
                <?php 
                    // present necessary amount of the posts
                    $homepagePosts = new  WP_Query(array(
                        'posts_per_page' => 2,
                    ));
                    // THE POST
                    while($homepagePosts -> have_posts()) {
                        $homepagePosts -> the_post(); ?>
                        <div class="event-summary">
                            <!-- THE TIME -->
                            <a class="event-summary__date event-summary__date--beige t-center" href="<?php the_permalink(); ?>">
                                <span class="event-summary__month"><?php the_time('M'); ?></span>
                                <span class="event-summary__day"><?php the_time('d'); ?></span>
                            </a>
                            <!-- POST CONTENT -->
                            <div class="event-summary__content">
                                <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                                <p><?php if(has_excerpt()) {
                                    // for changed excerpt in WordPress for some special
                                    echo get_the_excerpt();
                                } else {
                                    echo wp_trim_words(get_the_content(), 18);
                                }
                                ?><a href="<?php the_permalink(); ?>" class="nu gray">Read more</a></p>
                            </div>
                        </div>
                    <!-- after looping through a separate query, this function restores the $post global to the current post in the main query. -->
                    <?php } wp_reset_postdata();
                ?>
                <p class="t-center no-margin"><a href="<?php echo site_url('/blog'); ?>" class="btn btn--yellow">View All Blog Posts</a></p>
            </div>
        </div>
    </div>

    <!-- START THE SLIDER SECTION -->
    <div class="hero-slider">
        <div data-glide-el="track" class="glide__track">
            <div class="glide__slides">
                <!-- the 1st pic into 3rd (slide) section -->
                <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('images/bus.jpg'); ?>)">
                    <div class="hero-slider__interior container">
                        <div class="hero-slider__overlay">
                            <h2 class="headline headline--medium t-center">Free Transportation</h2>
                            <p class="t-center">All students have free unlimited bus fare.</p>
                            <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                        </div>
                    </div>
                </div>
                <!-- the 2nd pic into 3rd (slide) section -->
                <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('images/apples.jpg'); ?>)">
                    <div class="hero-slider__interior container">
                        <div class="hero-slider__overlay">
                            <h2 class="headline headline--medium t-center">An Apple a Day</h2>
                            <p class="t-center">Our dentistry program recommends eating apples.</p>
                            <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                        </div>
                    </div>
                </div>
                <!-- the 3rd pic into 3rd (slide) section -->
                <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('images/bread.jpg'); ?>)">
                    <div class="hero-slider__interior container">
                        <div class="hero-slider__overlay">
                            <h2 class="headline headline--medium t-center">Free Food</h2>
                            <p class="t-center">Fictional University offers lunch plans for those in need.</p>
                            <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slider__bullets glide__bullets" data-glide-el="controls[nav]"></div>
        </div>
    </div>

<?php get_footer(); ?>