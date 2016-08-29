$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
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