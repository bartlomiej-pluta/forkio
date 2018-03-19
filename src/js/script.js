$(document).ready(function () {
  var scrollTop = 0;

  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();

    if (scrollTop >= 100) {
      $('.navbar').addClass('navbar--shrink');
    } else if (scrollTop < 100) {
      $('.navbar').removeClass('navbar--shrink');
    }
  });
});
