$(function(){
	// rollover
	$('.imgover').each(function(){
		this.osrc = $(this).attr('src');
		this.rollover = new Image();
		this.rollover.src = this.osrc.replace(/(\.gif|\.jpg|\.png)/, "_o$1");
	}).hover(function(){
		$(this).attr('src',this.rollover.src);
	},function(){
		$(this).attr('src',this.osrc);
	});
});

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
				/*$(this).addClass("active");*/
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