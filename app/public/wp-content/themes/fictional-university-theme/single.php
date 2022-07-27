<?php

    while(have_posts()) {
        the_post(); ?>
        <!-- create a link for the title of the post -->
        <h2><?php echo the_title(); ?></h2>
        <!-- print content of the post -->
        <?php the_content(); ?>
    <?php }

?>
