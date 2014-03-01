var ctx = document.getElementById('logo').getContext('2d');
//arc(x, y, radius, startAngle, endAngle, anticlockwise)

ctx.lineWidth = 3;

ctx.beginPath();
/*
  ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
  ctx.moveTo(110,75);
  ctx.arc(75,75,35,0,Math.PI,false);   // Mouth (clockwise)
  ctx.moveTo(65,65);
  ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
  ctx.moveTo(95,65);
  ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
  ctx.stroke();*/
  
  var xGo = 72;        var yGo = 69;
   var xHon = xGo+12;        var yHon = yGo + 15;
	ctx.font="73px Aria";
	ctx.fillStyle = "#DE5412";
/*  ctx.fillText("hoc-tieng-nhat.webuda.com",x-50,y+60,215);*/
  ctx.fillText("    語",xGo,yGo,305);
  ctx.fillText("本",xHon,yHon,305);
  ctx.fillStyle = "#c8504b";
  ctx.fill();
  
  
  var xw = 52;        var yw = 45;
	ctx.font="23px Aria";
	ctx.fillStyle = "#DE5412";
  ctx.fillText("hoc-tieng-nhat.webuda.com",xw-50,yw+60,245);
  ctx.fillStyle = "#c8504b";
  ctx.fill();
  
  
  
  // Hinh tron
  ctx.beginPath();
  	var sA = 0;
	var eA = 360 * Math.PI / 180;
	var xTron = 47; var yTron = 45;
	var radius = 37;
	ctx.arc(xTron, yTron, radius, sA, eA, true);
  	
	ctx.strokeStyle = '#F07D46';
	ctx.fill();
	ctx.lineWidth = 4;
	ctx.stroke();
   ctx.closePath();
   
   // chu 日
	var x2 = xTron - 17; var y2 = 12;
	ctx.beginPath();
	ctx.moveTo(x2+8,y2+16);
	//ctx.bezierCurveTo(x2+8,y2+16,x2+18,y2+12,x2+29,y2+15,x2+29,y2+20);
	ctx.bezierCurveTo(x2,y2+16,x2+18,y2+12,x2+29,y2+15,x2+29,y2+20);
	ctx.bezierCurveTo(x2+29,y2+20,x2+36,y2+47,x2+25,y2+45);
	ctx.bezierCurveTo(x2+25,y2+48,x2+0,y2+44,x2+4,y2+45);
	ctx.lineTo(x2+8,y2+16);
	//ctx.quadraticCurveTo(x2,y2+20,x2+8,y2+16);
	
	ctx.moveTo(x2+5,y2+28);
	ctx.lineTo(x2+22,y2+30);
	
	ctx.strokeStyle = '#F07D46';
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.closePath();
	  

	
	/*var x3 = 65;
	var y3 = -3;
	ctx.beginPath();
	ctx.bezierCurveTo(x3+9,y3+26,x3+31,y3+29,x3+49,y3+27);
	ctx.moveTo(x3+30,y3+17);
	ctx.lineTo(x3+31,y3+58);
	ctx.moveTo(x3+30,y3+34);
	ctx.quadraticCurveTo(x3+20,y3+40,x3+13,y3+50);
	ctx.moveTo(x3+23,y3+52);
	ctx.lineTo(x3+39,y3+51);
	ctx.moveTo(x3+48,y3+46);
	ctx.quadraticCurveTo(x3+41,y3+44,x3+37,y3+40);
	ctx.strokeStyle = '#c8504b';
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.closePath();*/
   
  




