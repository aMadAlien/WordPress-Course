<?php 
get_header(); 
// MAIN SCREEN
pageBanner(array(
    'title' => 'All Events',
    'subtitle' => 'See what is going on in the world!'
));
?>

<div class="container container--narrow page-section">
    <?php
        while(have_posts()) {
            the_post(); 
            // THE EVENT
            get_template_part('template-parts/content-event');
        } 
        // PAGINATION
        echo paginate_links();
    ?>
    <hr class="section-break">
    <p>Looking for a recap of pastevents? <a href="<?php echo site_url('/past-events') ?>" >Check out our past events archive.</a></p>
</div>

<?php get_footer(); ?>