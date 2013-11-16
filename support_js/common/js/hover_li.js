
$(function(){
	$('ul.productList li.bgCol3B').hover(function(){
										  
		$(this).css({background: '#cbf8b9 url("common/images/bg_3cols_o.gif") no-repeat 0 bottom'});
	},
	function(){
		$(this).css({background: 'url("common/images/bg_3cols_b.gif") no-repeat 0 bottom'});
	}
	);
});


