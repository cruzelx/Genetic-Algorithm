var canvas = document.getElementById('playfield');
var ctx = canvas.getContext('2d');

var ballX=50;
var ballY=50;
var ballRadius=10;
var xValueVerticle=[10,10,10,10,150,150,150,400,400,400,600,600,600,700,700,700];
var yValueVerticle=[10,200,400,600,10,200,400,10,200,400,200,400,600,200,400,600];
var i=0;
var j=0;



function ball(){
  ctx.beginPath();
  ctx.arc(ballX,ballY,ballRadius,0,Math.PI*2,true);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function borders(x,y){
  ctx.beginPath();
  ctx.rect(x,y,10,210);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.rect(150,600,250,10);
  ctx.fill();
  ctx.rect(600,200,100,10);
  ctx.fill();
  ctx.closePath();
}
function buildBorders(){
  for(i=0;i<xValueVerticle.length;i++){
    borders(xValueVerticle[i],yValueVerticle[i]);
    console.log(xValueVerticle[i]);
  }
}
function collision(){
if (ballX+10>=canvas.width || ballY+10>=canvas.height || (ballX+10<=20) || (ballX+10>=150 && ballY<=600 &&ballX+10<=400) || (ballX>=600 && ballX<=700 && ballY>=200)  ){
  ballX=50;
  ballY=50;
}
}

ball();
buildBorders();
