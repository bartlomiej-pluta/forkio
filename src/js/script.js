$(document).ready(function () {
  var scrollTop = 0;

  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();

    if (scrollTop >= 100) {
      $('#nav').addClass('shrink');
    } else if (scrollTop < 100) {
      $('#nav').removeClass('shrink');
    }
  });
});
