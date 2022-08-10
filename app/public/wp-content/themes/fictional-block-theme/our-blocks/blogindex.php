<?php

pageBanner(array(
    'title' =>'Welcome to our blog!',
    'subtitle' => 'Keep up with our latest news.'
));
?>
<!-- CONTENT -->
<div class="container container--narrow page-section">
    <?php
        while(have_posts()) {
            the_post(); ?>
            <!-- THE POST -->
            <div classpost-item>
                <!-- POST TITLE -->
                <h2 class="headline headline--medium headline--post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <!-- ADDITIONAL INFORMATION -->
                <div class="metabox">
                    <p>Posted by <?php the_author_posts_link(); ?> on <?php the_time('n.j.y'); ?> in <?php echo get_the_category_list(', '); ?></p>
                </div>
                <div class="generic-content">
                    <!-- THE POST CONTENT -->
                    <?php the_excerpt(); ?>
                    <!-- BTN "READ MORE" -->
                    <p><a class="btn btn--blue" href="<?php the_permalink(); ?>">Continue reading &raquo</a></p>
                </div>
            </div>
    <?php } 
        // PAGINATION
        echo paginate_links();
    ?>
</div>