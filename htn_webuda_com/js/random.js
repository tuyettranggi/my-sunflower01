$(function(){
	s = 1000;
	speed=s+4000;
	nText = nRandom();
	ranShow();
	$('.ranBtn').click(function(){
		nText = nRandom();
		ranShow();
	});
	
	
	$('.ranRepeat').click(function(){
		ranShow();
	});
	
});

function ranShow(){
	$('.ranImg').css({'margin-top':'15px','display':'none'});
	
		switch(nText){
			case '日':	var imgSrc = 'nhat_sun_'; 
								var nKanji = 'NHẬT - Mặt trời, ngày';
								var nDes = 'Đây là hình dạng của mặt trời';
								var nOn = 'にち、にっ、じつ';
								var nKun ='ひ、び、か';
								var nParts = '';
			break;
			case '月':	var imgSrc = 'nguyet_moon_';
								var nKanji = 'NGUYỆT - trăng, tháng';
								var nDes = 'Đây là hình dạng trăng lưỡi liềm';
								var nOn = 'がつ、げつ';
								var nKun ='つき';
								var nParts = '';
			break;
			case '火':	var imgSrc = 'hoa_fire_';
								var nKanji = 'HỎA - Lửa';
								var nDes = 'Đây là hình dạng lửa';
								var nOn = 'か';
								var nKun ='ひ、び、ほ';
								var nParts = '2 chấm thủy<br />	人： NHÂN';
			break;
			case '水':	var imgSrc = 'thuy_water_';
								var nKanji = 'THỦY - nước';
								var nDes = 'Giữa là thác nước văng 4 giọt nước xung quanh';
								var nOn = 'すい';
								var nKun ='みず';
								var nParts = '';
			break;
			case '木':	var imgSrc = 'moc_tree_';
								var nKanji = 'MỘC - Cây';
								var nDes = 'Đây là hình dạng của một cái cây';
								var nOn = 'もく、ぼく';
								var nKun ='き、こ';
								var nParts = '';
			break;
			case '金':	var imgSrc = 'kim_gold_';
								var nKanji = 'KIM - Vàng, tiền';
								var nDes = 'Người ta nói có vàng dưới núi';
								var nOn = 'キン, コン';
								var nKun ='かね、かな';
								var nParts = '王 :VƯƠNG, VƯỢNG - Vua';
			break;
			case '土':	var imgSrc = 'tho_soil_';
								var nKanji = 'THỔ - Đất';
								var nDes = 'Mầm chồi thì mọc ra từ đất';
								var nOn = 'ど、と';
								var nKun ='つち';
								var nParts = '';
			break;
			case '山':	var imgSrc = 'son_mountain_';
								var nKanji = 'SƠN - Núi';
								var nDes = 'Đây là hình dạng của quả núi';
								var nOn = 'さ ん、ざん';
								var nKun ='やま';
								var nParts = '';
			break;
			case '川':	var imgSrc = 'xuyen_river_';
								var nKanji = 'XUYÊN - sông, con sông';
								var nDes = 'Dòng sông đang chảy qua';
								var nOn = 'せん';
								var nKun ='かわ、がわ';
								var nParts = '';
			break;
			case '田':	var imgSrc = 'dien_ricefield_';
								var nKanji = 'ĐIỀN - Ruộng đất cầy cấy';
								var nDes = 'Đây là hình dạng đất ruộng';
								var nOn = 'でん';
								var nKun ='た、だ';
								var nParts = '';
			break;
			case '＿＿':	var imgSrc = '＿＿';
								var nKanji = '＿＿';
								var nDes = '＿＿';
								var nOn = '＿＿';
								var nKun ='＿＿';
								var nParts = '＿＿';
			break;
		}
		var img = $('.ranImg img');
		var txt = $('.ranTxt');
		var show = $('.ranShow');
		var des = $('.ranDes');
		var kanji = $('.ranKanji');
		img.attr('src','../kanji/img/'+imgSrc+'img.gif').attr('alt',nKanji);
		txt.text(nText);
		des.text(nDes);
		kanji.text(nKanji);
		txt.fadeIn(100).delay(speed-2000).fadeOut(1000);
		$('.ranImg').delay(speed-1600).fadeIn().delay(4000).fadeOut(function(){
				var img = $('.ranImg img');
				img.attr('src','../kanji/img/'+imgSrc+'cv1.gif').attr('alt',nKanji);
				$(this).css('margin-top','-20px').fadeIn(100);
		});
			
}

function nRandom(){
	var textArray = [
		'日',
		'月',
		'火',
		'水',
		'木',
		'金',
		'土',
		'山',
		'川',
		'田'
	];
	var randomIndex = Math.floor(Math.random() * textArray.length); 
	var randomElement = textArray[randomIndex];
	return randomElement;
}