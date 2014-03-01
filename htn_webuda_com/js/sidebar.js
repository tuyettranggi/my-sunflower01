


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
	<li>+<a href="'+i+'index.html">Học tiếng Nhật</a></li>\
	<li>+<a href="'+i+'hoc-kanji.html">Học Kanji</a>\
		<ul>\
			<li>-<a href="'+i+'kanji/nhat_sun.html">Kanji N4</a></li>\
		</ul>\
	</li>\
	</ul>\
	<h3>Học Html5</h3>\
	<ul>\
		<li>+<a href="'+i+'html5/html5-canvas.html">HTML5 Canvas</a>\
			<ul>\
				<li>-<a href="'+i+'html5/he-truc-toa-do-canvas.html">Lấy toạ độ trong canvas</a></li>\
			</ul>\
			<dl>\
				<dt>Lines - Đường thẳng</dt>\
				<dd><a href="'+i+'html5/html5-canvas-lines.html" title="Vẽ đường thẳng">.lineTo()</a></dd>\
				<dd><a href="'+i+'html5/html5-canvas-line-width.html" title="Độ dày đường line">.lineWidth</a></dd>\
				<dd><a href="'+i+'html5/html5-canvas-line-color.html" title="Định màu đường line">.strokeStyle <span class="note_s">(Line Color)</span></a></dd>\
				<dd><a href="'+i+'html5/html5-canvas-line-caps.html" title="Định kiểu mũ đường line">.lineCap</a></dd>\
				<dt>Curves - Đường cong</dt>\
				<dd><a href="'+i+'html5/html5-canvas-arcs.html" title="Đường cung tròn">.arc()</a></dd>\
				<dd><a href="'+i+'html5/html5-canvas-quadratic-curves.html" title="Đường cong với 1 điểm kiểm soát">.quadraticCurveTo()</a></dd>\
				<dd><a href="'+i+'html5/html5-canvas-bezier-curves.html" title="Đường cong với 2 điểm kiểm soát">.bezierCurveTo()</a></dd>\
				<dt>Paths - Đường dẫn path</dt>\
				<dd><a href="'+i+'html5/html5-canvas-paths.html" title="Đường dẫn">Path</a></dd>\
				<dd><a href="'+i+'html5/html5-canvas-line-joins.html" title="Định gốc kết nối cho cai đường line">.lineJoin</a></dd>\
				<dd><a href="'+i+'html5/html5-canvas-rounded-corners.html" title="Tạo gốc bo tròn">.arcTo()</a></dd>\
				<dt>Shaps - Hình dạng tùy chỉnh</dt>\
				<dd><a href="'+i+'html5/html5-canvas-custom-shapes.html" title="Tạo hình dạng tùy chỉnh">Custom Shape</a></dd>\
			</dl>\
		</li>\
		<li>+<a href="'+i+'html5/index.html">Học html5</a></li>\
		<li>+<a href="'+i+'html5/html5-co-ban.html">Hoc html5 cơ bản</a></li>\
		<li>+<a href="'+i+'html5/css-selector.html">Các tag sử dụng trong html5</a></li>\
		<li>+<a href="'+i+'html5/syntax-code.html" title="định dạng code">syntaxHighlighter<br />( định dạng code )</a></li>\
		<li>+<a href="'+i+'html5/code_editor.html" title="soan thảo code html">Code Editor</a></li>\
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