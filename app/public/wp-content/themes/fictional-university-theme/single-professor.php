<?php

    get_header();

    while(have_posts()) {
        the_post(); 
            // MAIN SCREEN (in function)
            pageBanner();
            ?>
            <!-- THE PROFESSOR -->
            <div class="container container--narrow page-section">
                <!-- THE PROFESSOR CONTENT -->
                <div class="generic-content">
                    <div class="row group">
                        <!-- PROFESSOR`S PHOTO -->
                        <div class="one-third">
                            <?php the_post_thumbnail('professorPortrait'); ?>
                        </div>
                        <div class="two-thirds">
                            <?php
                                $likeCount = new WP_Query(array(
                                    'post_type' => 'like',
                                    'meta_query' => array(
                                        array(
                                            'key' => 'liked_professor_id',
                                            'compare' => '=',
                                            'value' => get_the_ID()
                                        )
                                    )
                                ));

                                // did someone like this post? - status "no"
                                $existStatus = 'no';

                                $existQuery = new WP_Query(array(
                                    'author' => get_current_user_id(),
                                    'post_type' => 'like',
                                    'meta_query' => array(
                                        array(
                                            'key' => 'liked_professor_id',
                                            'compare' => '=',
                                            'value' => get_the_ID()
                                        )
                                    )
                                ));

                                // if someone liked this post - status "yes"
                                if($existQuery -> found_posts) {
                                    $existStatus = 'yes';
                                }

                            ?>
                            <!-- data-exists="" => check if a professor has user like already or not -->
                            <span class="like-box" data-exists="<?php echo $existStatus ?>">
                                <i class="fa fa-heart-o" aria-hidden="true"></i>
                                <i class="fa fa-heart" aria-hidden="true"></i>
                                <span class="like-count"><?php echo $likeCount->found_posts; ?></span>
                            </span>
                            <?php the_content(); ?>
                        </div>
                    </div>
                </div>

                <!-- RELATIVE PROGRAMS SECTION -->
                    <?php 
                        // retrieves the value(array) of the field(programs)
                        $relatedPrograms = get_field('related_programs');

                        // programs will be dispalys only if they exsist for some event
                        if ($relatedPrograms) {
                            echo '<hr class="section-break">';
                            echo '<h2 class="headline headline--medium">Subject(s) Taught</h2>';
                            echo '<ul class="link-list min_list">';
                            // displays appropriate programs
                            foreach($relatedPrograms as $program) { ?>
                                <li><a href="<?php echo get_the_permalink($program); ?>"><?php echo get_the_title($program); ?></a></li>
                            <?php }
                            echo '</ul>';  
                        }

                    ?>

                </div>
            </div>
    <?php }

    get_footer();

?>
