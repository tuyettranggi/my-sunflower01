
$(function(){
	$('.ranBtn').click(function(){
		var nText = nRandom();
		
		switch(nText){
			case '日':	var imgSrc = 'nhat_sun_img.gif';  break;
			case '月':	var imgSrc = 'nguyet_moon_img.gif'; break;
			case '火':	var imgSrc = 'hoa_fire_img.gif'; break;
			case '水':	var imgSrc = 'thuy_water_img.gif'; break;
			case '木':	var imgSrc = 'moc_tree_img.gif'; break;
			case '金':	var imgSrc = 'kim_gold_img.gif'; break;
			case '土':	var imgSrc = 'tho_soil_img.gif'; break;
		}
		var img = $('.ranImg img');
		var txt = $('.ranTxt');
		var show = $('.ranShow');
		img.attr('src','../kanji/img/'+imgSrc).attr('alt',nText);
		/*var txt = $('.');*/
		txt.text(nText);
		
	});
});

function nRandom(){
	var textArray = [
		'日',
		'月',
		'火',
		'水',
		'木',
		'金',
		'土'
	];
	var randomIndex = Math.floor(Math.random() * textArray.length); 
	var randomElement = textArray[randomIndex];
	return randomElement;
}