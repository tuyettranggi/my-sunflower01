$(function(){
	$('.list_btn li:eq(0)').click(function(){
		$('.draw img').addClass('none');
		$('.list_prev_next').removeClass('none');
		var nSrc = $('.draw img').attr('src');
		nSrc = nSrc.replace('1.gif','2.gif');
		$('.draw').css('background','url('+nSrc+') no-repeat 0 0');
		
		
		$('.list_btn li:eq(0)').addClass('none');
		$('.list_btn li:eq(1)').removeClass('none');
	});
	
	$('.list_btn li:eq(1)').click(function(){
		$('.draw img').removeClass('none');
		$('.list_prev_next').addClass('none');
		$('.list_btn li:eq(1)').addClass('none');
		$('.list_btn li:eq(0)').removeClass('none');
	});
	
	$('.list_prev_next li input:eq(1)').click(function(){
		var nSrc = $('.draw img').attr('src');
		nSrc = nSrc.replace('1.gif','2.gif');
		var image = new Image();
		image.src = nSrc;
		var h = image.height;
		
		var posY = getBackgroundPos($('.draw')).y -200;
		if(posY>=-(h-200)){
		
			$('.draw').css('background-position','0 '+posY+'px');
		}
		else {
			$('.draw').css('background-position','0 0');
		}
	});
	
	
	$('.list_prev_next li input:eq(0)').click(function(){
		var nSrc = $('.draw img').attr('src');
		nSrc = nSrc.replace('1.gif','2.gif');
		var image = new Image();
		image.src = nSrc;
		var h = image.height;
		var h2 = h -200;
		
		var posY = getBackgroundPos($('.draw')).y;
		$('.draw').css('background-position','0 '+posY+'px');
		if(posY == 0){
			posY = -h2;
		}
		else {
			posY += 200;
		}
		$('.draw').css('background-position','0 '+posY+'px');
		/*if(posY>=-(h-200)){
		
			$('.draw').css('background-position','0 '+posY+'px');
		}
		else {
			$('.draw').css('background-position','0 0');
		}*/
	});
	
	
	
	
function getBackgroundPos(obj) {
	var pos = obj.css("background-position");
	if (pos == 'undefined' || pos == null) {
	pos = [obj.css("background-position-x"),obj.css("background-position-y")];//i hate IE!!
	} else {
	pos = pos.split(" ");
	}
	return {
	x: parseFloat(pos[0]),
	xUnit: pos[0].replace(/[0-9-.]/g, ""),
	y: parseFloat(pos[1]),
	yUnit: pos[1].replace(/[0-9-.]/g, "")
	};
}
});