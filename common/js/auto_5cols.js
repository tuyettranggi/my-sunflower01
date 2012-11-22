
$(document).ready(function(){

var ss=$("ul.productList").length;

for(ii=0; ii<ss; ii++)
{	
	var i=0;
	var col=1;
	var t=0;	
	var L=$("ul.productList:eq("+(ii)+") li").length; 
		while (i<L){
					if(col%5==1){t++;}
						$("ul.productList:eq("+(ii)+") li:eq("+(i)+")").addClass('bg' + t);
				col++;
				i++;
		}
		for (var j1=0; j1<=t; j1++){
				$("ul.productList:eq("+(ii)+") .bg" + j1).wrapAll('<ul class="subCol clearfix" />');
		}
		$("ul.productList:eq("+(ii)+") .subCol").wrap('<li class="bgCol3B clearfix"/>');
		
	var S1=$("ul.productList:eq("+(ii)+") li.bgCol3B").size();
	var last=$("ul.productList:eq("+(ii)+") li.bgCol3B:eq("+(S1-1)+") ul li").length;
	if (last==1)
	{
		$("ul.productList:eq("+(ii)+") li.bgCol3B:eq("+(S1-1)+")").addClass('size1');
	}
	else if (last==2)
	{
		$("ul.productList:eq("+(ii)+") li.bgCol3B:eq("+(S1-1)+")").addClass('size2');
	}
	else if (last==3)
	{
		$("ul.productList:eq("+(ii)+") li.bgCol3B:eq("+(S1-1)+")").addClass('size3');
	} 
	else if (last==4)
	{
		$("ul.productList:eq("+(ii)+") li.bgCol3B:eq("+(S1-1)+")").addClass('size4');
	} 
}

});