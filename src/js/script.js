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

  $('.reviews__content').slick({
    nextArrow: '<img class="slick-next" src="img/social/arrow-right.svg">',
    prevArrow: '<img class="slick-prev" src="img/social/arrow-left.svg">',
    auto: true,
  });
});
