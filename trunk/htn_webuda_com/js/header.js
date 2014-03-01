




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

$('header').html('<div class="hSection">\
<nav id="gnav">\
<h1>_</h1>\
<ul>\
<li><a href="'+i+'index.html">Trang chủ</a></li>\
<li><a href="'+i+'hoc-kanji.html">kanji</a></li>\
<li><a href="'+i+'tu-vung-tieng-nhat.html">Từ vựng tiếng Nhật</a></li>\
<li><a href="'+i+'ngu-phap-tieng-nhat.html">Ngữ pháp tiếng Nhật</a></li>\
</ul>\
</nav>\
</div>\
<section class="headerInner clearfix">\
<canvas id="logo">\
<!--<script type="text/javascript" src="'+i+'"js/logo.js"></script>-->\
</canvas>\
<!--<script type="text/javascript" src="'+i+'js/se.js"></script>-->\
<gcse:searchbox></gcse:searchbox>\
</section>');

includeBottomJs(i+"js/logo.js");
includeTopJs(i+"js/se.js");

var $h1 = $('title').text();
$h1 = $h1.substr(0,$h1.indexOf('|'));
$('h1').text($h1);
});

function includeBottomJs(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
}


function includeTopJs(jsFilePath) {
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.src = jsFilePath;
    script.type = 'text/javascript';

    head.appendChild(script);
}








