(function() {
    var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();




var background1 = function(){
  

  var canvas = document.getElementById('particle');
  var ctx = canvas.getContext('2d');



  canvas.width = screen.width;
  canvas.height = screen.height;






  var baseSpeed = 6;
  var density = 50;
  var colors = ['springgreen','cyan','lime'];
  var baseSize = 4;
  var sizePlus = 0.05;
  var particles = [];



  var particle = function(){
      this.size = (Math.random() + 0.5) * baseSize;
      this.sizeChange = this.size;
      this.color = colors[~~(Math.random() * 3)];
      this.speed = baseSpeed * ((Math.random() * 5 ) + 5) / 10;
      this.randomPos = Math.random();
      this.posx = canvas.width * (1 - this.randomPos);
      this.posy = canvas.height * this.randomPos;
      this.vec = (Math.random() * 10 - 8) / 10;
      this.vecx = (-canvas.width * 0.001 + this.vec) * this.speed;
      this.vecy = (canvas.height * 0.001) * this.speed;
      this.alpha = 0.1;
  };


  var init = function(){
      for (var i = 0;i < density;i++){
          particles.push(new particle);
      };


      
      var update = function(){
          window.requestAnimationFrame(update);

          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          for (var i = 0;i < density;i++){
            particles[i].posx += particles[i].vecx;
            particles[i].posy += particles[i].vecy;
            particles[i].sizeChange += sizePlus;
            particles[i].alpha += 0.005;

            if(particles[i].alpha > 0.999){
              particles[i].alpha = 1;
            };


            if(particles[i].posx > canvas.width + 10) {
                particles[i].posx = canvas.width + 5;
                particles[i].posy = -5;
                particles[i].sizeChange = particles[i].size;
                particles[i].alpha = 0.1;
              } else if(particles[i].posx < 0 - 10) {
                particles[i].posx = canvas.width + 5;
                particles[i].posy = -5;
                particles[i].sizeChange = particles[i].size;
                particles[i].alpha = 0.1;
              } else if(particles[i].posy > canvas.height + 10) {
                particles[i].posx = canvas.width + 5;
                particles[i].posy = -5;
                particles[i].sizeChange = particles[i].size;
                particles[i].alpha = 0.1;
              } else if(particles[i].posy < 0 - 10) {
                particles[i].posx = canvas.width + 5;
                particles[i].posy = -5;
                particles[i].sizeChange = particles[i].size;
                particles[i].alpha = 0.1;
              };

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = particles[i].color;
            ctx.fillStyle = particles[i].color;
            ctx.arc(particles[i].posx, particles[i].posy, particles[i].sizeChange, 0, Math.PI * 2.0, true);
            ctx.globalAlpha = particles[i].alpha;

            ctx.stroke();


          };




      };
      update();

  };

  init();

};














var background2 = function(){
  var wave1 = 'wave1';
  var wave2 = 'wave2';
  var wave3 = 'wave3';
  function wavesAnimation(wave,timing){

    var degree = 0;
    var colors = ['deepskyblue','dodgerblue','springgreen','lime','cyan','deepskyblue','dodgerblue','springgreen','lime','cyan'];

        
    var canvas2 = document.getElementById(wave);
    var ctx = canvas2.getContext('2d');
    canvas2.width =screen.width * 4.5;
    canvas2.height = 800;


    function draw(){
      window.requestAnimationFrame(draw);
      ctx.clearRect(0,0,canvas2.width,canvas2.height);

      //drawWave(colors[0],speed,time(上下するのにかかる時間、横の幅),swing(上下の幅))

      drawWave(colors[0],10 + timing,600,180)
      drawWave(colors[1],9 + timing,500,150)
      drawWave(colors[2],8 + timing,400,120)
      drawWave(colors[3],7 + timing,300,90)
      drawWave(colors[4],6 + timing,200,60)
      drawWave(colors[5],5 + timing,650,180)
      drawWave(colors[6],4 + timing,550,150)
      drawWave(colors[7],3 + timing,450,120)
      drawWave(colors[8],2 + timing,350,90)
      drawWave(colors[9],1 + timing,250,60)
      

    }
    draw();

    function drawWave(color,speed,time,swing){
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      drawSine(degree,speed,time,swing);
      ctx.stroke();

      degree += 1;
    }

    function drawSine(degree,speed,time,swing) {
      ctx.moveTo(0, canvas2.height/2); //始点
      for (var x=1; x <= canvas2.width; x+= 1) {
        var y = Math.sin(degree / (speed * 100) + x/time) * swing;       //var y = Math.sin(degree / speed + x/上下往復の時間、波の横の幅) * 上下の幅;
          ctx.lineTo(x, y+(canvas2.height/2));
      };
    };

  };
  wavesAnimation(wave1,0);
  wavesAnimation(wave2,0.5);
  wavesAnimation(wave3,1);


};






















var background3 = function(){
  var circle = "circle";
  var rotateCircles = function(circle){
    var canvas3 = document.getElementById(circle);
    var ctx = canvas3.getContext('2d');
    var size = document.getElementById('circleBox');

    canvas3.width = size.clientWidth * 3;
    canvas3.height = size.clientHeight * 3;

    var density = 15;
    var colors = ['lime','cyan','cyan'];
    var centerx = canvas3.width / 2;
    var centery = canvas3.height / 2;
    var circles = [];
    var gap = 70;

    var circle = function(){
      this.color = colors[~~(Math.random() * 3)];
      this.speed = Math.random() /10;//この値をangleに足していきその度に描画、それによって回転しているように見える。
      this.angle = 0;//回転数を保存している
      this.size = Math.random() * 70;
    };

    var init = function(){
      for (var i = 0;i < density;i++){
          circles.push(new circle);
      };
    };
    init();

    
    var rotateCircle = function(){
      requestAnimationFrame(rotateCircle);

      ctx.clearRect(0,0,canvas3.width,canvas3.height);
      for(var i = 0;density > i;i++){
      
        circles[i].angle += circles[i].speed;//それぞれのcircleの回転スピード（this.speed）をrequestanimationframeの周期でangleに足していきそれをrequestanimationframeの周期で描画している

        circles[i].posx = Math.cos(circles[i].angle) * gap + centerx;
        circles[i].posy = Math.sin(circles[i].angle) * gap + centery;
    
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = circles[i].color;
        ctx.arc(circles[i].posx,circles[i].posy,850 - circles[i].size,0,Math.PI * 2,false);  // 上下左右の中心点からの最大のズレの値は70まで、それ以上は見切れる
        ctx.stroke();

      };
    };
    rotateCircle();

    


    

    
  };
  rotateCircles(circle);

};







var background4 = function(){
  var flowText = function(){
    var canvas = document.getElementById('flowText');
    var ctx = canvas.getContext('2d');

    canvas.width = screen.width;
    canvas.height = screen.height;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = 'black';
    ctx.lineWidth = 6;
    ctx.font = "normal bolder 200px 'MSゴシック'";
    ctx.globalAlpha = 0.1;
    var textWidth = ctx.measureText('CHIATSU IKEDA ');


    var texts = [];


    var text = function(pos){
      this.posx = pos;
      this.speed = 0.3;
    };

    var init = function(){
      for (var i = 0;i < 3;i++){
        var pos = i * textWidth.width;
        texts.push(new text(pos));
      };
    };
    init();

    var update = function(){
      requestAnimationFrame(update);
      ctx.clearRect(0,0,canvas.width,canvas.height);

      for(var i = 0;i < 3;i++){
        texts[i].posx += -texts[i].speed;
      

        if(texts[i].posx <  0 - textWidth.width){
          texts[i].posx = textWidth.width * 2;
          
        };


        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.lineWidth = 6;
        ctx.font = "normal bolder 200px 'MSゴシック'";
        ctx.textAlign = 'left';
        ctx.textBaseLine = 'middle';
        ctx.globalAlpha = 0.05;
        var y = canvas.height / 2;
        ctx.fillText('CHIATSU IKEDA ',texts[i].posx,y + 100)
      };





    };
    update();
  };
  flowText();
};




function background5(){
  let canvas = document.getElementById('lineDrow');
  let ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let baseSpeed = 3;
  let density = 6;
  let colors = ['springgreen','cyan','lime'];
  let baseSize = 300;
  let particles = [];



  var particle = function(){
      this.color = colors[~~(Math.random() * 3)];
      this.speed = baseSpeed * ((Math.random() * 5 ) + 5) / 10;
      this.posx = canvas.width * Math.random();
      this.posy = canvas.height * Math.random();
      this.vec = Math.random() * 10 - 5;
      this.vecx = canvas.width * 0.0001 * baseSpeed * this.vec;
      this.vecy = canvas.height * 0.0001 * baseSpeed * this.vec;
      this.vecChangex = 1;
      this.vecChangey = 1;
  };


  var init = function(){
      for (var i = 0;i < density;i++){
          particles.push(new particle);
      };


      
      var update = function(){
          window.requestAnimationFrame(update);

          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          for (var i = 0;i < density;i++){
            particles[i].posx += particles[i].vecx * particles[i].vecChangex;
            particles[i].posy += particles[i].vecy * particles[i].vecChangey;


            if(particles[i].posx > canvas.width) {
              particles[i].vecChangex = particles[i].vecChangex * (-1);
              } else if(particles[i].posx < 0) {
                particles[i].vecChangex = particles[i].vecChangex * (-1);
              } else if(particles[i].posy > canvas.height) {
                particles[i].vecChangey = particles[i].vecChangey * (-1);
              } else if(particles[i].posy < 0) {
                particles[i].vecChangey = particles[i].vecChangey * (-1);
              };


            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = particles[i].color;
            ctx.fillStyle = particles[i].color;
            ctx.arc(particles[i].posx, particles[i].posy, baseSize, 0, Math.PI * 2.0, true);
            ctx.globalAlpha = 1;
            ctx.stroke();


          };




      };
      update();

  };

  init();
}
background1();
background2();
background3();
background4();















 
