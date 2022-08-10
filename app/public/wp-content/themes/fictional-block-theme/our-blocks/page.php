<?php

while(have_posts()) {
        the_post();
        // MAIN SCREEN
        pageBanner(array());
        ?>


    <!-- 2 btns under main screen -->
    <div class="container container--narrow page-section">
        <?php
            $theParent = wp_get_post_parent_id(get_the_ID());
            if($theParent) { ?>
                <div class="metabox metabox--position-up metabox--with-home-link">
                    <p>
                        <a class="metabox__blog-home-link" href="<?php echo get_permalink($theParent); ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($theParent); ?></a>
                        <span class="metabox__main"><?php echo the_title(); ?></span>
                    </p>
                </div>
            <?php }
        ?>


        <!-- MENU SIDEBAR -->
        <?php 
        // retrieves list(array) of pages (but only in memory)
        $testArray = get_pages(array(
            'child_of' => get_the_ID() 
        ));

        if($theParent or $testArray) { ?>
        <div class="page-links">
            <!-- the menu title and its link depends on the parent -->
            <h2 class="page-links__title"><a href="<?php echo get_permalink($theParent); ?>"><?php echo get_the_title($theParent); ?></a></h2>
            <ul class="min-list">
                <?php

                    // children page-links will appear depending on parent
                    if($theParent) {
                        $findChildrenOf = $theParent;
                    } else {
                        $findChildrenOf = get_the_ID();
                    }

                    // retrieves and displays list of the pages
                    wp_list_pages(array(
                        // remote work 'Pages'
                        'title_li' => NULL,
                        // add all children-page-links
                        'child_of' => $findChildrenOf,
                        // change the order of pages. It has to be written correct order in wordpress editor too
                        'sort_column' => 'menu_order'
                    ));
                ?>
            </ul>
        </div>
        <?php } ?>

        <!-- THE PAGE CONTENT -->
        <div class="generic-content">
            <?php the_content(); ?>
        </div>
    </div>
<?php } ?>