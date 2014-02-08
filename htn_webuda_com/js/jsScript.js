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


// tao table kanji
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

// active cho table link kanji
$(function(){
var path = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
var srcf = window.location.href.replace('/'+path,'');
var path2 = window.location.href.substr(srcf.lastIndexOf("/")+1);
var t = setTimeout(function(){
							
							$('.tbl_Kanji a').each(function(){
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
					   },100);

});