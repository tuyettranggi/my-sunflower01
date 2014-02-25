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




	// disabled radio
/*	var len = $('ul.radioDisabled li').length;
	$('ul.radioDisabled input').removeAttr('checked','checked');
	$('ul.radioDisabled input').removeAttr('disabled','disabled');
	
	$("ul.radioDisabled label:eq(0)").click(function(){
      	if ($('ul.radioDisabled input:eq(0)').attr('checked')=='checked') {
			for (var i=1; i<len; i++) {
				var str = $('ul.radioDisabled li:eq('+i+')').html();
				str = "<li>" + str.replace("label","span") + "</li>";
				$('ul.radioDisabled li:eq('+i+')').replaceWith(str);
				$('ul.radioDisabled input:eq('+i+')').attr('disabled','disabled');
				$('ul.radioDisabled input:eq(0)').attr('checked','checked');
				$('ul.radioDisabled input:eq('+i+')').removeAttr('checked',false);
				$('ul.radioDisabled label:eq('+i+')').css('color','#999');
			}
			
		} else {
			for (var i=1; i<len; i++) {
				var str = $('ul.radioDisabled li:eq('+i+')').html();
				str = "<li>" + str.replace("span","label") + "</li>";
				$('ul.radioDisabled li:eq('+i+')').replaceWith(str);
				$('ul.radioDisabled input:eq('+i+')').attr('checked',false);
				$('ul.radioDisabled input:eq('+i+')').removeAttr('disabled','disabled');			
				$('ul.radioDisabled label:eq('+i+')').css('color','#000');
			}
		}	

    });
	
	
	
	$("ul.radioDisabled input:eq(0)").click(function(){
      	if ($('ul.radioDisabled input:eq(0)').attr('checked')=='checked') {
			for (var i=1; i<len; i++) {
				var str = $('ul.radioDisabled li:eq('+i+')').html();
				str = "<li>" + str.replace("label","span") + "</li>";
				$('ul.radioDisabled li:eq('+i+')').replaceWith(str);
				$('ul.radioDisabled input:eq('+i+')').attr('disabled','disabled');
				$('ul.radioDisabled label:eq('+i+')').css('color','#999');
			}
		} else {
			for (var i=1; i<len; i++) {
				var str = $('ul.radioDisabled li:eq('+i+')').html();
				str = "<li>" + str.replace("span","label") + "</li>";
				$('ul.radioDisabled li:eq('+i+')').replaceWith(str);
				$('ul.radioDisabled input:eq('+i+')').removeAttr('disabled','disabled');
				$('ul.radioDisabled label:eq('+i+')').css('color','#000');
			}
		}
    });*/// JavaScript Document


});
