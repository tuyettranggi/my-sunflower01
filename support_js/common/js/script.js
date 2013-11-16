$(function(){
	// rollover
	$('.imgover').each(function(){
		this.osrc = $(this).attr('src');
		this.rollover = new Image();
		this.rollover.src = this.osrc.replace(/(\.gif|\.jpg|\.png)/, "_o$1");
	}).hover(function(){
		$(this).attr('src',this.rollover.src);
	},function(){
		$(this).attr('src',this.osrc);
	});
});


///////////////////////////////////////////////////////////////////////////////////////////

// for table

(function($){
	var config = function () {
		$("table tr:odd").css("background", "#f8e7fe");
		$("table tr:even").css("background", "#fbffdf");

	}//End config = function()
	$(function() {
		config();
	});
})(jQuery);


///////////////////////////////////////////////////////////////////////////////////////////

// for ul li

(function($){
	var config = function () {
		$(".twitterList li:odd").css("background", "#f3f3f3 url(images/bg_gray.gif) repeat-x top left");
		$(".twitterList li:even").css("background", "#ffe0eb url(images/bg_pink.gif) repeat-x top left");

	}//End config = function()
	$(function() {
		config();
	});
})(jQuery);



///////////////////// regulation01.js //////////////////////////////////////////////////////////////////////


// JavaScript Document
(function($){
	var config = function () {
/*============================hover button===============================*/						   
		$(".fadeOver").hover(function(){$(this).fadeTo("fast", 0.6);},function(){$(this).fadeTo("fast", 1);});
		
/*============================target _blank===============================*/
		$("a.tBlank").attr("target","_blank");
		
/*============================bg-color for table===============================*/
		$(".table01 tr:odd").css("background-color", "#c4c6ba");
		$(".table01 tr:even").css("background-color", "#c1c77c"); 

/*============================bg-color for dl dd===============================*/
		$(".news01 dd:odd, .dlStructureOther dd:odd").css("background-color", "#ffcc99");
		$(".news01 dd:even, .dlStructureOther dd:even").css("background-color", "#ffff00");
		
/*============================bg-color for dl dd===============================*/
		$(".news02 dd:odd").css("background-color", "red");
		$(".news02 dd:even").css("background-color", "blue");
	
/*============================ vertical-menu ===============================*/
		/*if($(".verMenu")) {
				$(".verMenu li ul").hide();
				$(".verMenu li span").click(function() {
					if(this.className.indexOf("clicked") != -1) {
						$(this).next().slideUp(200);
						$(this).removeClass("clicked");
					}
					else {
						$(".verMenu li span").removeClass();
						$(this).addClass("clicked");
						$(".verMenu li ul:visible").slideUp(200);
						
						$(this).next().slideDown(500);
					}
					return false;
				});
				
			}
		if($(".verMenu")) {
				$(".verMenu li ul.lNaviStay").show();
			}
		
		
		$(".verMenu li ul").hide();
		$(".verMenu li span").mouseover(function(){
			$(".verMenu li ul").show();
		});
		$(".verMenu li ul").mouseout(function(){
			
			$(".verMenu li ul").hide();
		});*/

$(".verMenu li ul").css("display", "none");
$(".verMenu li.clearfix").mouseover(function(){
$(this).stop().css({height:'98px'});
$(".verMenu li ul").css("display", "block");
});

$(".verMenu li.clearfix").mouseout(function(){
	$(this).stop().css({height:'29px'});
	$(".verMenu li ul").css("display", "none");
});

/*============================ print review ===============================*/
		$('#print a').click(function() {
				window.print();
				return false;
		});
	}//End config = function()

	$(function() {
		config();
	});
	
/*============================ Don't allow right click only images [Opera can't work] 

 var msgtext='右クリック不可';
 function shakewindow() {
  alert(msgtext);
  return false;
 }
 for(i=0;i<document.images.length;i++)
  document.images[i].oncontextmenu=shakewindow;  
  
==================================*/
  
/*============================ Don't allow right click [Opera can't work] ===============================*/
  function shakewindow() {
  alert(msgtext);
  return false;
 }
  document.oncontextmenu=shakewindow;

/*============================ Images vertical & center block ===============================*/
  $( document ).ready( function (){
 $("<span></span>").appendTo(".wraptocenter")
 
});

})(jQuery);


/*============================ indexX.html ===============================*/
$(function() {
			$('ol.linkList li').find('p:even').css({
										width: '200px'
			});
});

