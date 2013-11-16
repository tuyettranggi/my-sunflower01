$(function(){
		   
if($('body').is('.rank1')){
	var i = "";
}
else if($('body').is('.rank2')){
	var i = "../";
}
else if($('body').is('.rank3')){
	var i = "../../";
}

$('aside').html('<h3>Học Tiếng Nhật</h3>\
	<ul>\
	<li>+<a href= "'+i+'index.html">Học tiếng Nhật</a></li>\
	<li>+<a href= "'+i+'hoc-kanji.html">Học Kanji</a>\
		<ul>\
			<li>+<a href= "'+i+'kanji_n4.html">Kanji N4</a></li>\
		</ul>\
	</li>\
	</ul>\
	<h3>Học Html5</h3>\
	<ul>\
		<li>+<a href= "'+i+'html5/index.html">Học html5</a></li>\
		<li>+<a href= "'+i+'html5/html5-co-ban.html">Hoc html5 cơ bản</a></li>\
		<li>+<a href= "'+i+'html5/css-selector.html">Các tag sử dụng trong html5</a></li>\
		<li>+<a href= "'+i+'html5/html5-canvas.html">HTML5 Canvas</a></li>\
	</ul>');
});