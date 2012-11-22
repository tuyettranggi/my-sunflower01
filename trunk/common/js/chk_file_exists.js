function chkfile(){
$(function(){
//nSrc = duong dan toi file hoac link can check
var nSrc=$('.imgC').attr('value');

$.ajax({
	
    url:nSrc,
	//url:'http://wwww.google.com',
    type:'HEAD',
    error:
        function(){
			alert(nSrc+' NOT EXISTS');
            //do something depressing
        },
    success:
        function(){
			alert(nSrc+' EXISTS');
            //do something cheerful :)
        }
});
});
}