

$(document).ready(function(){
	if($("#lNav")) {
		$("#lNav li ul.sNav").hide();
		$("#lNav li span").click(function() {
			if(this.className.indexOf("clicked") != -1) {
				$(this).next().slideUp(200);
				$(this).removeClass("clicked");
			}
			else {
				$("#lNav li span").removeClass();
				$(this).addClass("clicked");
				$("#lNav li ul:visible").slideUp(400);
				
				$(this).next().slideDown(500);
			}
			return false;
		});
	}
});

$(document).ready(function(){
	if($("#lNav")) {
		$("#lNav li ul.lNavStay").show();
	}
});