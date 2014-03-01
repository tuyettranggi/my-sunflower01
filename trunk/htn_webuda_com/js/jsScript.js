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
          <td><a href="'+i+'kanji/nhat_sun.html" title="Nhật - sun">日</a></td>\
		  <td><a href="'+i+'kanji/nguyet_moon.html" title="Nguyệt - moon">月</a></td>\
		  <td><a href="'+i+'kanji/hoa_fire.html" title="Hỏa - fire">火</a></td>\
		  <td><a href="'+i+'kanji/thuy_water.html" title="Thủy - water">水</a></td>\
		  <td><a href="'+i+'kanji/moc_tree.html" title="Mộc - tree">木</a></td>\
		  <td><a href="'+i+'kanji/kim_gold.html" title="Kim - gold">金</a></td>\
		  <td><a href="'+i+'kanji/tho_soil.html" title="Thổ - soil">土</a></td>\
		  <td><a href="'+i+'kanji/son_mountain.html" title="Sơn - mountain">山</a></td>\
		  <td><a href="'+i+'kanji/xuyen_river.html" title="Xuyên - river">川</a></td>\
		  <td><a href="'+i+'kanji/dien_ricefield.html" title="Điền - rice fild">田</a></td>\
		  <td><a href="'+i+'kanji/nhat_one.html" title="Nhất - one">一</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
        </tr>\
		<tr>\
          <td><a href="'+i+'kanji/giang_descend.html" title="Giáng - descend">降</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/xxxxxxxxxxx.html" title="xxxxxxxxxxx">xxx</a></td>\
		  <td><a href="'+i+'kanji/chung_finish.html" title="Chung - finish">終</a></td>\
		  <td><a href="'+i+'kanji/xuan_spring.html" title="Xuân - spring">春</a></td>\
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