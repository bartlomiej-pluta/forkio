(function ($) {
  'use strict';

  var scrollTop = 0;
  var scrollThreshold = $(window).height() / 2;

  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();

    if (scrollTop >= scrollThreshold) {
      $('.navbar').addClass('navbar--shrink');
      $('#navbarNavDropdown').collapse('hide');
    } else {
      $('.navbar').removeClass('navbar--shrink');
    }
  });

  $('.reviews__content').slick({
    nextArrow: '<img class="slick-next" src="img/social/arrow-right.svg">',
    prevArrow: '<img class="slick-prev" src="img/social/arrow-left.svg">',
    autoplay: true,
    autoplaySpeed: 4000,
  });

  $(window).resize(function() {
    $('#navbarNavDropdown').collapse('hide');
  });
})(jQuery);

(function ($) {
  "use strict";

  const p = $('#github-watchers');
  $.get({
    //url: 'https://api.github.com/repos/bartlomiej-pluta/forkio',
    url: 'https://localhost',
    success: function(data) {
      p.text((data ? data.watchers_count : 'No') + ' Watchers');
    },
  });
})(jQuery);
