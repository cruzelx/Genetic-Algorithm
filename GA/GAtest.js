var canvas = document.getElementById('playfield');
var ctx = canvas.getContext('2d');

var GA=function(popuSize) {
  this.popuSize = popuSize;
  this.genes = ['u', 'd', 'l', 'r'];
  this.chromoSize = 1000;
  this.popu = [];
  this.ballX = 100;
  this.ballY = 100;
  this.ballRadius = 10;
  this.convergence = 3;
  this.generation = 0;
  this.check = false;
  this.dx = 2;
  this.dy = 2;

  this.borders=function() {
    ctx.beginPath();
    ctx.rect(10, 10, 10, 800);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.rect(150, 10, 10, 600);
    ctx.fill();
    ctx.rect(400, 10, 10, 600);
    ctx.fill();
    ctx.rect(600, 200, 10, 600);
    ctx.fill();
    ctx.rect(700, 200, 10, 600);
    ctx.fill();
    ctx.rect(150, 600, 250, 10);
    ctx.fill();
    ctx.rect(600, 200, 100, 10);
    ctx.fill();
    ctx.closePath();
  }

  this.ball=function () {
    ctx.beginPath();
    ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  this.movement=function(x) {
    if (x == 'u') this.ballY -= this.dy;
    else if (x == 'd') this.ballY += this.dy;
    else if (x == 'l') this.ballX -= this.dx;
    else this.ballX += this.dx;
  }

  this.collision=function () {
    if (this.ballX + 10 >= canvas.width || this.ballY + 10 >= canvas.height || (this.ballX + 10 <= 20) || (this.ballX + 10 >= 150 && this.ballY <= 600 && this.ballX + 10 <= 400) || (this.ballX >= 600 && this.ballX <= 700 && this.ballY >= 200)) {
      this.ballX = 100;
      this.ballY = 100;
      return true;
    }
  }

  this.chromosomes=function() {
    result = "";
    for (i = 0; i < this.chromoSize; i++) {
      result += this.genes[Math.round(Math.random() * 3)];
    }
    return result;
  }

  this.genPopu=function () {
    if (this.check == false) {
      for (i = 0; i < this.popuSize; i++) {
        this.popu.push(this.chromosomes());
      }
    }
  }

  this.fitness=function (gene) {
    var distance = 0;
    for (i = 0; i < gene.length; i++) {
      this.movement(gene[i]);
      distance += Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
      if (this.collision()) {
        break;
      }
    }
    this.ballX=100;
    this.ballY=100;
    return distance;
  }

  this.selection=function () {
    var fit, x = 0,
      y = 0;
    var randNum = Math.round(Math.random() * this.popuSize);
    if (randNum + this.convergence >= this.popuSize) {
      randNum = this.popuSize - this.convergence;
    }
    for (i = randNum; i < randNum + this.convergence; i++) {
      fit = this.fitness(this.popu[i]);
      if (fit > x) {
        x = fit;
        y = i
      }
    }
    return this.popu[y];
  }

  this.crossover=function () {
    var parent1 = this.selection().split("");
    var parent2 = this.selection().split("");
    var nextGen = []
    for (i = 0; i < this.popuSize; i++) {
      for (j = Math.round(this.popu[i].length / 2); j < this.popu[i].length; j++) {
        parent1[i] = parent2[i];
      }
      nextGen.push(parent1.join(""));
    }
    this.popu = nextGen;
  }

  this.mutation=function () {
    var indiv;
    var mutatedGen = [];
    for (i = 0; i < this.popuSize; i++) {
      indiv = this.popu[i].split("");
      indiv[Math.round(Math.random() * (this.popu[i].length - 1))] = this.gene.split("")[Math.round(Math.random() * 3)];
      mutatedGen.push(indiv);
    }
    this.popu = mutatedGen;
  }

  this.termination=function () {
    this.check = true;
    this.generation++;
    console.log("Generation: ", this.generation);
    if (this.ballX >= 750 && this.ballY >= 700) {
      return true;
    }
  }

  this.loopThrough=function () {
    this.ball();
    this.borders();
    this.genPopu();
    this.selection();
    this.crossover();
    this.mutation();
    if (this.termination()) {
      clearInterval();
    }
  }
}

const x = new GA(10);
setInterval(x.loopThrough(),100);
