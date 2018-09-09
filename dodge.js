$(document).ready(function() {
  var canvas = document.getElementById("paper2");
    ctx = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  var music = document.getElementById("music");
  var count = 0;
  var score=0;
  var highscore=0;
    var Player = function() {
      this.randomx = width/2;
      this.randomy = height/2;
      this.radius = 15;
      this.dx = 0;
      this.dy = 0;

      this.checkWallCol = function() {
        if(this.randomx + 15 >= width) {
          alert("Why you be hitting the wall???");
          reset();
        }
        if(this.randomx - 12 <= 0) {
          alert("Why you be hitting the wall???");
          reset();
        }
        if(this.randomy -12 >= height) {
          alert("Why you be hitting the wall???");
          reset();
        }
        if(this.randomy + 15 <= 0) {
          alert("Why you be hitting the wall???");
          reset();
        }
      }
      this.red = function() {

          var r = Math.floor(Math.random() * 256);
          var g = 0//Math.floor(Math.random() * 256);
          var b = 0//Math.floor(Math.random() * 256);
          var color = "rgb(" + r + ", "+ g + ", " + b + ")";

          return color;
  }
      this.blue = function() {

      var r = 0//Math.floor(Math.random() * 256);
      var g = 0//Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var color = "rgb(" + r + ", "+ g + ", " + b + ")";

      return color;
}
      this.green = function() {

    var r = 0//Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = 0//Math.floor(Math.random() * 256);
    var color = "rgb(" + r + ", "+ g + ", " + b + ")";
    return color;
}

      this.draw = function() {
        if(count == 0) {
          ctx.fillStyle = this.red();
        } else if (count == 1) {
          ctx.fillStyle = this.blue();
        } else if (count == 2) {
          ctx.fillStyle = this.green();
        }
        ctx.beginPath();
        ctx.arc(this.randomx,this.randomy,this.radius,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      this.setRandomX = function(dx2) {
          this.randomx = dx2;
      }

      this.setRandomY = function(dy2) {
          this.randomy = dy2;
      }

      this.setVelocityX = function(dx2) {
          this.dx = dx2;
      }

      this.setVelocityY = function(dy2) {
          this.dy = dy2;
      }

      this.update = function() {
        this.checkWallCol();
        this.randomx += this.dx;
        this.randomy += this.dy;
      };
}
    var myPlayer = new Player();
    var playing = false;
    function play_audio(task) {
      if(task == 'play'){
           $(music).trigger('play');
           playing = true;
      }
      if(task == 'stop'){
           $(music).trigger('pause');
           playing = false;
      }
 }
    document.addEventListener("keydown", keyDownHandler);


    function keyDownHandler(event) {
      var mag = 5;
      /*if(event.keyCode == 77) {
        console.log("hello");
        if(playing) {
          play_audio("stop")
        } else if(!playing){
          play_audio("play");
        }
      }*/
      //w and s
      if(event.keyCode == 38){
        myPlayer.setVelocityY(-mag);
        if(!playing) {
          play_audio("play");
        }
      } else if(event.keyCode == 40){
        myPlayer.setVelocityY(mag);
        if(!playing) {
          play_audio("play");
        }
      }
      //a and d
      if(event.keyCode == 37){
        myPlayer.setVelocityX(-mag);
        if(!playing) {
          play_audio("play");
        }
      } else if(event.keyCode == 39){
        myPlayer.setVelocityX(mag);
        if(!playing) {
          play_audio("play");
        }
      }
    }
    document.addEventListener("keyup", keyUpHandler);
    function keyUpHandler(event) {


      //w and s
      if(event.keyCode == 38){
        myPlayer.setVelocityY(0);
      } else if(event.keyCode == 40){
        myPlayer.setVelocityY(0);
      }
      //a and d
      if(event.keyCode == 37){
        myPlayer.setVelocityX(0);
      } else if(event.keyCode == 39){
        myPlayer.setVelocityX(0);
      }
    }

    var Circle = function(x,y,r,health) {
      this.health = health;
      this.randomx = x;
      this.randomy = y;
      this.radius = r;
      this.randomx = Math.random() * width;
      this.randomy = Math.random() * height;
      this.speedx = 5;
      this.speedy = 5;


      this.randColor = function() {

          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var b = Math.floor(Math.random() * 256);
          var color = "rgb(" + r + ", "+ g + ", " + b + ")";
          return color;
  }

      this.randOtherColor = function() {

      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var a = Math.random() * 0.5;
      var color = "rgba(" + r + ", "+ g + ", " + b + ", " + a + ")";
      return color;
  }
       this.color = this.randColor();
       this.otherColor = this.randColor();
      this.draw = function() {


        ctx.fillStyle = this.color;
        ctx.fillRect(this.randomx - 30, this.randomy - 30, this.radius*2,this.radius*2);
        ctx.fillStyle = this.otherColor;
        ctx.beginPath();
        ctx.arc(this.randomx,this.randomy,this.radius,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();







      }



      this.update = function() {
        if(this.randomx + this.radius >= width) {
            this.speedx = -(Math.floor((Math.random() * 9 + 1)));
          }
        if(this.randomx - this.radius<= 0) {
            this.speedx = (Math.floor((Math.random() * 9 + 1)));
        }
        if(this.randomy + this.radius>= height) {
          this.speedy = -(Math.floor((Math.random() * 9 + 1)));
        }
        if(this.randomy - this.radius<= 0) {
          this.speedy = (Math.floor((Math.random() * 9 + 1)));
        }

        this.randomx += this.speedx;
        this.randomy += this.speedy;
      }

    };



    var circles = [];
    function drawEnemy() {
    for(var i = 0; i < 11; i ++) {
      var c = new Circle(1,1,30,i + 1, 20);
      circles.push(c);
    }
}
    drawEnemy();

  setInterval(waveChanger, 10000);
  function waveChanger() {
    ctx.clearRect(0,0,width,height);
    if(count <= 2) {
    count++;
  } else{
    count = 0;
  }
    score += 1000;
    if(score > highscore){
      highscore=score;
    }
    var newWave = new Circle(1,1,30,)
    circles.push(newWave);
  }
  var borderColor = "white";
  function setBorder() {

    if(count == 0) {
      borderColor = "rgba(255,255,255,0)";
    } else if (count == 1) {
      borderColor = "rgba(0,0,150,0)";
    } else if (count == 2) {
      borderColor = "rgba(0,150,0,0)";
    }
    ctx.beginPath()
    ctx.lineWidth = "4";
    ctx.strokeStyle = borderColor;
    ctx.rect(1/8 * width,1/8*height,3/4 * width,3/4*height);
    ctx.stroke();
}

  function reset() {

    myPlayer.setRandomX(width/2);
    myPlayer.setRandomY(height/2);
    myPlayer.setVelocityX(0);
    myPlayer.setVelocityY(0);
    for(var i = 0; i<circles.length; i++) {
      circles[i].randomx = Math.random() * width;
      circles[i].randomy= Math.random() * height;
    }
    circles = [];
    drawEnemy();
    count = 0;
    score = 0;

  }

  function red() {
    var red = 'rgba(30,0,0,0.1)';
    return red;
  }

  function blue() {
    var blue = 'rgba(0,0,30,0.1)';
    return blue;
  }

  function green() {
    var green = 'rgba(0,30,0,0.1)';
    return green;
  }

  function animate() {
    if(count == 3) {
      count = 0;
    }
    setBorder();
    if(count == 0) {
      ctx.fillStyle = red();
    } else if (count == 1) {
      ctx.fillStyle = blue();
    } else if (count == 2) {
      ctx.fillStyle = green();
    }
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "white";
    ctx.font = "20px Georgia";
    ctx.fillText("Your Score: "+ score,20,20);
    ctx.fillText("High Score: "+ highscore,250,20);

    for(var i = 0; i < circles.length; i++) {
      if(distance(myPlayer, circles[i]) < myPlayer.radius + circles[i].radius) {
        alert("Game Over!")
        reset();


      }
  }
    for(var i = 0; i < circles.length; i ++) {
      var mc = circles[i];
      for(var t = i; t< circles.length; t++) {
        var sc = circles[t];
        if(distance(mc, sc) < mc.radius + sc.radius) {
          mc.speedx *= -1;
          mc.speedy *= -1;
          sc.speedx *= -1;
          sc.speedy *= -1;
        }
      }
      circles[i].draw();
      circles[i].update();
    }
    myPlayer.draw();
    myPlayer.update();


    requestAnimationFrame(animate);

  }

  function distance(c1,c2) {
    var d = Math.sqrt(Math.pow(c1.randomx - c2.randomx, 2) + Math.pow(c1.randomy - c2.randomy, 2));

    return d;
  }

    animate();
});
