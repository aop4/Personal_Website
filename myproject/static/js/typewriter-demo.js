$(document).ready(function() {

	var titleWriter = new NaturalTypewriter({'interval':50,
		'flexibility':40});
	titleWriter.write({'domElement':document.getElementById('header'), 
		'text':'naturaltypewriter.js'});
	titleWriter.write({'domElement':document.getElementById('natural'),
		'text':"Wondering what's so \"natural\" about it?", 'delay':700});

	var flexConfig = {'interval':80, 'flexibility':50};

	//These have to be defined once and only once--not instantiated within a
	//function call--or else duplicate typing occurs when two objects type
	//at once, when the user views a demo frame a second time
	var vanillaWriter = new NaturalTypewriter({'interval':40});
	var flexWriter = new NaturalTypewriter(flexConfig);
	var backTrackWriter = new NaturalTypewriter({'interval':80,
		'flexibility':50, 'backtrackProbability':0.03,
		'backtrackDelay':300});
	var chanceWriter = new NaturalTypewriter({'interval':40, 
		'flexibility':40});
	var audioWriter = new NaturalTypewriter({'interval':40, 
		'flexibility':40, 'infinite':true, 'audioSource':''});
	var lastWriter = new NaturalTypewriter({'interval':100});

	setTimeout(writeToVanilla, 5000);

	function writeToVanilla() {
		clearWriter(vanillaWriter);
		vanillaWriter.write({'domElement':document.getElementById('vanilla'), 
			'text':'Well, you can make it look mechanical by having it type '+
			'characters at a constant speed. But go ahead and '+
			'hit the down button...'});
	}

	function writeToFlexible() {
		clearWriter(flexWriter);
		flexWriter.write({'domElement':document.getElementById('flexible'),
			'text':"You can also make the speed vary from "+
			"one character to the next, since the way people actually "+
			"type isn't quite the way a robot would type."});
	}

	function writeToBacktrack() {
		clearWriter(backTrackWriter);
		backTrackWriter.write({'domElement':document.getElementById('backtrack'),
			'text':"There's also support for backtracking--when you mess up a "+
			"character, realize your mistake, and replace it."});
	}

	function writeToChance() {
		clearWriter(chanceWriter);
		chanceWriter.write({'domElement':document.getElementById('chance'),
			'text':"Some libraries force you to plan out changes in the flow of typing in "+
			"painstaking detail, but with naturaltypewriter.js, it's easy. "+
			"You tell it the basics of how you want it to act, and the precise details " +
			"are left up to chance."});
	}

	function writeToEnd() {
		clearWriter(lastWriter);
		//clear text that lastWriter would clear too late
		$('#end-2').text('');
		$('#end-3').text('');
		//you'll note this function uses two ways to get an element by its id... I'm
		//I'm following the style from my docs, which favor nativs JS, where applicable
		lastWriter.write({'domElement':document.getElementById('end-1'), 'text':"Your fonts..."});
		lastWriter.append({'domElement':document.getElementById('end-2'), 'text':"\nYour story..."});
		lastWriter.append({'domElement':document.getElementById('end-3'), 'text':"\nJust a bit more captivating."});
	}

	function clearWriter(typewriter) {
		typewriter.killActivity();
	}

	var typingFunctions = {
		'vanilla':writeToVanilla,
		'flexible':writeToFlexible,
		'backtrack':writeToBacktrack,
		'chance':writeToChance,
		'end':writeToEnd
	};

	function typeInFrame(nextFrame) {
		var id = nextFrame.attr('id');
		typingFunctions[id]();
	}

	function fadeIn(demoFrame) {
		demoFrame.css('opacity', '0');
		demoFrame.animate({
			'opacity':'1'
		}, 1000);
	}

	//called when the user views another component of the demo
	function switchFrames(currFrame, nextFrame) {
		currFrame.slideUp(200);
		currFrame.removeClass('active');
		typeInFrame(nextFrame);
		nextFrame.slideDown(200);
		fadeIn(nextFrame);
		nextFrame.addClass('active');
	}

	function getActiveDemo() {
		return $('.demos').find('.active');
	}

	function goDown(downBtn) {
		var currFrame = getActiveDemo();
		var nextFrame = currFrame.next();
		$('#up-btn').removeClass('grey');
		if (nextFrame.length) {
			switchFrames(currFrame, nextFrame);
		}
		if (nextFrame.next().length === 0) {
			downBtn.addClass('grey');
		}
	}

	function goUp(upBtn) {
		var currFrame = getActiveDemo();
		var nextFrame = currFrame.prev();
		$('#down-btn').removeClass('grey');
		if (nextFrame.length) {
			switchFrames(currFrame, nextFrame);
		}
		if (nextFrame.prev().length === 0) {
			upBtn.addClass('grey');
		}
	}

	$('#up-btn').click(function() {
		goUp($(this));
	});

	$('#down-btn').click(function() {
		goDown($(this));
	});

	//add support for swiping on mobile... doesn't appear to work yet
	$('.demos').swipe(function(event, direction) {
		if (direction === 'down') {
			goDown($('#down-btn'));
		}
		else if (direction === up) {
			goUp($('#up-btn'));
		}
	});


	$('body').keydown(function(e) {
		if (e.which === 38) {
			goUp($('#up-btn'));
		}
		else if (e.which === 40) {
			goDown($('#down-btn'));
		}
	});

	$('#replay-btn').click(function() {
		var currFrame = getActiveDemo();
		typeInFrame(currFrame);
	});
});