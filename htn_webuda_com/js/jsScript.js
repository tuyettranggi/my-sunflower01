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

	$('.breadcrumb').after('<table summary="Kanji Link" class="tbl_Kanji">\
        <tr>\
          <td><a href="'+i+'kanji/nhat.html" title="Nhật">日</a></td>\
		  <td><a href="'+i+'kanji/nguyet.html" title="Nguyệt">月</a></td>\
		  <td><a href="'+i+'kanji/hoa.html" title="Hỏa">火</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
        </tr>\
		<tr>\
          <td><a href="'+i+'kanji/giang.html" title="Giáng">降</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
        </tr>\
      </table>');
	$('.tbl_Kanji td').click(function(){
		var ths = $(this);
		var lk = ths.find('a').attr('href');
		location.href = lk;
	});
});