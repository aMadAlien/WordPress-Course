<?php

function generateProfessorHTML($id) {
    $profPost = new WP_Query(array(
        'post_type' => 'professor',
        'p' => $id
    ));

    while($profPost -> have_posts()) {
        $profPost -> the_post();
        ob_start(); ?>
        <div class="professor-callout">
            <!-- displays photo dinamically via css, "professorPortrait" is size -->
            <div class="professor-callout__photo" style="background-image: url(<?php the_post_thumbnail_url('professorPortrait') ?>)"></div>
            <!-- displays professor's name and desc. -->
            <div class="professor-callout__text">
                <h5><?php the_title(); ?></h5>
                <p><?php echo wp_trim_words(get_the_content(), 30); ?></p>

                <?php
                    $relatedPrograms = get_field('related_programs');
                    // if a professor has 1 and more programs:
                    if ($relatedPrograms) { ?>
                        <p><?php echo wp_strip_all_tags(get_the_title()); ?> teaches: 
                            <!-- dispalys programs title -->
                            <?php foreach($relatedPrograms as $key => $program) {
                                echo get_the_title($program);
                                // separates programs by ", " if they are >2
                                if ($key != array_key_last($relatedPrograms) && count($relatedPrograms) > 1) {
                                    echo ', ';
                                }
                            // "poin" after the last program
                            } ?>.
                        </p>
                    <?php }
                ?>

                <!-- link to professor's page -->
                <p><strong><a href="<?php the_permalink() ?>">Learn more about <?php the_title() ?> &raquo;</a></strong></p>

            </div>
        </div>
        <?php
        wp_reset_postdata();
        return ob_get_clean();
    }
}