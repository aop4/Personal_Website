$(document).ready(function() {
	var activeNavbarItem = $("#navbar-activation-tag").val();
	$("#"+activeNavbarItem).addClass("active");
	setIconVisibility(activeNavbarItem);
});

function setIconVisibility(activeNavbarItem) {
	if (activeNavbarItem == "photography" || activeNavbarItem == "web") {
		$(".icon-bar").hide();
	}
}