jQuery(document).ready(function () {

    // DROPDOWN MENUS
    jQuery(".menu-toggle").click(function ($) {
        jQuery(this).toggleClass("open");
        jQuery('header .menu').slideToggle("slow");
    });
    jQuery(".menu-item-has-children").click(function ($) {
        jQuery(this).children('.sub-menu').slideToggle("slow");
        jQuery(this).siblings('').children('.sub-menu').slideUp("fast");
    });
    jQuery(".sidebar .menu-item-has-children").click(function ($) {
        jQuery(this).toggleClass('open');
        jQuery('.menu-item-has-children.open').removeClass('open');
    });

    // MATCH HEIGHT
    jQuery('.slick-carousel .slick-slide').matchHeight();

    // SLICK CAROUSELS
    jQuery('.carousel').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });


    // SMOOTH SCROLL
    jQuery(function ($) {
        jQuery('a[href*="#more"]:not([href="#"])').click(function ($) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    jQuery('html, body').animate({scrollTop: target.offset().top}, 1000);
                    return false;
                }
            }
        });
    });
    jQuery(function ($) {
        jQuery('a[href*="#form"]:not([href="#"])').click(function ($) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    jQuery('html, body').animate({scrollTop: target.offset().top}, 1000);
                    return false;
                }
            }
        });
    });
});