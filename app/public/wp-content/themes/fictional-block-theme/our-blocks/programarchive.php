<?php

// MAIN SCREEN
pageBanner(array(
    'title' => 'All Programs',
    'subtitle' => 'There is something for everyone.'
));
?>

<div class="container container--narrow page-section">
    <ul class="link-list min-list">
        <?php
            while(have_posts()) {
                the_post(); ?>
                <!-- THE PROGRAM -->
                <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
        <?php } 
            // PAGINATION
            echo paginate_links();
        ?>
    </ul>
</div>