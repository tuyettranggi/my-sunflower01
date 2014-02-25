$(function() {
	var id = $(location).attr('search');
	id = id.split("=");
	id = "#" + id[1];
	
	if(id=='#userDetail'){
		$(id).text('「自己PR、今後のキャリアプラン」を更新しました。');
	}
	else {
		$(id).addClass("open");
	}
	
	var $base = $('#jobOfferDetailInfo');		
	var $slideTrigger = $base.find('h2 .base');	
	
	//JobOfferDetail slide menu
	$slideTrigger.each(function() {
		var $_inner = $(this).parent().next('.innerNav, .innerContent');
		$(this).toggleRelContent($_inner,{effect: true});
		
		if($_inner.hasClass('innerNav')) {
			$_inner.find('> dt a').each(function() {
				$(this).toggleRelContent($(this).parent().next('dd'), {effect: true});
			});
		}
	});	


	var $baseClass = $('#pageOfferDetailInfo');
	var $slideTriggerMore = $baseClass.find('h2 .base');
	
	//PageOfferDetail slide menu
	$slideTriggerMore.each(function() {
		var $_inner = $(this).parent().next('.innerNav, .innerContent');
		$(this).toggleRelContent($_inner,{effect: true});
		
		if($_inner.hasClass('innerNav')) {
			$_inner.find('> dt a').each(function() {
				$(this).toggleRelContent($(this).parent().next('dd'), {effect: true});
			});
		}
	});	
	
	//tab
	$('#entryMemberTab').tab();
	
	//complete::slide
	var csma = $('#completeSkillMatchArea');
	var csmaSlideKey = $('#completeSkillMatchArea a.base');
	
	csmaSlideKey.each(function() {
		var $_t = $($(this).attr('href')).find('.detailList');
		$(this).toggleRelContent($_t, {effect: true});
	});
	
	//検討中リスト
	var $consListBtn = $('.considerationListBtn a');
	$consListBtn.each(function() {
		$(this).toggleRelContent($(this).parent().next(), {effect:true});
	});
	
	var $detailBtn = $('.detailBtn a');
	$detailBtn.each(function() {
		$(this).toggleRelContent($(this).parent().prev(), {effect:true});
	});
	
	$('.checkMoreBtn a').toggle(
							function(){
								var nId2 = $(this).parent('.checkMoreBtn').attr('id');
								$(this).parent().prev('table').find('.checkMore').slideDown();
								$(this).removeClass('aPlusL');
								$(this).addClass('aArrow7');
								$(this).text('閉じる');
								$(this).parent().prev('.checkMore').slideDown();
								$(this).parent().prev('dl').find('.checkMore').slideDown();
								$(this).addClass('clicked');
							},
							function(){
								var nId2 = $(this).parent('.checkMoreBtn').attr('id');
								$(this).parent().prev('table').find('.checkMore').slideUp();
								$(this).parent().prev('.checkMore').slideUp();
								$(this).parent().prev('dl').find('.checkMore').slideUp();
								if($(this).is('.clicked')){
									$(this).removeClass('.clicked');
									$(this).addClass('aPlusL');
									$(this).removeClass('aArrow7');
									$(this).text('さらに詳しく設定');
									setTimeout(function(){location.href='#'+nId2},'900');
								}

							}
	);

	
	$('.checkRows').each(function(){
		var id_text = $(this).attr('id');
		var doc = document.getElementById(id_text);
		var h = doc.scrollHeight +15;
		$(this).css('height', h);
	});
	
	// table's tr link set
	$('tr.trLink').bind('click touchend', function() {
		var page = $(this).attr('rel');
		if(page.length > 0) {
			location.href = page;
		}
		
		console.log("click");
		
		return false;
	});

});

(function($) {

	// jQuery plugin definition
	$.fn.TextAreaExpander = function(minHeight, maxHeight) {

		var hCheck = !($.browser.msie || $.browser.opera);

		// resize a textarea
		function ResizeTextarea(e) {

			// event or initialize element?
			e = e.target || e;

			// find content length and box width
			var vlen = e.value.length, ewidth = e.offsetWidth;
			if (vlen != e.valLength || ewidth != e.boxWidth) {

				if (hCheck && (vlen < e.valLength || ewidth != e.boxWidth)) e.style.height = "0px";
				var h = Math.max(e.expandMin, Math.min(e.scrollHeight, e.expandMax));

				e.style.overflow = (e.scrollHeight > h ? "auto" : "hidden");
				e.style.height = h + "px";

				e.valLength = vlen;
				e.boxWidth = ewidth;
			}

			return true;
		};

		// initialize
		this.each(function() {

			// is a textarea?
			if (this.nodeName.toLowerCase() != "textarea") return;

			// set height restrictions
			var p = this.className.match(/expand(\d+)\-*(\d+)*/i);
			this.expandMin = minHeight || (p ? parseInt('0'+p[1], 10) : 0);
			this.expandMax = maxHeight || (p ? parseInt('0'+p[2], 10) : 99999);

			// initial resize
			ResizeTextarea(this);

			// zero vertical padding and add events
			if (!this.Initialized) {
				this.Initialized = true;
				//$(this).css("padding-top", 0).css("padding-bottom", 0);
				$(this).bind("keyup", ResizeTextarea).bind("focus", ResizeTextarea);
			}
		});

		return this;
	};

})(jQuery);

$(function(){
		$('.openBtn a').parent().next('.showInfo').css('display', 'none');
		$('.openBtn a').click(function() {
				if($(this).not('.clicked')){
					$(this).parent().next().slideDown('fast');
					$(this).addClass('clicked');
				}

		});	   
});

// initialize all expanding textareas
jQuery(document).ready(function() {
	jQuery("textarea[class*=expand]").TextAreaExpander();
});