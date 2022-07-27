<?php

    get_header();

    while(have_posts()) {
        the_post(); ?>
        <h1>This is a page, not a post</h1>
        <!-- create a link for the title of the post -->
        <h2><?php echo the_title(); ?></h2>
        <!-- print content of the post -->
        <?php the_content(); ?>
    <?php }

    get_footer();

?>