$(function() {
	
$('#all').click(function(){
				
		if($(this).is('.checkedClass')){
			$(this).removeAttr('checked','checked').removeClass('checkedClass');
			$(this).parent().next('dd').find('input').removeAttr('checked','checked').removeClass('checkedClass');
		}
		else {
			$(this).attr('checked','checked').addClass('checkedClass');
			$(this).parent().next('dd').find('input').attr('checked','checked').addClass('checkedClass');
		}
});

$('.checkAll dd input').click(function(){
									   
		if($(this).is('.checkedClass')){
			$(this).removeAttr('checked','checked').removeClass('checkedClass');
			$(this).parent().parent().parent().parent().parent('.checkAll').find('#all').removeAttr('checked','checked').removeClass('checkedClass');
		}
		else {
			if($(this).parent().parent().parent().parent().parent('.checkAll').find('#all').not('.checkedClass')) {
				var nSize = $(this).parent().parent().parent('ul').find('.checkedClass').size()+1;
				if(nSize==$(this).parent().parent().parent('ul').find('input').size()){
					$(this).parent().parent().parent().parent().parent('.checkAll').find('#all').attr('checked','checked').addClass('checkedClass');
				}
			}
			$(this).attr('checked','checked').addClass('checkedClass');
		}
});

$('#all + label').click(function(){
				
		if($(this).prev('input').is('.checkedClass')){
			$(this).prev('input').removeAttr('checked','checked').removeClass('checkedClass');
			$(this).parent().next('dd').find('input').removeAttr('checked','checked').removeClass('checkedClass');
		}
		else {
			$(this).prev('input').attr('checked','checked').addClass('checkedClass');
			$(this).parent().next('dd').find('input').attr('checked','checked').addClass('checkedClass');
		}
});

$('.checkAll dd input + label').click(function(){
									   
		if($(this).prev('input').is('.checkedClass')){
			$(this).prev('input').removeAttr('checked','checked').removeClass('checkedClass');
			$(this).parent().parent().parent().parent().parent('.checkAll').find('#all').removeAttr('checked','checked').removeClass('checkedClass');
		}
		else {
			if($(this).parent().parent().parent().parent().parent('.checkAll').find('#all').not('.checkedClass')) {
				var nSize = $(this).parent().parent().parent('ul').find('.checkedClass').size()+1;
				if(nSize==$(this).parent().parent().parent('ul').find('input').size()){
					$(this).parent().parent().parent().parent().parent('.checkAll').find('#all').attr('checked','checked').addClass('checkedClass');
				}
			}
			$(this).prev('input').attr('checked','checked').addClass('checkedClass');
		}
});

});



//label => doan js nay di kem
/*	
$(function() {
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
*/