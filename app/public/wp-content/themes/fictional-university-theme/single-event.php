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
            <!-- THE EVENT -->
            <div class="container container--narrow page-section">
                <div class="metabox metabox--position-up metabox--with-home-link">
                    <p>
                        <!-- BACK-EVENT-PAGE BUTTON -->
                        <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('event'); ?>"><i class="fa fa-home" aria-hidden="true"></i>Events Home</a>
                        <!-- ADDITIONAL INFORMATION -->
                        <span class="metabox__main"><?php the_title(); ?></span>
                    </p>
                </div>
                <!-- THE EVENT CONTENT -->
                <div class="gereric-content"><?php the_content(); ?>

                <!-- RELATIVE PROGRAMS SECTION -->
                    <?php 
                        // retrieves the value(array) of the field(programs)
                        $relatedPrograms = get_field('related_programs');

                        // programs will be dispalys only if they exsist for some event
                        if ($relatedPrograms) {
                            echo '<hr class="section-break">';
                            echo '<h2 class="headline headline--medium">Related Program(s)</h2>';
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
