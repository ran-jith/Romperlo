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
var paddleHeight = 15;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//user control
var rightPressed = false;
var leftPressed = false;


//fixing ball
  function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = cl;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

//moving ball
  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

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
//paddle movement
    if(rightPressed && paddleX < canvas.width-paddleWidth){
      paddleX += 10;
    }
    else if(leftPressed && paddleX > 0){
      paddleX -= 5;
    }

    x += dx;
    y += dy;
  }
setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e){
    if(e.keyCode == 39){
      rightPressed = true;
    }
    else if(e.keyCode == 37){
      leftPressed = true;
    }
  }
  function keyUpHandler(e){
    if(e.keyCode == 39){
      rightPressed = false;
    }
    else if(e.keyCode == 37){
      leftPressed = false;
          }
  }
  //d();


  function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
