<?php 

    // if the user is logged out, "my notes" page is disabled
    if(!is_user_logged_in()) {
        wp_redirect(esc_url(site_url('/')));
        exit;
    }

    while(have_posts()) {
        the_post();
        // MAIN SCREEN
        pageBanner(array());
        ?>

    <!-- NOTES CONTENT -->
    <div class="container container--narrow page-section">

    <!-- CREATE NOTE FIELD -->
    <div class="create-note">
        <h2 class="headline headline--medium">Create New Note</h2>
        <input class="new-note-title" placeholder="Title">
        <textarea class="new-note-body" palceholder="Your note here..."></textarea>
        <span class="submit-note">Create Note</span>
        <span class="note-limit-message">Note limit reached: delete an existing note to make room for new one.</span>
    </div>

    <ul class="min-list link-list" id="my-notes">
        <?php
            $userNotes = new WP_Query(array(
                'post_type' => 'note',
                'posts_per_page' => -1,
                'author' => get_current_user_id()
            ));

            while($userNotes -> have_posts()) {
                $userNotes -> the_post(); ?>
                <li data-id="<?php the_ID(); ?>">
                    <!-- displays the title of each note (without the status word (private) before)-->
                    <input readonly class="note-title-field" value="<?php echo str_replace('Private: ', '',esc_attr(get_the_title())); ?>">
                    <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
                    <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
                    <!-- displays the body of the main content of each note -->
                    <textarea readonly class="note-body-field"><?php echo esc_textarea(wp_strip_all_tags(get_the_content())); ?></textarea>
                    <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                </li>
            <?php } ?>
        </ul>
    </div>
<?php } ?>