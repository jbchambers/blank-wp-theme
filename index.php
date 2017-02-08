<?php get_header(); ?>
<div class="page-content clearfix">
    <div class="main-content column">
        <h1>Blog</h1>
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article>
                <h2><?php the_title(); ?></h2>
                <?php the_excerpt(); ?>
                <a class="more" href="<?= get_permalink(); ?>">Read More</a>
            </article>
        <?php endwhile;
        else : ?>
            <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
        <?php endif; ?>
    </div>
    <div class="sidebar column">
        <div class="menu-wrap">
            <?php dynamic_sidebar('sidebar') ?>
        </div>
    </div>
</div>
<?php get_footer(); ?>
