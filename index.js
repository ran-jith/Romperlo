var canvas = document.getElementById('mycan');
var ctx =   canvas.getContext('2d');
var col = "False";
var count = 50;

//ball init. position
var x = canvas.width/2;
var y = canvas.height-30;

var ballRadius = 10;
var cl;
var count = 20;
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

//for brick
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;
var hit = 0;

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

var bricks = [];
  for(var c=0; c<brickColumnCount; c++){
  bricks[c] = [];
    for(var r=0; r<brickRowCount; r++){
      bricks[c][r] =  { x:0, y:0, status:1};
  }
}
  function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
      for(var r=0; r<brickRowCount; r++){
        if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }}
    }
  }

  //collision of ball to brick
  function collisionDetection(){
    for(var c = 0; c < brickColumnCount; c++){
      for(var r = 0; r < brickRowCount; r++){
        var b = bricks[c][r];
        if(b.status == 1){
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
          dy = -dy
          b.status = 0;
          hit ++;
          score = hit*10;
          if(score == 10*brickRowCount*brickColumnCount){
            alert("You Win \nScore: "+score);
            document.location.reload();
          }
        }
      }}
    }
  }

  function drawScore(){
    ctx.beginPath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Score: "+score, 8, 20);
    ctx.closePath();
}

//moving ball
  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    //when collide boundries
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
      dx = -dx;
      col = "True";
      cl = getRandomColor();
      //ctx.fill();
    }

    if(y + dy < ballRadius){
      dy = -dy;
      cl = getRandomColor();
    }
    else if(y + dy > canvas.height-ballRadius) {
      //when touch  in paddle
      if(x > paddleX+ballRadius && x < paddleX + paddleWidth+ballRadius){
        dy = -dy;

        count = 1;
      }
    else {
      alert("Game over \n score:"+score);
      document.location.reload();
      }
      cl = getRandomColor();
      //ctx.fill();
    }
//paddle movement
    if(rightPressed && paddleX < canvas.width-paddleWidth){
      paddleX += 10;
    }
    else if(leftPressed && paddleX > 0){
      paddleX -= 10;
    }

    x += dx;
    y += dy;
  }


setInterval(draw, count);

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
