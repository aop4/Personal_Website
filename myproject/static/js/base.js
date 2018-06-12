$(document).ready(function() {
	
	var activeNavbarItem = $("#navbar-activation-tag").val();
	$("#"+activeNavbarItem).addClass("active");
	setIconVisibility(activeNavbarItem);
	setBodyClass(activeNavbarItem);

	if (navbarIsMobile()) {
		$('.center-on-mobile').css('text-align', 'center');
	}

	/* Returns true if the navbar is styled for a mobile phone. In that case,
	we should ignore mouseover/mouseleave events because they can cause one touch
	to register as multiple touches. */
	function navbarIsMobile() {
		return ($('#mobile-nav-btn').css('display') != 'none');
	}

	/* Expand the language-choosing dropdown */
	function openLangDropdown() {
		$('#lang-choices').removeClass('dropdown');
		$('#lang-choices').addClass('dropdown-open');
		$('#lang-picker').attr('aria-expanded', 'true');
		$('#lang-target').show();
	}

	/* Contract the language-closing dropdown */
	function closeLangDropdown() {
		$('#lang-choices').removeClass('dropdown-open');
		$('#lang-choices').addClass('dropdown');
		$('#lang-picker').attr('aria-expanded', 'false');
		$('#lang-target').hide();
	}

	$('#lang-picker').on('mouseover', function() {
		if (!navbarIsMobile()) {
			openLangDropdown(); //expand the language-choosing dropdown on mouseover
				//condition is because this causes touch events to register twice for mobile devices
		}
	});

	$('#lang-choices').on('mouseleave', function() {
		if (!navbarIsMobile()) {
			closeLangDropdown(); //collapse the language-choosing dropdown on mouseout
				//condition is because this causes touch events to register twice for mobile devices
		}
	});

	//scroll down the navigation menu, on mobile devices, when the user
	//touches the language-choosing dropdown item
	$('#lang-choices').on('click', function() {
		var navMenu = $('#navbar')[0];
		//We have to wait a few msec because the dropdown content takes some time
		//to be appended to the navbar.
		setTimeout(function() {
			navMenu.scrollTop = navMenu.scrollHeight;
		}, 10);
	});
	$("body").css("visibility", "visible"); //to prevent jerky rendering
});

function setIconVisibility(activeNavbarItem) {
	if (activeNavbarItem == "photography" || activeNavbarItem == "web" || activeNavbarItem == "home") {
		$(".web-icon-bar").hide("slow"); //parameter needed to hide icons in chrome because DOM not ready.
			//The web-icon-bar icons are the 4 links to external sites that appear at the bottom of some pages
	}
}

function setBodyClass(activeNavbarItem) {
	//add in the forest background where desired
	if (activeNavbarItem != "photography") {
		$("body").addClass("woods");
	}
}