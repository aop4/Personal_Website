$(document).ready(function() {

	var typewriterSlideIndex = $('#typewriter').index('.photo-gallery .view') - 1;
	var typewriter = new NaturalTypewriter({
		'interval':80,
		'flexibility':50,
		'backtrackProbability':0.003,
		'backtrackDelay':400
	});
	var heightChangeInterval;


	$('.photo-gallery').on('beforeChange', 
	function(event, slick, currSlide, nextSlide) {
		//if we're sliding forward to the typewriter slide
		if (nextSlide === typewriterSlideIndex && currSlide < nextSlide) {
			startTypeWriterSlide();
		}
	});

	function startTypeWriterSlide() {
		//prevent any typing from a previous view of this slide
		typewriter.killActivity();
		var typewriterDescription = $('#typewriter-description')[0];
		//clear the slide of text written earlier
		$('#typewriter-repo').text('');
		typewriterDescription.innerHTML = '';
		$('#typewriter-demo').text('');
		//write out the slide's contents in order
		appendText($('#typewriter-repo')[0], 'NaturalTypewriter.js', 0);
		appendText(typewriterDescription, " is a native JavaScript typewriter. ", 0);
		appendText(typewriterDescription, "I would explain what that means, but it's probably pretty clear by this point. ", 1000)
		appendText(typewriterDescription, "I am kind of obsessed with random number generators, so I wanted to see what it would be like if a typewriter library operated with a random speed and random errors to simulate a person typing. ", 1000);
		appendText(typewriterDescription, "It ended up being an interesting, thought-provoking project that took me into the depths of JavaScript and asynchronous programming and forced me to think more about library usability than I've ever had to. ", 1000);
		appendText(typewriterDescription, "Here's the real ", 1000);
		appendText($('#typewriter-demo')[0], 'demo.', 0);
	}

	function appendText(domElement, text, delay) {
		typewriter.append({
			domElement: domElement,
			text: text,
			delay: delay
		});
	}

	/*
	function adjustTypewriterContainerHeight() {
		targetHeight = $('#typewriter').height() + 200;
		animateElementHeight($('.slick-list'), targetHeight);
	}

	function resetHeights() {
		animateElementHeight($('.slick-list'), "auto");
	}

	function animateElementHeight(element, targetHeight) {
		element.animate({
			height: targetHeight
		}, 500);
	}
	*/

});
