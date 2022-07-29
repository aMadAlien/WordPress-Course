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
            <!-- THE PROFESSOR -->
            <div class="container container--narrow page-section">
                <!-- THE PROFESSOR CONTENT -->
                <div class="gereric-content">
                    <div class="row group">
                        <!-- PROFESSOR`S PHOTO -->
                        <div class="one-third">
                            <?php the_post_thumbnail(); ?>
                        </div>
                        <div class="two-third">
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
