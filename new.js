$(document).keydown(function(e) {
    if (e.keyCode == 116 && e.ctrlKey) {
        alert('ctrl + F5');
    }
	
	if(e.keyCode == 116 && e.ctrlKey==false){
		alert('F5');	
	}
});


//reload cache
$('.reload').click(function() {
    location.reload(true);
});