var canvas = document.getElementById('mycan');
var ctx =   canvas.getContext('2d');

ctx.beginPath();
//ctx.rect(20, 40, 50, 50);
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
