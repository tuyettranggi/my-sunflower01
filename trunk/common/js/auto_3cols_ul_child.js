$(function($){
var L=$('ul.productList li').length;
var S=L-$('ul.productList li ul li').length;

var col=0;
var j=1;
var classNumber=1;

while (col<=L && j<=S){
	
	$('ul.productList li:eq('+col+')').addClass('row'+classNumber);
	if(j%3==0 && j>1){
		classNumber++;
	}
	col=col+$('ul.productList li:eq('+col+')').find('ul li').length+1; 
	j++;
}

for(var wrap=1; wrap<=classNumber+1; wrap++){
	$('ul.productList li.row'+wrap).wrapAll('<li class="bgCol3B clearfix"><ul class="subCol clearfix" /></li>');
}

var last=$('ul.productList li.row'+classNumber).length;
if(last==1)
{
	$('ul.productList li.row'+classNumber).parents('.bgCol3B').css({width:'192px'});
}
else if(last==2)
{
	$('ul.productList li.row'+classNumber).parents('.bgCol3B').css({width:'384px'});
}
});
