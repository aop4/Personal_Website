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
  
  enableArrowNav();

  //catch all click events and enable arrow-key navigation should they occur outside the carousel
  $(document).on('click', function(e) {
  	enableArrowNav();
  });

});

/*enables user to slide left and right with arrow keys*/
function enableArrowNav() {
	$('.slick-list').first().attr('tabindex', 0).focus();
}