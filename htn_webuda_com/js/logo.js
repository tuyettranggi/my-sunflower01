var ctx = document.getElementById('logo').getContext('2d');
//arc(x, y, radius, startAngle, endAngle, anticlockwise)

ctx.lineWidth = 3;

ctx.beginPath();
  
// 本 - 語

var xHon = 101;		var yHon = 98;
var xGo = xHon-13;    var yGo = yHon-15;
var wHon = wGo = 200;
ctx.font="90px Aria";
ctx.fillStyle = "#DE5412";
ctx.fillText("    語",xGo,yGo,wGo);
ctx.fillText("本",xHon,yHon,wHon);
ctx.fillStyle = "#c8504b";
ctx.fill();

//hoc-tieng-nhat.webuda.com
var xw = 52;        var yw = 68;
ctx.font="28px Aria";
ctx.fillStyle = "#DE5412";
ctx.fillText("hoc-tieng-nhat.webuda.com",xw-50,yw+60,wHon+90);
ctx.fillStyle = "#c8504b";
ctx.fill();

  
  
// Hinh tron
ctx.beginPath();
var sA = 0;
var eA = 360 * Math.PI / 180;
var xTron = 53; var yTron = 49;
var radius = 46;
ctx.arc(xTron, yTron, radius, sA, eA, true);
ctx.strokeStyle = '#F07D46';
ctx.fill();
ctx.lineWidth = 4;
ctx.stroke();
ctx.closePath();
   
// chu 日
var x2 = xTron - 17; var y2 = yTron - 35;
ctx.beginPath();
ctx.moveTo(x2+0,y2+16);
//ctx.bezierCurveTo(x2+8,y2+16,x2+18,y2+12,x2+29,y2+15,x2+29,y2+20);
ctx.bezierCurveTo(x2,y2+13, x2+18,y2+8, x2+33,y2+15);
ctx.bezierCurveTo(x2+31,y2+20, x2+39,y2+45, x2+32,y2+52);
ctx.bezierCurveTo(x2+27,y2+58, x2+0,y2+50, x2+0,y2+55);
ctx.lineTo(x2+4,y2+16);
//ctx.quadraticCurveTo(x2,y2+20,x2+8,y2+16);

ctx.moveTo(x2+5,y2+32);
ctx.lineTo(x2+25,y2+33);

ctx.strokeStyle = '#F07D46';
ctx.lineWidth = 6;
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
   
  




