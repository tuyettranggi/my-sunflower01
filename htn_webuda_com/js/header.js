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


$('header').html('<nav id="gnav">\
        <ul>\
          <li><a href="'+i+'index.html">Trang chủ</a></li>\
          <li><a href="'+i+'hoc-kanji.html">kanji</a></li>\
          <li><a href="'+i+'tu-vung-tieng-nhat.html">Từ vựng tiếng Nhật</a></li>\
          <li><a href="'+i+'ngu-phap-tieng-nhat.html">Ngữ pháp tiếng Nhật</a></li>\
        </ul>\
      </nav>\
      <section class="headerInner clearfix">\
        <div class="hSection">\
          <h1>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h1>\
          <!--<p class="logo">Học Kanji</p>-->\
          <canvas id="logo">\
            <script type="text/javascript" src="'+i+'js/logo.js"></script>\
          </canvas>\
        </div>\
        <script type="text/javascript" src="'+i+'js/se.js"></script>\
        <gcse:searchbox></gcse:searchbox>\
      </section>');
});