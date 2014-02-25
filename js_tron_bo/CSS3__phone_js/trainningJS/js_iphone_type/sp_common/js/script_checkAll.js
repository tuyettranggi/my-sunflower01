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
