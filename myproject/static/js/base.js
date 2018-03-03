$(document).ready(function() {
	var activeNavbarItem = $("#navbar-activation-tag").val();
	$("#"+activeNavbarItem).addClass("active");
	setIconVisibility(activeNavbarItem);
});

function setIconVisibility(activeNavbarItem) {
	if (activeNavbarItem == "photography" || activeNavbarItem == "web" || activeNavbarItem == "home") {
		$(".icon-bar").hide("slow"); //parameter needed to hide icons in chrome because DOM not ready
	}
}