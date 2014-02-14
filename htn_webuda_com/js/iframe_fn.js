$(document).keydown(function(e) {
    if(e.keyCode == 116 && e.ctrlKey==false) {
		key=1;
		
    }
});

function ResizeIframe2(id){
	var t = setTimeout(function(){
	var ths = $('#'+id);
	ths.css({'display':'block','width':'auto','height':'auto'});
	
	var frame = document.getElementById(id);
	ths.css('height',ths.contents().height() + 20 + "px");
	ths.css('width',ths.contents().width() + 20 + "px");
	},200);
}



$(function(){
ResizeIframe2('arcs1');
ResizeIframe2('arcs2');
});

$(window).load(function(){
						
	if($('body').is('.a')){
		$('body').removeClass('a');
		location.reload(true);
	}
	else{
		$('body').addClass('a');
	}
	
});
