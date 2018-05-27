/**
 * Title:   Orenda - HTML App Landing Page - Main Javascript file
 * Author:  http://themeforest.net/user/5studiosnet
 **/

(function() {
    'use strict';

    // Avoid `console` errors in browsers that lack a console.
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any code in here.
$(function() {
    'use strict';

    /**
     * STICKY MENU
     **/
    var $navbar = $(".navigation"),
        stickyPoint = 90;

    function navbarSticky() {
        if ($(window).scrollTop() >= stickyPoint) {
            $navbar.addClass("navbar-sticky");
        } else {
            $navbar.removeClass("navbar-sticky");
        }
    }

    $(window).scroll(function () {
        navbarSticky();
    });

    navbarSticky();

    /**
     * SCROLLING NAVIGATION
     * Enable smooth transition animation when scrolling
     **/
    $('a.scrollto').on('click', function (event) {
        event.preventDefault();

        var scrollAnimationTime = 1200;
        var target = this.hash;

        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, scrollAnimationTime, 'easeInOutExpo', function () {
            window.location.hash = target;
        });
    });

    /**
     *  NAVBAR SIDE COLLAPSIBLE - On Mobiles
     **/
    $(".navbar-toggler").on("click", function() {
        $navbar.toggleClass("navbar-expanded");
    });

    /** Signup toggler **/
    $(".tgl-signup").on('click', function() {
        $('body').toggleClass("signup-visible");
        $navbar.removeClass("navbar-expanded");
    });

    /** PLUGINS INITIALIZATION */
    /* Bellow this, you can remove the plugins you're not going to use.
     * If you do so, remember to remove the script reference within the HTML.
     **/

    /**
     * AOS
     * Cool scrolling animations
     **/
    AOS.init({
        offset: 200,
        duration: 1500,
        disable: "mobile"
    });

    /**
     * Swiper Initialization
     **/
    $('.swiper-container').each(function() {
        var $this = $(this);

        var breakPoints =  false;
        var autoplay = $this.data('sw-autoplay') || 2500;
        var speed = $this.data('sw-speed') || 1100;
        var effect = $this.data('sw-effect') || "slide";
        var showItems = $this.data('sw-show-items') || 1;
        var loop = $this.data('sw-loop') || true;
        var centered = $this.data('sw-centered-slides') || true;
        var spaceBetween = (showItems > 1) ? 20 : 0;
        var scrollItems = $this.data('sw-scroll-items') || 1;
        var navigationElement = $this.data('sw-navigation');
        var paginationElement = $this.data('sw-pagination') || '.swiper-pagination';

        var stretch = $this.data('sw-cover-stretch') || 0;
        var depth = $this.data('sw-cover-depth') || 0;
        var modifier = $this.data('sw-cover-modifier') || 1;

        var pagination = {
            pagination: {
                el: paginationElement,
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };

        if (navigationElement) {
            pagination.onTransitionEnd = function (sw) {
                $('.active', navigationElement).removeClass('active');
                $('.nav-item:eq('+ sw.realIndex +')', navigationElement).addClass('active');
            }
        }

        var swiper = new Swiper (this, $.extend({
            loop: loop,
            slidesPerGroup: scrollItems,
            spaceBetween: spaceBetween,
            centeredSlides: centered,
            breakpoints: breakPoints,
            slidesPerView: showItems,
            autoplay: {
                delay: autoplay,
                disableOnIteration: false
            },
            speed: speed,
            parallax: true,
            effect: effect,
            coverflow: {
                rotate: 0,
                stretch: stretch,
                depth: depth, // 100
                modifier: modifier,
                slideShadows : false
            }
        }, pagination));

        if (navigationElement) {
            $(navigationElement).on('click', '.nav-item', function (evt) {
                evt.preventDefault();

                var $item = $(this);

                if ($item.hasClass('active')) {
                    return false;
                }

                var index = $item.index();
                swiper.slideTo(index + 1);

                $item.siblings('.active').removeClass('active');
                $item.addClass('active');

                return false;
            });
        }
    });

    /**
     * ParticlesJs initialization
     **/
    if (document.getElementById("particles")) {
        particlesJS.load('particles', 'js/particles/bubbles.json');
    }

    /**
     * typed.js
     **/
    if ($(".typed").length) {
        var typed = new Typed('.typed', {
            strings: ['Easy', 'Shine', 'Great', 'Perfect'],
            typeSpeed: 100,
            backDelay: 600,
            backSpeed: 50,
            loop: true
        });
    }
});
