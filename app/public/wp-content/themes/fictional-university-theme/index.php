<?php

    while(have_posts()) {
        the_post(); ?>
        <!-- create a link for the title of the post -->
        <h2><a href="<?php the_permalink(); ?>"><?php echo the_title(); ?></a></h2>
        <!-- print content of the post -->
        <?php the_content(); ?>
        <hr>
    <?php }

?>