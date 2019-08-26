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

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = jQuery('header').outerHeight();

    jQuery(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = jQuery(this).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .hideNav.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            jQuery('header').removeClass('showNav').addClass('hideNav');
        } else {
            // Scroll Up
            if(st + jQuery(window).height() < jQuery(document).height()) {
                jQuery('header').removeClass('hideNav').addClass('showNav');
            }
        }

        lastScrollTop = st;
    }


    // DECLARE EACH RESPONSIVE BREAKPOINT
    function checkWidthTablet() {
        // DESKTOP SCREEN SIZES
        if (jQuery(window).width() > 1199) {
            jQuery( "nav .menu-item-has-children" ).hover(
                function() {
                    jQuery( this ).children('.sub-menu').slideDown(500);
                }, function() {
                    jQuery( this ).children('.sub-menu').slideUp(500);
                }
            );
        }
        else {
            jQuery("nav .menu-item-has-children").click(function ($) {
                jQuery(this).children('.sub-menu').slideDown('slow');
                jQuery(this).siblings('.menu-item-has-children').children('.sub-menu').slideUp('slow');
            });
        }
    }

    checkWidthTablet();
});