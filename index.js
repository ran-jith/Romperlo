var canvas = document.getElementById('mycan');
var ctx =   canvas.getContext('2d');
var col = "False";
var count = 50;
pause = false;

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
var brickRowCount = 4;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 20;
var brickOffsetTop = 35;
var brickOffsetLeft = 30;

var score = 0;
var hit = 0;

var lives = 3;

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
    ctx.fillStyle = "white";
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
          //increase speed
          dx = dx*1.05;
          dy = dy*1.05;
          if(score == 10*brickRowCount*brickColumnCount){
            alert("You Win \nScore: "+score);
            document.location.reload();
          }
        }
      }}
    }
  }

  var txt = 'Score';
  function drawScore(ctx, txt, font, x, y){
   ctx.save();
   ctx.font = font;
   ctx.textBaseline = 'top';
   ctx.fillStyle = '#f50';

   var width = ctx.measureText(txt).width;
   ctx.fillRect(x, y, width, parseInt(font, 10));

   ctx.fillStyle = '#000';
   ctx.fillText(txt, x, y);

   ctx.restore();
}

  var txt2 = "Lives";
  function drawLives(ctx, txt2, font, x, y) {
    ctx.save();
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#f50';

    var width = ctx.measureText(txt2).width;
    ctx.fillRect(x, y, width, parseInt(font, 10));

    ctx.fillStyle = '#000';
    ctx.fillText(txt2, x, y);

    ctx.restore();
  }




////////////////////////cusotm alert/////////////////////

/////////////////////////////////////////////////////////


//moving ball
  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore(ctx, txt+":"+score, '20px arial', 30, 10);
    drawLives(ctx, txt2+":"+lives, '20px arial', 700, 10);
    collisionDetection();

    if(pause == false){
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
      if(x > paddleX-ballRadius && x < paddleX + paddleWidth+ballRadius){
        dy = -dy;
        //dx = +dx;

        count = 1;
      }
    else {
      lives--;
      if(!lives){
        alert("Game over \n Score"+score);
        document.location.reload();
      }
      else{
        x = canvas.width/2;
        y = canvas.height-30;
        //dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth)/2;
}
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

  //  if(buttonPressed){
      //alert("hello");
    //}

    x += dx;
    y += dy;
  }
}

setInterval(draw, count);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e){
    if(e.keyCode == 39){
      rightPressed = true;
    }
    else if(e.keyCode == 37){
      leftPressed = true;
    }
    else if (e.keyCode == 106) {
      cheat();
    }
    else if (e.keyCode == 80) {
      paused();
    }
    else if (e.keyCode == 82) {
      resume();
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
      if(color == '#000000'){
        getRandomColor();}
      else {
        return color;
      }
  }


  function paused(){
    pause = true;
    var msg1 = "Paused";
    var msg2 = "Press R to Resume";
    document.getElementById("warn").innerHTML = msg1 +"<br>"+ msg2;
  }
  function resume(){
    pause = false;
    document.getElementById("warn").innerHTML = "";
  }

    function cheat(){
      lives = 100;
    }
