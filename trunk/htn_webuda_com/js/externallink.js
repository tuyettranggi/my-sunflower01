( function(){


/* ============================================================================== createExternalLink - 'external'
	Author : Sakai
	Date   : 2008-01-19
*/

var createExternalLink = function() {
	var externalLink = document.getElementsByTagName('a');
	for (var i = 0, len = externalLink.length; i < len; i++) {
		var a = externalLink[i];
		if (a.getAttribute('rel') == 'external') {
			if (a.title) a.title += ' : 新しいウィンドウで開きます';
			a.onclick = function() {
				window.open(this.getAttribute('href'), '_blank');
				return false;
			}
		}
	}
};



function addEvent(elm, listener, fn){
	try{
		elm.addEventListener(listener, fn, false);
	}catch(e){
		elm.attachEvent('on' + listener, fn);
	}
}

addEvent(window, 'load', function() {
	createExternalLink();
});

}) ();
