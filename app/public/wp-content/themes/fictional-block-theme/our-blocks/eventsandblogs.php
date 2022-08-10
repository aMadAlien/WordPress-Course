<!-- TEMPLATE FOR EVENTS AND BLOGS IN FRONTEND -->

<div class="full-width-split group">
    <!-- STATR THE EVENTS-LIST SECTION -->
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
                    ))
                ));

                while($homepageEvents -> have_posts()) {
                    $homepageEvents -> the_post();
                    // THE EVENT
                    get_template_part('template-parts/content', 'event');
                }
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