$(function(){

  var pageNumber = 0;
  let once = 0;
  var posB = $(window).scrollTop();
  let scrollControlNumber = 'impossible';

  setTimeout(() => {
    scrollControlNumber = 'possible';
  }, 7000);
  function handleTouchMove(event) {
    event.preventDefault();
  }
  window.scrollTo(0,(window.innerHeight * 20) / 2);

  window.onload = function() {
    window.addEventListener('wheel', handleTouchMove, { passive: false });
    setTimeout(() => {
      window.removeEventListener('wheel', handleTouchMove, { passive: false });
      window.onscroll = function(){
        window.addEventListener('wheel', handleTouchMove, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        var scrollCounter = document.documentElement.scrollTop || document.body.scrollTop;
        var posA = $(this).scrollTop();
        setTimeout(() => {
          let centerScroll = (window.innerHeight * 20) / 2;
          window.scrollTo(0,centerScroll);
        }, 2000);
  
  
        if(scrollControlNumber == 'possible'){
          if(posA < posB){
            pageControlButton(-1);
            scrollControlNumber = 'impossible';
            setTimeout(function(){scrollControlNumber = 'possible'},3000);
          }else{
            pageControlButton(1);
            scrollControlNumber = 'impossible';
            setTimeout(function(){scrollControlNumber = 'possible'},3000);
          }
        }
        
  
        posB = posA;

  
        if(scrollCounter > window.innerHeight * 18){
          console.log('test')
          window.scrollTo(0,1);
        }else if(scrollCounter < 1){
          window.scrollTo(0,window.innerHeight * 20);
          console.log('pra')
        };
        setTimeout(() => {
          window.removeEventListener('wheel', handleTouchMove, { passive: false });
          window.removeEventListener('touchmove', handleTouchMove, { passive: false });
          $('.scrollScreen').css('postion','absolute');
        }, 3000);
      }
    }, 7000);
    for(let i = 0;i < 4;i++){
      splash(i * 100)
    }

  }


  //scroll&ripple
  $('#scrollButton').hover(
    function(){
      if($(window).width() > 800){
        $(this).css('border','1px solid cyan')
        $(this).css('color','cyan')
        $(this).css('background-color','gray')
        $(this).css('box-shadow','transparent 0px 0px 10px 5px inset')
        $('#scrollButton p:nth-child(2)').css('color','cyan')
      };
    },
    function(){
      if($(window).width() > 800){
        $(this).css('border','1px solid black')
        $(this).css('color','black')
        $(this).css('background-color','transparent')
        $(this).css('box-shadow','transparent 0px 0px 10px 5px inset')
        $('#scrollButton p:nth-child(2)').css('color','transparent')
      };
    }
  )

  

  function ripple(){
    $('#scrollButtonRipple').css('transition','1s');
    $('#scrollButtonRipple').css('transform','scale(30)');
    $('#scrollButtonRipple').css('pointer-ivents','none');
    $('#scrollButtonRipple').css('opacity','0');
    setTimeout(rippleInit,1000);
    function rippleInit(){
      $('#scrollButtonRipple').css('transition','0s');
      $('#scrollButtonRipple').css('transform','scale(0)');
      $('#scrollButtonRipple').css('pointer-ivents','auto');
      $('#scrollButtonRipple').css('opacity','1');
      
    }
  };



//left list
  $('.contentList a').hover(
    function(){
      $(this).css('color','rgb(255, 125, 4)');
    },
    function(){
      $(this).css('color','rgb(59, 59, 59)');
    }
  );



  function leftListMark(nowPage){
    for(let i = 0;i < 4;i++){
      $('.mark' + i).css('opacity','0');
    }
    $('.mark' + nowPage).css('opacity','1');
  };
  leftListMark(pageNumber);


  function leftListClick(){
    for(let i = 0;i < 4;i++){
      $('#contentList' + i).click(
        function(){
          atelier();
          $('.content' + String(pageNumber + 1)).css('visibility','hidden').css('opacity','0');

          splash(pageNumber * 100);
          function contentFadeInList(){
            pageNumber = i;
            $('.content' + String(i + 1)).css('visibility','visible').css('opacity','1');
            waveAndParticle()
            leftListMark(pageNumber);
            if(pageNumber == 2){
              if(once == 0){
                setTimeout(() => {
                  background6();
                }, 1200);
                once = 1;
              };
            };
          }
          setTimeout(contentFadeInList,1000);
          if($(window).width() < 800){
            $('.crossContainer').css('transform','rotateY(90deg)');
            $('.contentList').css('visibility','hidden').css('transform','rotate(150deg)').css('opacity','0');
            $('.contentList li').css('transform','rotate(-150deg)')
            setTimeout(function(){
              $('.crosses').css('visibility','hidden');
              $('.hamburger').css('width','100%');
            },500);
          }
        }
      );
    }
    $('.miniList').click(
      function(){
        $('.contentList').css('visibility','hidden').css('transform','rotate(150deg)').css('opacity','0');
        $('.contentList li').css('transform','rotate(-150deg)');
        setTimeout(function(){
          $('.rightBlankMini').css('visibility','visible').css('transform','rotate(0deg)').css('opacity','1');
          $('.contactMini p').css('transform','rotate(0deg)');
        },500)
      }
    )
  };
  leftListClick();










//pagecontrol
  var pageControl = function(){
    for(let i = 1;i < 5;i++){
      $('.content' + String(i)).css('visibility','hidden');
      $('.content' + String(i)).css('opacity','0');
      $('.white').css('opacity','1').css('visibility','visible').css('opacity','1');
    };
    setTimeout(contentFadeIn,1000);
  };


  function contentFadeIn(){
    $('.content' + String(pageNumber + 1)).css('visibility','visible');
    $('.content' + String(pageNumber + 1)).css('opacity','1');
    $('.white').css('opacity','0').css('visibility','hidden').css('opacity','0');
  };

  

  var pageControlButton = function(vector){
    ripple();
    splash(pageNumber * 100);
    if(pageNumber === 0 && vector === -1){
      pageNumber = 3;
    }else if(pageNumber < 3){
    pageNumber += 1 * vector;
    }else{
      if(vector === 1){
        pageNumber = 0
      }else{
        pageNumber = 2
      }
    }
    if(pageNumber == 2){
      if(once == 0){
        setTimeout(() => {
          background6();
        }, 1200);
        once = 1;
      };
    };
    atelier();
    waveAndParticle()
    pageControl();
    leftListMark(pageNumber);
    $(this).css('pointer-events','none');
    setTimeout(function(){
      $('#scrollButton').css('pointer-events','auto');
    },2000)
    if($(window).width() < 800){
      $('.crossContainer').css('transform','rotateY(90deg)');
      $('.contentList').css('visibility','hidden').css('transform','rotate(150deg)').css('opacity','0');
      $('.contentList li').css('transform','rotate(-150deg)')
      setTimeout(function(){
        $('.crosses').css('visibility','hidden');
        $('.hamburger').css('width','100%');
        $('.rightBlankMini').css('visibility','hidden');
      },500);
      $('.rightBlankMini').css('transform','rotate(150deg)').css('opacity','0');
      $('.contactMini p').css('transform','rotate(-150deg)');
    }
  };


  $('#scrollButton').click(
    function(){
      pageControlButton(1);
    })




  function waveAndParticle(){
    if(pageNumber == 0 || pageNumber == 3){
      $('#particleContainer').css('visibility','visible').css('opacity','1');
      $('.wavesContainer').css('visibility','visible').css('opacity','1');
    }else{
      $('#particleContainer').css('visibility','hidden').css('opacity','0');
      $('.wavesContainer').css('visibility','hidden').css('opacity','0');
    }
  }




//文字を散らばす
  function splash(pageIdentification){
    let splitResult = [];
    let newTexts = [[],[],[],[],[],[],[],[],[],[],[],[],[]];

    let textNumbers = document.querySelectorAll('.splash' + String(pageIdentification));
    textNumbers = textNumbers.length;
    for(let i = 0;i < textNumbers;i++){
      let textInside = document.querySelector('#splash' + String(i + pageIdentification));
      textInsideAll = textInside.textContent;
      splitResult[i] = textInsideAll.split('');
      for(let j = 0;j < splitResult[i].length;j++){
        let insertSpan = splitResult[i];
        newTexts[i] += '<span>' + insertSpan[j] + '</span>';
      }
      textInside.innerHTML = newTexts[i];
      function scatter(){
        for(let k = 1;k < splitResult[i].length + 1;k++){
          let randomX = ((Math.random() * 20) - 10) * 20;
          let randomY = ((Math.random() * 20) - 10) * 10;

          $('#splash' + String(i + pageIdentification) + ' span:nth-child(' + k + ')').css('transform','translateX(' + randomX + 'px) translateY(' + randomY + 'px) rotateX(1080deg) rotateY(1080deg)').css('transition-timing-function','ease-in');
          setTimeout(init,2000);
          function init(){
            $('#splash' + String(i + pageIdentification) + ' span:nth-child(' + k + ')').css('transform','translateX(0px) translateY(0px) rotateX(1080deg) rotateY(1080deg)');
          }
        }
      }
      setTimeout(scatter,3);//splashTextを実装する時はこのscatterの部分（jqueryでspan一つ一つにtransformを設定する時）はsettimeoutで実行させる必要あり。
    }
  }






//content2
  $('.circleText').hover(
    function(){
      $('#circle').css('transform','scale(1.2)');
    },
    function(){
      $('#circle').css('transform','scale(1)');
    }
  )










  //content3
  function atelier(){
    let r = $('.atelier').width()/2;

    let angle = 360/6;

    let workAngleFirst = 270;
    let workAngles = [];
    for(let i = 0;i < 8;i++){
      workAngles[i] = workAngleFirst;
      workAngleFirst = workAngleFirst + 60;
    }

    let w = $('.work').width()/2;
    let h = $('.work').height()/2;

    $('.work').each(function(index){
      let deg = angle * index;

      let x = Math.cos(deg*Math.PI/180)*r+r;
      let y = Math.sin(deg*Math.PI/180)*r+r;



      $(".work").eq(index).css("left",x-w);
      $(".work").eq(index).css("top",y-h);
      $('.work').eq(index).css('transform','rotateZ(' + workAngles[index] + 'deg) rotateX(-90deg)');
    });
  }
  atelier();
  window.addEventListener('resize',atelier);






  function arrowMove(){
    $('.prevContent3Button').hover(
      function(){
        $(this).css('color','orange');
        $('.prevArrow').css('right','15px').css('border-bottom','1px solid orange');
        $('.prevArrow2').css('border-bottom','1px solid orange');
      },
      function(){
        $(this).css('color','black');
        $('.prevArrow').css('right','5px').css('border-bottom','1px solid black');
        $('.prevArrow2').css('border-bottom','1px solid black');
      }
    )

    $('.nextContent3Button').hover(
      function(){
        $(this).css('color','orange');
        $('.nextArrow').css('left','15px').css('border-bottom','1px solid orange');
        $('.nextArrow2').css('border-bottom','1px solid orange');
      },
      function(){
        $(this).css('color','black');
        $('.nextArrow').css('left','5px').css('border-bottom','1px solid black');
        $('.nextArrow2').css('border-bottom','1px solid black');
      }
    )
  }

  arrowMove();

  function atelierRotate(){
    for(let i = 2;i < 7;i++){
      $('.work:nth-child(' + i + ') img').css('opacity','0.6');
    }
    let atelierRotateDeg = 90;
    let atelierWorkNumber = 1;
    $('.work:nth-child(' + atelierWorkNumber + ') img').css('transform','scale(1.4) rotateZ(20deg)');
    $('.prevContent3Button').click(
      function(){
        atelierRotateDeg = atelierRotateDeg + 60;
        $('.atelier').css('transform','rotateZ(' + atelierRotateDeg + 'deg)');
        $('.work:nth-child(' + atelierWorkNumber + ') img').css('opacity','0.6').css('transform','scale(1) rotateZ(0deg)');
        if(atelierWorkNumber == 1){
          atelierWorkNumber = 7;
        };
        atelierWorkNumber = atelierWorkNumber - 1;
        $('.work:nth-child(' + atelierWorkNumber + ') img').css('opacity','0.9').css('transform','scale(1.4) rotateZ(20deg)');
        atelier();
      }
    )
    $('.nextContent3Button').click(
      function(){
        atelierRotateDeg = atelierRotateDeg - 60;
        $('.atelier').css('transform','rotateZ(' + atelierRotateDeg + 'deg)');
        $('.work:nth-child(' + atelierWorkNumber + ') img').css('opacity','0.6').css('transform','scale(1) rotateZ(0deg)');
        if(atelierWorkNumber == 6){
          atelierWorkNumber = 0;
        };
        atelierWorkNumber = atelierWorkNumber + 1;
        $('.work:nth-child(' + atelierWorkNumber + ') img').css('opacity','0.9').css('transform','scale(1.4) rotateZ(20deg)');
        atelier();
      }
    )
  }
  atelierRotate();















  function load(){
    (function() {
      var requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();
    $('#loadPageContaine').css('width',screen.width).css('height',screen.height);
    $('.left').css('border-top',window.innerHeight + 100 + 'px' + ' white solid').css('border-right',window.innerWidth + 'px' + ' transparent solid')
    $('.right').css('border-bottom',window.innerHeight + 100 + 'px' + ' white solid').css('border-left',window.innerWidth + 'px' + ' transparent solid')

    function centerLineCanvas(){
      let canvasLine = document.getElementById('centerLine');
      let ctx = canvasLine.getContext('2d');

      canvasLine.width = window.innerWidth;
      canvasLine.height = window.innerHeight;

      let speed = 80;
      let posxSpeed = window.innerWidth / speed;
      let posySpeed = window.innerHeight / speed;
      let posx = innerWidth;
      let posy = 0;
      function centerLineUpdate(){
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(innerWidth,0);
        posx = posx - posxSpeed;
        posy = posy + posySpeed;
        ctx.lineTo(posx,posy)

        ctx.stroke();
        if(posy > window.innerHeight){
          clearInterval(lineMove)
        }
      }
      var lineMove = setInterval(centerLineUpdate,1);
    }
    setTimeout(centerLineCanvas,6100);



    let splitNumberList = [];

    function loadTextSplash(block){
      let text1 = document.querySelector(block + ' #splashLoadText1');
      let text2 = document.querySelector(block + ' #splashLoadText2');
      let text1Inside = text1.textContent;
      let text2Inside = text2.textContent;
      let textSplit1 = text1Inside.split('');
      let textSplit2 = text2Inside.split('');
      splitNumberList.push(textSplit1.length);
      splitNumberList.push(textSplit2.length);
      let newText1 = [];
      let newText2 = [];

      for(let i = 0;i < textSplit1.length;i++){
        newText1 += '<span>' + textSplit1[i] + '</span>';
      }
      for(let i = 0;i < textSplit2.length;i++){
        newText2 += '<span>' + textSplit2[i] + '</span>';
      }
      text1.innerHTML = newText1;
      text2.innerHTML = newText2;
      function loadTextScatter(){
        for(let j = 1;j < 3;j++){
          for(let k = 1;k < textSplit1.length + 1;k++){
            let randomX = ((Math.random() * 20) - 10) * 20;
            let randomY = ((Math.random() * 20) - 10) * 10;
            $(block + ' .loadText' + j + ' span:nth-child(' + k + ')').css('transform','translateX(' + randomX + 'px) translateY(' + randomY + 'px)').css('transition-timing-function','ease-out').css('opacity','0');
            $(block).css('opacity','1');
          }
        }

        for(let j = 1;j < 3;j++){
          for(let k = 1;k < textSplit2.length + 1;k++){
            let randomX = ((Math.random() * 20) - 10) * 20;
            let randomY = ((Math.random() * 20) - 10) * 10;
            $(block + ' .loadText' + j + ' span:nth-child(' + k + ')').css('transform','translateX(' + randomX + 'px) translateY(' + randomY + 'px)').css('transition-timing-function','ease-out').css('opacity','0');
          }
        }
      }

      setTimeout(loadTextScatter,3);

      function loadTextInit(initBlock){
        for(let i = 0;i < 5;i++){
          $(initBlock + ' .loadText' + i + ' span').css('transform','translateX(0px) translateY(0px) rotateX(1080deg) rotateY(1080deg)').css('opacity','1');
        }
        setTimeout(loadTextScatter,2000);
      }
      setTimeout(function(){loadTextInit(block)},1000);
    }
    setTimeout(function(){loadTextSplash('.loadTextBlock1')},3);
    setTimeout(function(){loadTextSplash('.loadTextBlock2')},4000);

    function open(){
      $('.loadPageWhite').css('background-color','transparent');
      function openMove(){
        $('.left').css('top',-screen.height).css('left',-screen.width).css('background-color','transparent');
        $('.right').css('bottom',-screen.height).css('right',-screen.width).css('background-color','transparent');
        setTimeout(function(){$('.loadPage').css('display','none')},1000);
        $('#centerLine').css('opacity','0');
      }
      setTimeout(openMove,1000);
    }
    setTimeout(open,6000);



  };

  load();



//miniScreen
  function miniScreenList(first,second,third,forth){
    let r = $('.contentList').width()/2;

    let angle = 360/first;
    $(forth).each(function(index){
      let deg = angle * index + second;

      let x = Math.cos(deg*Math.PI/180)*r+r;
      let y = Math.sin(deg*Math.PI/180)*r+r;



      $(forth).eq(-index + third).css("left",x);
      $(forth).eq(-index + third).css("top",y);
    });
  }

  window.addEventListener('resize',miniScreenList(15,90,4,'.contentList li'))
  window.addEventListener('resize',miniScreenList(11,120,2,'.contactMini p'))


  function hamburger(){
    $('.hamburgers').click(
      function(){
        $('.hamburger').css('width','0');
        $('.contentList').css('visibility','visible').css('transform','rotate(0deg)').css('opacity','1').css('transition','1s');
        $('.contentList li').css('transform','rotate(0deg)')
        setTimeout(function(){
          $('.crossContainer').css('transform','rotateY(0deg)');
          $('.crosses').css('visibility','visible');
        },500);
      }
    )
    $('.crosses').click(
      function(){
        $('.crossContainer').css('transform','rotateY(90deg)');
        $('.contentList').css('visibility','hidden').css('transform','rotate(150deg)').css('opacity','0');
        $('.contentList li').css('transform','rotate(-150deg)')
        setTimeout(function(){
          $('.crosses').css('visibility','hidden');
          $('.hamburger').css('width','100%');
          $('.rightBlankMini').css('visibility','hidden');
        },500);
        $('.rightBlankMini').css('transform','rotate(150deg)').css('opacity','0');
        $('.contactMini p').css('transform','rotate(-150deg)');
      }
    )
  }
  hamburger();



  function background6(){
    let canvas = document.getElementById('lineDrow');
    let ctx = canvas.getContext('2d');
    canvas.width = screen.width * 2;
    canvas.height = screen.height * 2;
    let density = 5;
    let lines = [];
    let colors = ['springgreen','cyan','lime'];
  
    let lineControl = function(){
      this.posxInit = Math.random() * canvas.width;
      this.posyInit = Math.random() * canvas.height;
      this.posx = Math.random() * canvas.width;
      this.posy = Math.random() * canvas.height;
      this.color = colors[~~(Math.random() * 3)];
    }
  
    for(let i = 0;i < density;i++){
      lines.push(new lineControl);
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);
  
    function lineDraw(){
      for(let i = 0;i < density;i++){
        ctx.beginPath();
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = lines[i].color;
        ctx.lineWidth = 1;
        lines[i].posxInit = Math.random() * canvas.width;
        lines[i].posyInit = Math.random() * canvas.height;
        lines[i].posx = Math.random() * canvas.width;
        lines[i].posy = Math.random() * canvas.height;
        ctx.moveTo(lines[i].posxInit,lines[i].posyInit);
        ctx.lineTo(lines[i].posx,lines[i].posy);
        ctx.stroke();
      }
    }
    let cnt = 0;
    let timerId = setInterval(function(){
      cnt++
      lineDraw();
      if(cnt===1000){
        clearInterval(timerId);  
        once = 1;
      }
    }, 1);
  }
  














});
