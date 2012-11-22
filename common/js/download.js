var sPath = window.location.pathname;
//var sPage = sPath.substring(sPath.lastIndexOf('\\') + 6);
/*var sPage = sPath.substring(sPath.lastIndexOf('index') + 5);*/ // trich chuoi tu vi tri phia sau dau / cuoi cung 6 ky tu
var ie6=navigator.appVersion;
if(ie6.search("MSIE 6.0")==-1)
{ 
   var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
}
else
{
   var sPage = sPath.substring(sPath.lastIndexOf('\\') + 1);
}

var sPageN = sPage.replace('.html','');
/* doan js ban dau, neu khong duoc thi tra lai tai day
$(function(){
$('#content').append('<dl class="download">\
						 <dt>Download</dt>\
						 <dd>\
							 <ul>\
							 	<li>JS :<a href="common/js/jquery-1.3.2.min.js">jquery-1.3.2.min.js</a>and<a href="common/js/'+sPageN+'.js">'+sPageN+'.js</a></li>\
								<li>CSS :<a href="css/'+sPageN+'.css">'+sPageN+'.css</a></li><li>HTML :<a href="'+sPageN+'.html">'+sPageN+'.html</a></li>\
								</ul>\
						  </dd>\
						</dl>');
});*/

// doan js nay dang thu
$(function(){
$('#content').append('<dl class="download">\
						 <dt>Download</dt>\
						 <dd>\
							 <ul>\
							 	<li>JS :<a href="common/js/jquery-1.3.2.min.js">jquery-1.3.2.min.js</a>and<a href="common/js/'+sPageN+'.js">'+sPageN+'.js</a></li>\
								<li>CSS :<a href="css/'+sPageN+'.css">'+sPageN+'.css</a></li><li>HTML :<a href="'+sPageN+'.html">'+sPageN+'.html</a></li>\
								</ul>\
						  </dd>\
						</dl>');
});

if(ajaxFun('common/js/'+sPageN+'.js')!=null){
		alert('common/js/'+sPageN+'.js');
		
	}
	else {alert('y');}
	
function ajaxFun(nSrc){
	var kq;
	
	$.ajax({
			url: nSrc,
			//url:'http://wwww.google.com',
			type:'HEAD',
			error:
				function(){
					alert(nSrc+' not EXISTS');
					kq=nSrc;
				},
			success:
				function(){
					alert(nSrc+' EXISTS');
					   return true;  
				}
		});
	return kq; /*not Exists*/
}