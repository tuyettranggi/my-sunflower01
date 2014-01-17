$(function(){
	
	$('.frame_code iframe').after('<textarea class="ie_out"></textarea>').remove();
	$('.ie_out').html($('.in').val());
		
		
	$('.btnChange').click(function(){
		
		h = $('.ie_out').height();
		$('.temp').html($('.CodeMirror-code').html());
		$('.temp > div > div').remove();
		var codeHtml = $('.temp').text();
		$('.ie_out').html(codeHtml);
		/*calcHeight();*/
		ResizeIframe('preview');
	});
});

