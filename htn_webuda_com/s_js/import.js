/*//this function includes all necessary js files for the application
function include(file)
{

  var scr'+'ipt  = document.createElement('scr'+'ipt');
  scr'+'ipt.src  = file;
  scr'+'ipt.type = 'text/javascr'+'ipt';
  scr'+'ipt.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(scr'+'ipt);

}


include('shCore.js');*/

/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Benoit Asselin | http://www.ab-d.fr/ */
function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("../s_js/shCore.js", "js") //dynamically load and add this .js file
loadjscssfile("../s_js/shBrushJScript.js", "js") //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("../s_js/shBrushXml.js", "js") ////dynamically load and add this .css file





/*addJavascr'+'ipt('../s_js/shCore.js','import');*/

