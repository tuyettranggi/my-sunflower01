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
/*
//--start
doan js ban dau, neu khong duoc thi tra lai tai day
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
//--end


//--start
doan js thu 2 bk
$('#content').append('<dl class="download"><dt>Download</dt><dd><ul>');
$('dl.download ul').append('<li>JS :<a href="common/js/jquery-1.3.2.min.js">jquery-1.3.2.min.js</a>-- \
						   <a href="common/js/'+sPageN+'.js">'+sPageN+'.js</a></li>',exists('css/'+sPageN+'.css'),
																																									   '<li>HTML :<a href="'+sPageN+'.html">'+sPageN+'.html</a></li>\
								</ul>\
						  </dd>\
						</dl>');
//--end
*/

// doan js dung de append
$(function(){


// xem co bao nhieu tag <script> trong file html
//	var script = new Array();
//	var i = $('script').size();
//	for(j=0; j<=i;j++){
//		script[j] = $('script').attr('src');
//	}
//



// append vao html
$('#content').append('<dl class="download"><dt>Download</dt><dd><ul>');
$('dl.download ul').append('<li>JS :<a href="common/js/jquery-1.3.2.min.js">jquery-1.3.2.min.js</a>'+filejs()+'--\
							<a href="common/js/'+sPageN+'.js">'+sPageN+'.js</a></li>',exists('css/'+sPageN+'.css'),exists('css/'+sPageN+'.css'),
																																									   '<li>HTML :<a href="'+sPageN+'.html">'+sPageN+'.html</a></li>\
								</ul>\
						  </dd>\
						</dl>');
//

});

// doan nay in ra cac file js khac ngoai nhung file js cung ten
function filejs(){
	var script = new Array();
	var i = $('script').size();
  if(i>2){
	for(j=0; j<=i;j++){
		script[j] = $('script').eq(j).attr('src');
	}
	
	var con = "";
	for(t=2; t<i-1; t++){
		if(script[t]!="common/js/'+sPageN+'.js"){
			con += '-- <a href="'+script[t]+'">'+script[t].replace('common/js/','')+'</a>';
		}
	}
	return con;
  }
  else{
	return '';  
  }
}

function exists(nCss){
	var t = ajaxFun(nCss);
	if(t==null) {
		return '<li>CSS :<a href="css/'+sPageN+'.css">'+sPageN+'.css</a></li>';
	}
	else{
		return false;
	}
}


function ajaxFun(nSrc){
	var kq;
//--start 
//doan js nay dung de lay phan duong dan (khong lay ten trang web)
var sPath = window.location.pathname;
//var pageName = sPath.substring(sPath.lastIndexOf('\\') + 1);
var pageName = sPath.substring(sPath.lastIndexOf('/') + 1);
var href= location.href;
var nSrc1 = href.replace(pageName,nSrc);
//--end

	$.ajax({
			url: nSrc1,
			dataType: "js", // data dung de xac dinh du lieu can kiem tra
			dataType: "css", // neu la duong dan binh thuong thi khong can de data
			//url:'http://wwww.google.com',
			type:'HEAD',
			error:
				function(){
				 kq=nSrc;
				},
			success:
				function(){
					return true;
				}
		});
	
	return kq;
}