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

$(function(){
$('#content').append('<dl class="download"><dt>Download</dt><dd><ul><li>JS :<a href="common/js/jquery-1.3.2.min.js">jquery-1.3.2.min.js</a>and<a href="common/js/'+sPageN+'.js">'+sPageN+'.js</a></li><li>CSS :<a href="css/'+sPageN+'.css">'+sPageN+'.css</a></li><li>HTML :<a href="'+sPageN+'.html">'+sPageN+'.html</a></li></ul></dd></dl>');
});