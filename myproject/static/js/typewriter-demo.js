$(document).ready(function() {

	var titleWriter = new NaturalTypewriter({'interval':50,
		'flexibility':40});
	titleWriter.write(document.getElementById('header'), 'naturaltypewriter.js');
	titleWriter.write(document.getElementById('natural'),
		"You may be wondering what's so \"natural\" about it");

	var flexConfig = {'interval':80, 'flexibility':40};

	//These have to be defined once and only once--not instantiated within a
	//function call--or else duplicate typing occurs when two objects type
	//at once, when the user views a demo frame a second time
	var vanillaWriter = new NaturalTypewriter({'interval':40});
	var flexWriter = new NaturalTypewriter(flexConfig);
	var backTrackWriter = new NaturalTypewriter({'interval':120,
		'flexibility':80, 'backtrackProbability':0.03});
	var chanceWriter = new NaturalTypewriter({'interval':40, 
		'flexibility':40});
	var audioWriter = new NaturalTypewriter({'interval':40, 
		'flexibility':40, 'infinite':true, 'audioSource':''});
	var lastWriter = new NaturalTypewriter({'interval':100});

	setTimeout(writeToVanilla, 4000);

	function writeToVanilla() {
		vanillaWriter.write(document.getElementById('vanilla'), 
			'Well, you can make it look mechanical by having it type '+
			'characters at a constant speed. But go ahead and '+
			'hit the down button...');
	}

	function writeToFlexible() {
		flexWriter.write(document.getElementById('flexible'),
			"You can also make the speed vary from "+
			"one character to the next, since the way people actually "+
			"type isn't quite the way a robot would type.");
	}

	function writeToBacktrack() {
		backTrackWriter.write(document.getElementById('backtrack'),
			"There's also support for backtracking--when you mess up a "+
			"character, realize your mistake, and replace it.");
	}

	function writeToChance() {
		chanceWriter.write(document.getElementById('chance'),
			"Some libraries force you to plan out changes in the flow of typing in "+
			"painstaking detail, but with naturaltypewriter.js, it's easy. "+
			"You tell it the basics of how you want it to act, and the precise details " +
			"are left up to chance.");
	}

	function writeToEnd() {
		//clear text that lastWriter would clear too late
		$('#end-2').text('');
		$('#end-3').text('');
		//you'll note this function uses two ways to get an element by its id... I'm
		//I'm following the style from my docs, which favor nativs JS, where applicable
		lastWriter.write(document.getElementById('end-1'), "Your fonts...");
		lastWriter.append(document.getElementById('end-2'), "\nYour story...");
		lastWriter.append(document.getElementById('end-3'), "\nJust a bit more captivating.");
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

	//called when the user views another component of the demo
	function switchFrames(currFrame, nextFrame) {
		currFrame.slideUp();
		currFrame.removeClass('active');
		nextFrame.slideDown(function() {
			//callback for slideDown--write to the frame when
			//it's done sliding in
			typeInFrame(nextFrame);
		});
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