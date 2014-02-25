$(function(){
		   
//backBtn	=> CCC_iphone_ebk013-01_d02.html
	$('a.backBtn').click(function() {
		history.back();
		return false;
	});
	
//redirect to link href CCC_iphone_ebk012.html => CCC_iphone_ebk007.html
    $("ul.purchaseList li").click(function(){
		location.href="CCC_iphone_ebk012.html";
	});
	
	  
// SLIDE DOWN - SLIDE UP	=> CCC_iphone_ebk005.html
// slideDown when it was clicked first time, sd time : slide up
	$('.toggleBtn').toggle(
							function(){
								$(this).parents('.magazineBox').next('.imageList').slideDown();
								$(this).find('img').attr('src','iphone/public/images/CCC_iphone_ebk005/ebk005_arrow_up_btn.gif');
							},
							function(){
								$(this).parents('.magazineBox').next('.imageList').slideUp();
								$(this).find('img').attr('src','iphone/public/images/CCC_iphone_ebk005/ebk005_arrow_down_btn.gif');
							}
	);
	

// click toggle anh change img active by other img	=> CCC_iphone_ebk002.html
// set background to image = img active ( _on ) + change text of select element
	$('.iconList li').each(function(){
				var osrc = $(this).find('img').attr('src');
				var nSrc = osrc.replace(/(\_off.gif)/, "_on.gif");
				$(this).css({'background-image':'url('+nSrc+')'});
	});
	

	$('.iconList li a').click(function(){
		var nText = $(this).find('img').attr('alt');
		var i = 0;
		// if all img checked => i = 1 => i!=0
		if($(this).parents('.iconList').find('img').is('.clicked')){
			i=1;
		}
		
		// if img checked, remove class clicked and slideUp
		if($(this).find('img').is('.clicked')){
			$(this).find('img').removeClass('clicked');
			$(this).parents('.iconList').next('.allSelect').slideUp();
			i=3;
		}
		
		if($(this).parents('.iconList').find('img').is('.clicked')){
			$(this).parents('.iconList').find('img.clicked').removeClass('clicked');
			$(this).find('img').addClass('clicked');
			i=2;
		}
		
		if(i==0){
			$(this).find('img').addClass('clicked');
			$(this).parents('.iconList').next('.allSelect').slideDown();
		}
		
		$(this).parents('.iconList').next('.allSelect').find('option').text(nText);
		
	});
	

// label	=> CCC_iphone_ebk013-01_d02.html
	$('form label').click(function() {
		var $_t = $('#' + $(this).attr('for'));
		
		if($_t.length <= 0) {
			return;
		}
		
		var tag = $_t.get(0).nodeName.toLowerCase();
		
		if(tag === 'input') {
			var $_tType = $_t.attr('type');
			
			if($_tType === 'text' || $_tType === 'password' || $_tType === 'number' || $_tType === 'email' || $_tType === 'tel') {
				$_t.focus();
			} else if($_tType === 'checkbox') {
				$_t.attr('checked', !$_t.attr('checked'));
			} else if($_tType === 'radio') {
				if(!$_t.attr('checked')) {
					$_t.attr('checked', !$_t.attr('checked'));
				}
			}
		} else if (tag === 'textarea' || tag === 'select') {
			$_t.focus();
		}
		
		return false;
	});

});


// click Button : toggle content (box appear when button was clicked) =>	CCC_iphone_ebk005.html	(@type : button gNav)
	$('.magazineTitle .openBtn').toggleRelContent();

$.fn.toggleRelContent = function(target, conf, callback) {
	var defaults = {
		effect: false,	// none or slide
		speed: 'fast',	// slide speed
		easing: ''		// slide easing
	}
	
	var opt = $.extend(defaults, conf);
	
	return this.each(function() {
		var $_self = $(this);
		var $_t = target || $($(this).attr('href'));
		
		if($_t.length > 0) {
			if(!$_self.hasClass('open')) {
				$_t.css('display', 'none');
			}
			
			$_self.click(function() {
				if($_t.filter(':visible').length > 0) {
					$_self.removeClass('open');
					if(opt.effect) {
						$_t.slideUp(opt.speed, opt.easing);
					} else {
						$_t.hide();
					}
				} else {
					$_self.addClass('open');
					if(opt.effect) {
						$_t.slideDown(opt.speed, opt.easing);
					} else {
						$_t.show();
					}
				}
				
				if($.isFunction(callback)) {
					callback.apply($(this));
				}
				
				return false;
			});
		}
	});
}
