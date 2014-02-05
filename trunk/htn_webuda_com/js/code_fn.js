// set iframe height based on canvas height in the code

/*$(function(){
    try {
      var iframeHeight = 200;
      
      if (false) {
        iframeHeight = 400;
      }
      else {
  		  var code = document.getElementById('code').value;
  		  var regex = /height(=|: )\"?([0-9]{1,4})\"?/;
  	 	  var height = code.match(regex)[2];
  	    iframeHeight = parseInt(height);
  	  }
  	  
  	  document.getElementById('preview').style.height = iframeHeight + 'px';
	  ResizeIframe('preview');

  	} catch(e){}
});


// change height

$(window).load(function(){
	
	var t = setTimeout(function(){
			$('#preview').css('display','block');
			var frame = document.getElementById('preview');
			$('#preview').css('height',frame.contentWindow.document.body.scrollHeight-3 + "px");
			$('#preview').css('width',$("#preview").contents().width() + "px");	
	
	},200);
});



function ResizeIframe(id){
	var t = setTimeout(function(){
	$('#preview').css('display','block');
	$('#'+id).css({'width':'auto','height':'auto'});
	
	var frame = document.getElementById(id);
	$('#'+id).css('height',frame.contentWindow.document.body.scrollHeight-3 + "px");
	$('#'+id).css('width',$("#preview").contents().width() + "px");
	},200);
}*/




$(function(){
    try {
      var iframeHeight = 200;
      
      if (false) {
        iframeHeight = 400;
      }
      else {
  		  var code = document.getElementById('code').value;
  		  var regex = /height(=|: )\"?([0-9]{1,4})\"?/;
  	 	  var height = code.match(regex)[2];
  	    iframeHeight = parseInt(height);
  	  }
	  ResizeIframe('preview');

  	} catch(e){}
});


// change height

$(window).load(function(){
	var t = setTimeout(function(){
			$('#preview').css('display','block');
			ResizeIframe('preview');
	
	},100);
});



function ResizeIframe(id){
	var t = setTimeout(function(){
								var ths = $('#'+id);
	ths.css({'display':'block','width':'auto','height':'auto'});
	
	var frame = document.getElementById(id);
	ths.css('height',ths.contents().height() + "px");
	ths.css('width',ths.contents().width() + "px");
	},200);
}















