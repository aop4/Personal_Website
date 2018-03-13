$(document).ready(function() {
	$("body").css("visibility", "visible");
	var activeNavbarItem = $("#navbar-activation-tag").val();
	$("#"+activeNavbarItem).addClass("active");
	setIconVisibility(activeNavbarItem);

	$("#lang-picker").on('mouseover', function() {
		$(this).click();
	});
	$("#lang-choices").on('mouseleave', function() {
		$("#lang-picker").click();
	});
});

function setIconVisibility(activeNavbarItem) {
	if (activeNavbarItem == "photography" || activeNavbarItem == "web" || activeNavbarItem == "home") {
		$(".web-icon-bar").hide("slow"); //parameter needed to hide icons in chrome because DOM not ready
	}
}