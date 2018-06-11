$(document).ready(function() {
	
	var activeNavbarItem = $("#navbar-activation-tag").val();
	$("#"+activeNavbarItem).addClass("active");
	setIconVisibility(activeNavbarItem);
	setBodyClass(activeNavbarItem);
	$('#lang-picker').on('mouseover', function() {
		$(this).click(); //expand the dropdown on mouseover
	});
	$('#lang-choices').on('mouseleave', function() {
		$("#lang-picker").click(); //collapse the dropdown on mouseout
		$('body').click();
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