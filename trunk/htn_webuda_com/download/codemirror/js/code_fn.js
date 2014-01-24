// Define an extended mixed-mode that understands vbscript and
// leaves mustache/handlebars embedded templates in html mode
//var mixedMode = {
//	name: "htmlmixed",
//	scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
//								 mode: null},
//								{matches: /(text|application)\/(x-)?vb(a|script)/i,
//								 mode: "vbscript"}]
//};
//var editor = CodeMirror.fromTextArea(document.getElementById("mixedMode1"), {
//	mode: mixedMode,
//	lineNumbers: true,
//	tabMode: "indent"});
//	
//var editor = CodeMirror.fromTextArea(document.getElementById("mixedMode2"), {
//	mode: mixedMode,
//	lineNumbers: true,
//	tabMode: "indent"});
//
//var editor = CodeMirror.fromTextArea(document.getElementById("mixedMode3"), {
//	mode: mixedMode,
//	lineNumbers: true,
//	tabMode: "indent"});




// set iframe height based on canvas height in the code

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
			$('#preview').css('width',frame.contentWindow.document.body.scrollWidth + "px");	
	
	},200);
});



function ResizeIframe(id){
	var t = setTimeout(function(){
	$('#preview').css('display','block');
	$('#'+id).css({'width':'auto','height':'auto'});
	
	var frame = document.getElementById(id);
	$('#'+id).css('height',frame.contentWindow.document.body.scrollHeight-3 + "px");
	$('#'+id).css('width',frame.contentWindow.document.body.scrollWidth + "px");
	},200);
}