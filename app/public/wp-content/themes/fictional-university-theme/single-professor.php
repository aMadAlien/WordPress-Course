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
                <div class="gereric-content">
                    <div class="row group">
                        <!-- PROFESSOR`S PHOTO -->
                        <div class="one-third">
                            <?php the_post_thumbnail('professorPortrait'); ?>
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
