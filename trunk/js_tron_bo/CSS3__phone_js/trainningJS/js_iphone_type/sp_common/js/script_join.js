$(function() {
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
	
	//続きを読むボタンの追加
	var $moreInfo = $('.moreInfo');
	var $moreBtn = $('<p>')
						.addClass('moreBtn')
						.append(
							$('<a>')
								.attr('href', '#')
								.addClass('btn1 arrowBtmBtn')
								.append(
									$('<span>').text('続きを読む')
								)
						);
	
	/* iPhone4 parse error
	var $moreBtn = $('<p>', {
						class: 'moreBtn'
					})
					.append($('<a>', {
								href: '#',
								class: 'btn1 arrowBtmBtn',
							})
							.append($('<span>',{
										text: '続きを読む'
									})
							)
					);
	*/
	
	$moreInfo
		.each(function() {	
			if($(this).is('.hiddenTxt')){
				var $_t =$(this);
				var idTest=1;
			}
			else {
				var $_t = $(this).find('.hiddenTxt');
			}//クラス名をつける場合		
			var $_btn = $moreBtn.clone().insertAfter($(this));
			
			$_btn
				.find('a')
				.toggleRelContent($_t, {effect:true}, function() {
					var $_t = $(this);
					if($_t.hasClass('open')) {
						$_t.removeClass('arrowBtmBtn').addClass('arrowTopBtn');;
						$_t.find('span').text('閉じる');
					} else {
						$_t.removeClass('arrowTopBtn').addClass('arrowBtmBtn');
						$_t.find('span').text('続きを読む');
						var nId = $_t.parents().find('h2').attr('id');
						location.href = '#'+nId;
					}
				});
		});
	
	
	//resume::clone item
	$('.fmCloneContent a').click(function() {
	 	var $self = $(this);
		var $id = $(this).attr('href');
		var $tBase = $($id);
		
		if($tBase.length < 0) {
			return false;
		}
		
		var $tItem = $tBase.find('> li');
		var $tItemEx = $tItem.filter(':first-child');
		var $tItemLen = $tItem.length;
		var $tClone = $tItemEx.clone();

		if ($id == '#fmResumeBiz') {
			if ($tItemLen >= 21) {
				return false;
			}
		}
		
		if ($id == '#fmResumeJob') {
			if ($tItemLen >= 117) {
				return false;
			}
		}
		
		$tClone.find('label,input,select').each(function() {
			var $_t = $(this);
			var $oname = $_t.attr('name');
			var $oid = $_t.attr('id');
			var $ofor = $_t.attr('for');
			var $ovalue = $_t.attr('value');
			var tag = $_t.get(0).nodeName.toLowerCase();
			
			if(tag === 'label') {
				$_t.attr('for', $ofor.replace(/([a-zA-Z0-9\.]+\[)[0-9]+(\][a-zA-Z0-9\.]+)/, '$1' + ($tItemLen) + '$2'));
			} else if(tag === 'select') {
				var $_opt = $_t.find('option').removeAttr('selected');
				$_opt.filter(':first-child').attr('selected', 'selected');
			} else if (tag === 'input') {
				$_t.attr('value', '');
			}
			
			if($oname) {
				$_t.attr('name', $oname.replace(/([a-zA-Z0-9\.]+\[)[0-9]+(\][a-zA-Z0-9\.]+)/, '$1' + ($tItemLen) + '$2'));
			}
			
			if($oid) {
				$_t.attr('id', $oid.replace(/([a-zA-Z0-9\.]+\[)[0-9]+(\][a-zA-Z0-9\.]+)/, '$1' + ($tItemLen) + '$2'));
			}
			
		});
		
		$tBase.append($tClone);
		
		return false;
	});
	

	// disabled select
    $("ul.disabled input.statusOff").click(function(){
      	$(this).parent().parent().find('select').attr('disabled','disabled');
		$(this).parent().parent().addClass('disableText');
    });
	
	$("ul.disabled input.statusOn").click(function(){
      	$(this).parent().parent().find('select').removeAttr('disabled','disabled');
		$(this).parent().parent().removeClass('disableText');
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


// initialize all expanding textareas
jQuery(document).ready(function() {
	jQuery("textarea[class*=expand]").TextAreaExpander();
});