var canvas = document.getElementById('mycan');
var ctx =   canvas.getContext('2d');
var col = "False";

//ball init. position
var x = canvas.width/2;
var y = canvas.height-30;

var ballRadius = 10;
var cl;

//changing position for each frame
var dx = 2;
var dy = -2;

//draw paddle(variables)


//fixing
  function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = cl;
    ctx.fill();
    ctx.closePath();
  }

//moving
  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    //when collide boundries
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
      dx = -dx;
      col = "True";
      cl = getRandomColor();
      //ctx.fill();
    }

    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius){
      dy = -dy;
      col = "True";
      cl = getRandomColor();
      //ctx.fill();
    }
    x += dx;
    y += dy;
  }
setInterval(draw, 10);
  //d();


  function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
