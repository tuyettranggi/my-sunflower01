$(function(){

$('#preview').ready(function() {
	changeCode();
});

$('.btnChange').click(function(){
	changeCode();
});

});

function changeCode(){
		var codeHtml = $('.temp').text();
    	var externalHtml = codeHtml;
	
		// Find the body of the iframe and set its HTML
		// Add a wrapping div for height hack
		// Set min-width on wrapping div in order to get real height afterwords
		$('#preview').contents().find('body')
			.html('<div id="iframeContent" style="min-width:'+$('body').width()+'px">'
				+externalHtml
				+'</div>'
		);
	
		// Let the CSS load before getting height 
		setTimeout(function() {
			// Set the height of the iframe to the height of the content
			 $('#preview').css('height', 
				 $('#preview').contents()
				 .find('#iframeContent').height() + 'px' 
			 );
		},50);
	}