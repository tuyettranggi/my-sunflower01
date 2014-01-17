$(function(){
	
	$('.str_syntax').after('<div class="temp" style="display:none"></div>');
	h = $('.temp').height();
	$('.temp').html($('.CodeMirror-code').html());
	$('.temp > div > div').remove();
	var codeHtml = $('.temp').text();
	$('.out').attr('srcdoc',codeHtml);
	
	
$('.btnChange').click(function(){
	h = $('.temp').height();
	$('.temp').html($('.CodeMirror-code').html());
	$('.temp > div > div').remove();
	var codeHtml = $('.temp').text();
	$('.out').attr('srcdoc',codeHtml);
	/*calcHeight();*/
	ResizeIframe('preview');
});





// change height

$(window).load(function(){
	
	var t = setTimeout(function(){
			$('#preview').css('display','block');
			var frame = document.getElementById('preview');
			frame.height = frame.contentWindow.document.body.scrollHeight-20 + "px";
			$('#preview').css('width',frame.contentWindow.document.body.scrollWidth + "px");	
	
	},200);
});



function ResizeIframe(id){
	var t = setTimeout(function(){
	$('#preview').css('display','block');
	$('#'+id).css({'width':'auto','height':'auto'});
	var frame = document.getElementById(id);
	frame.height = frame.contentWindow.document.body.scrollHeight + "px";
	$('#'+id).css('width',frame.contentWindow.document.body.scrollWidth + "px");
	},200);
}










});

