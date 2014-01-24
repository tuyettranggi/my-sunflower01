


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
			<li>-<a href= "'+i+'kanji_n4.html">Kanji N4</a></li>\
		</ul>\
	</li>\
	</ul>\
	<h3>Học Html5</h3>\
	<ul>\
		<li>+<a href= "'+i+'html5/index.html">Học html5</a></li>\
		<li>+<a href= "'+i+'html5/html5-co-ban.html">Hoc html5 cơ bản</a></li>\
		<li>+<a href= "'+i+'html5/css-selector.html">Các tag sử dụng trong html5</a></li>\
		<li>+<a href= "'+i+'html5/html5-canvas.html">HTML5 Canvas</a>\
			<ul>\
				<li>-<a href= "'+i+'html5/he-truc-toa-do-canvas.html">Lấy toạ độ trong canvas</a></li>\
			</ul>\
			<dl>\
				<dt>Lines</dt>\
				<dd>-<a href= "'+i+'html5/html5-canvas-lines.html" title="vẽ đường thẳng">Line</a></dd>\
				<dd>-<a href= "'+i+'html5/html5-canvas-line-width.html" title="độ dày đường line">Line Width</a></dd>\
				<dd>-<a href= "'+i+'html5/html5-canvas-line-color.html" title="định màu đường line">Line Color</a></dd>\
				<dd>-<a href= "'+i+'html5/html5-canvas-line-caps.html" title="định loại đường line">Line Cap</a></dd>\
			</dl>\
		</li>\
		<li>+<a href= "'+i+'html5/syntax-code.html" title="định dạng code">syntaxHighlighter<br />( định dạng code )</a></li>\
		<li>+<a href= "'+i+'html5/code_editor.html" title="soan thảo code html">Code Editor</a></li>\
	</ul>');
});

$(function(){
var path = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
var srcf = window.location.href.replace('/'+path,'');
var path2 = window.location.href.substr(srcf.lastIndexOf("/")+1);
var t = setTimeout(function(){
							
							$('aside a').each(function(){
								var th = $(this).attr('href');
								var nTh = th.substr(th.lastIndexOf("/")+1);	
								var th2 = th.replace('/'+nTh,'');
								th2 = th.substr(th2.lastIndexOf("/")+1);
								
								/*th = th.substr(th.lastIndexOf("/")+1);*/
								if(th2==path2){
									$(this).addClass('atv');
								}
								else if(th==path){
									$(this).addClass('atv');
								}
							});
					   },500);

});