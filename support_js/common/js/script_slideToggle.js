$(function(){
	$(".boardList").each(function(index){
/*NEU KHONG CO CLASS .boardClose THI PHAN DAU TIEN LUON DUOC MO*/					  
			if($(this).is('.boardClose')!=1){
				$(this).find('.contentSection:first').show();
				/*$(this).find('.shSection .slide a:first').append('<span class="close"><img src="images/script_slideToggle/btn_close.gif" alt="閉じる" /></span>');*/
			}

			$(this).find('.shSection').click(function() {
						$(this).parents().find('.boardClose').removeClass('boardClose');
						$(this).next(".boardList .contentSection").slideToggle(200)
						if(this.className.indexOf("clicked") != -1) {
							$(this).removeClass("clicked");
						}
						else {
							$(this).addClass("clicked");
						}
						return false;
			});
	});	
});				
		
	   
/*	if($(".boardList")) {
		$(".boardList .contentSection:first").show();
		$(".boardList .boardClose .contentSection").hide();
		$(".boardList .shSection").click(function() {
			$(this).parents().find('.boardClose').removeClass('boardClose');
			$(this).next(".boardList .contentSection").slideToggle(200)
			if(this.className.indexOf("clicked") != -1) {
				$(this).removeClass("clicked");
			}
			else {
				$(this).addClass("clicked");
			}
		return false;
		});
		
	}
});*/
