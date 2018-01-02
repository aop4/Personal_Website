$(document).ready(function(){
  $('.photo-gallery').slick({
  	infinite: true,
  	speed: 300,
  	slidesToShow: 1,
  	adaptiveHeight: true,
  	prevArrow: $('.left-arrow'),
  	nextArrow: $('.right-arrow'),
  	accessibility: true
  });
  $('.slick-list').first().attr('tabindex', 0).focus(); //enables user to slide left and right with arrow keys
});