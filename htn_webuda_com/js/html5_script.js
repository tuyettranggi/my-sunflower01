(function($){
	$.fn.extend({
		tagReload: function(){
			
			return this.each(function(){
				
				var obj = $(this);
				var nHtml = obj.clone(); 
				obj.after(nHtml);
				obj.eq(0).remove();
				var nId = obj.attr('id');
				var tag = $('#'+nId);
				var t2 = setTimeout(function(){alert('b');				
					tag.css({'display':'block','width':'auto','height':'auto'});
					tag.css('height',tag.contents().height() + 20 + "px");
					tag.css('width',tag.contents().width() + 20 + "px");
				},2000);
			});
		}
	});
})(jQuery);





