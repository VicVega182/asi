$(document).ready(function () {
    $('.service-block-item').height($('.service-block-item').width());
}).on('shown.bs.collapse', '#searchCollapse', function () {
    var $this = $(this);
    $this.find('input[type="text"]').focus();
});