$(document).ready(function(){

var sPath = window.location.pathname;
var ie6=navigator.appVersion;
if(ie6.search("MSIE 6.0")==-1)
{ 
   var sPage = sPath.substring(sPath.lastIndexOf('/') + 6);

}
else
{
   var sPage = sPath.substring(sPath.lastIndexOf('\\') + 6);
}

var sPageN = sPage.replace('.html','');

(function($){
			var sMax=1;
			var s = 10;
			var n = 0;
			while(sMax<s)
			{
				var nSrc=new Array();
				nSrc= 'index'+sMax+'.html';
				var notE=ajaxFun(nSrc);
				if(notE==1) { n = sMax;
					sMax++;
				}
				else {
					sMax = s;
				}
			}
		   var m=sPageN;
		   var mm=parseInt(m);
		   $('ol.pages li').remove();
		   var prev=mm-1;
		   if(mm>1)
		   {
		   		$('ol.pages').append('<li><a href="index'+prev+'.html">&lt;&lt;</a></li>');
		   }
		   else if(mm==1)
		   {
			   $('ol.pages').append('<li class="selected"><a>&lt;&lt;</a></li>');
		   }
		   
		   for(i=1; i<=n; i++)
		   {
			   if (i==1 && i==mm)
			   {
				   $('ol.pages').append('<li class="selected"><a>'+i+'</a></li>');
			    }
			   else
			   {$('ol.pages').append('<li><a href="index'+i+'.html">'+i+'</a></li>');}
		   }
		   $('ol.pages li:eq('+mm+')').addClass('selected').find('a').removeAttr('href');
		   $('ol.pages:eq(1) li:eq('+mm+')').addClass('selected').find('a').removeAttr('href');
		   if(mm==n)
		   {
				$('ol.pages').append('<li class="selected"><a>&gt;&gt;</a></li>');
		   }
		   else
		   {
			   var next=mm+1;
		   		$('ol.pages').append('<li><a href="index'+next+'.html">&gt;&gt;</a></li>');
		   }
})(jQuery);

(function($){
			   var m=parseInt(sPageN)+1;
			   $('.next').find('a').attr({href:'index'+m.valueOf()+'.html'});
			   
		   		var startN=(sPageN-1)*10+1;
				$('ol').attr({start:startN});
				
				
			$('ol.linkList li').find('p:even').css({
										width: '200px'
			});
			
			var nStt=$('ol.menu li').length-1;
			for(stt=0;stt<=nStt;stt++){
			var nStart=$('ol.linkList').attr('start');
			$('ol.linkList li:eq('+stt+')').attr({id:nStart+stt});
			$('ol.menu li:eq('+stt+') a').attr({href:'#'+parseInt(nStart+stt)});
			}
			
			$('ol.menu li:eq('+parseInt(stt-1)+') a').attr({href:'#layout'});
			
			if($('ol.menu li').length>11 || $('ol.linkList li').length>11)
			{
				document.write('Noi dung vuot qua 10 li');
			}
			
			$('ol.menu li a').click(function(){
				var ahref=$(this).attr('href');
					$(this).parents().find('ol.linkList li').css({background: 'none'});
					$(this).parents().find('ol.linkList li#'+ahref).css({background:'#f3f98f'});
			});
})(jQuery);


});


    function ajaxFun(url){
        var fSuccess = false;
        var client = null;

        try {
            client = new XMLHttpRequest();
            client.open("GET", url, false);
            client.send();
        }
        catch (err) {
            client = null;
        }

        // Try the ActiveX control if available
        if (client === null) {
            try {
                client = new ActiveXObject("Microsoft.XMLHTTP");
                client.open("GET", url, false);
                client.send();
            }
            catch (err) {
                // Giving up, nothing we can do
                client = null;
            }
        }

        fSuccess = Boolean(client && client.responseText);

        return fSuccess;
    }
