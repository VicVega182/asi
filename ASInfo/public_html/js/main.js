$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function () {
    $('.service-block-item').height($('.service-block-item').width());
}).on('shown.bs.collapse', '#searchCollapse', function () {
    var $this = $(this);
    $this.find('input[type="text"]').focus();
}).on('show.bs.collapse', '.project-full-text', function () {
    var $this = $(this);
    var $parent = $this.parent(".project-item");
    $parent.addClass('active-item');
    $parent.find('.project-item-text-preview').hide();
    $parent.find('.project-item-text .red-link').hide();
}).on('hide.bs.collapse', '.project-full-text', function () {
    var $this = $(this);
    var $parent = $this.parent(".project-item");
    $parent.removeClass('active-item');
    $parent.find('.project-item-text-preview').show();
    $parent.find('.project-item-text .red-link').show();
}).on('show.bs.collapse', '.panel-collapse', function () {
    var $this = $(this);
    var $parent = $this.parent(".panel");
    $parent.addClass('panel-active');
    $parent.find('.panel-heading a span').text('—');
}).on('hide.bs.collapse', '.panel-collapse', function () {
    var $this = $(this);
    var $parent = $this.parent(".panel");
    $parent.removeClass('panel-active');
    $parent.find('.panel-heading a span').text('+');
});

(function ($) {
    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function (itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function () {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage = $('.carousel-stage').on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                    width = carousel.innerWidth();
            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        }).jcarousel({wrap: 'circular'});
        var carouselNavigation = $('.carousel-navigation').jcarousel({wrap: 'circular'});

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function () {
            var item = $(this);

            // This is where we actually connect to items.
            var target = connector(item, carouselStage);

            item
                    .on('jcarouselcontrol:active', function () {
                        carouselNavigation.jcarousel('scrollIntoView', this);
                        item.addClass('active');
                        $('.carousel-navigation-block .counter').text(item.data('count'));
                        $('.carousel-text').text(item.data('text'));
                    })
                    .on('jcarouselcontrol:inactive', function () {
                        item.removeClass('active');
                    })
                    .jcarouselControl({
                        target: target,
                        carousel: carouselStage
                    });
        });

        // Setup controls for the stage carousel
        $('.prev-stage')
                .on('jcarouselcontrol:inactive', function () {
                    $(this).addClass('inactive');
                })
                .on('jcarouselcontrol:active', function () {
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '-=1'
                });

        $('.next-stage')
                .on('jcarouselcontrol:inactive', function () {
                    $(this).addClass('inactive');
                })
                .on('jcarouselcontrol:active', function () {
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '+=1'
                });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
                .on('jcarouselcontrol:inactive', function () {
                    $(this).addClass('inactive');
                })
                .on('jcarouselcontrol:active', function () {
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '-=1'
                });

        $('.next-navigation')
                .on('jcarouselcontrol:inactive', function () {
                    $(this).addClass('inactive');
                })
                .on('jcarouselcontrol:active', function () {
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '+=1'
                });
    });
})(jQuery);
