$(document).ready(function() {
	
	var activeNavbarItem = $("#navbar-activation-tag").val();
	$("#"+activeNavbarItem).addClass("active");
	setIconVisibility(activeNavbarItem);
	setBodyClass(activeNavbarItem);
	$("#lang-picker").on('mouseover', function() {
		$(this).click(); //expand the dropdown on mouseover
	});
	$("#lang-choices").on('mouseleave', function() {
		$("#lang-picker").click(); //collapse the dropdown on mouseout
		$('body').click();
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