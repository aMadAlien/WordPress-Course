<!-- THE EVENT TEMPLATE-->
<div class="event-summary">
    <!-- THE TIME 
        the event was published and a link for it -->
    <a class="event-summary__date t-center" href="#">
        <span class="event-summary__month"><?php 
            $eventDate = new DateTime(get_field('event_date'));
            echo $eventDate -> format('M');
        ?></span>
        <span class="event-summary__day"><?php echo $eventDate -> format('d'); ?></span>
    </a>
    <!-- EVENT CONTENT
        wp_trim_words() func presents necessary amount of posts words
        get_the_content() func presents posts content -->
    <div class="event-summary__content">
        <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
        <p><?php if(has_excerpt()) {
            // for changed excerpt in WordPress for some special
            echo get_the_excerpt();
        } else {
            echo wp_trim_words(get_the_content(), 18);
        }
        ?><a href="<?php the_permalink(); ?>" class="nu gray">Learn more</a></p>
    </div>
</div>