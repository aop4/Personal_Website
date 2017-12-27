$(document).ready(function(){
  $('.photo-gallery').slick({
  	//centerMode: true,
  	//vertical: true,
  	// slidesToShow: 1,
  	// centerMode: true,
  	// centerPadding: '5%',
  	// infinite: false,
  	// adaptiveHeight: true
  	infinite: true,
  	speed: 300,
  	slidesToShow: 1,
  	adaptiveHeight: true,
  	prevArrow: $('.left-arrow'),
  	nextArrow: $('.right-arrow'),
  	accessibility: true
  });
  $('.slick-active').trigger("click"); //enables user to slide left and right with arrow keys
});