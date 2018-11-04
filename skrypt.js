function start() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,640,480);
    
}

ball = {
x: 320,
y: 240,
dx: 0,  
dy: 0,
    //przesun pilke
move: function() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
}
}

/*
x = 320;
y = 240;
dx = 0;  
dy = 0;
*/
losdx = Math.random()*10;
losdy = Math.random()*10; 

if (losdx >= 5) {
    ball.dx = 0.8;
}else {
    ball.dx = -0.8;
}

if (losdy >= 5) {
    ball.dy = 0.8;
}else {
    ball.dy = -0.8;
}

//pad1
//p1y = 215;
//p1dy = 0;

pad1 = {
    y: 215,
    dy: 0
}

//pad2
//p2y = 215;
//p2dy = 0;

pad2 = {
    y: 215,
    dy: 0
}

function drawBall() {
    //x = x + dx;
    //y = y + dy;
    ball.move();
    //dolna krawedz
    if (ball.y>475) {
        ball.dy = -ball.dy;
        ball.y = 475;
        audio = document.getElementById("wall");
        audio.play();
    }
    
    //prawa krawedz
    if ( ball.x > 635) {
        ball.dx = -ball.dx;
        ball.x = 635;
        audio = document.getElementById("punkt");
        audio.play();
    }
    
    //górna krawędź
    if (ball.y < 5) {
        ball.dy = -ball.dy;
        ball.y = 5;
        audio = document.getElementById("wall");
        audio.play();
    }
    
    //lewa krawedz
    if ( ball.x < 5) {
        ball.dx = -ball.dx;
        ball.x = 5;
        audio = document.getElementById("punkt");
        audio.play();
    }
    
    //lewa paletka
    if (ball.dx < 0) {
        if ((ball.x > 12) && (ball.x < 15)) {
            
            if ((ball.y>=pad1.y) && (ball.y <= pad1.y+50)) {
                ball.dx = -ball.dx;
                ball.x = 15;
                audio = document.getElementById("paletka");
                audio.play();
            }            
        }
    }
    //prawa paletka
    
    if (ball.dx > 0) {
        if ((ball.x >= 625) && (ball.x < 628)) {
            
            if ((ball.y>=pad2.y) && (ball.y <= pad2.y+50)) {
                ball.dx = -ball.dx;
                ball.x = 625;
                audio = document.getElementById("paletka");
                audio.play();
            }            
        }
    }
    
    wygrana = 10;
    if ((ball.x<=5) ){
        //alert("Punkt zdobywa gracz 2");
        scoreRight++;
        ball.x=320;
        ball.y=240;
        pad1.y = 215;
        pad1.dy = 0;
        pad2.y = 215;
        pad2.dy = 0;
        //dx = -dx;
        if (scoreRight>=wygrana) {
            
            alert("Wygrał prawy gracz osiągając wynik = " +wygrana)
            scoreLeft = 0;
            scoreRight = 0;
        }
        }
    
    if (ball.x>=635) {
        //alert("Punkt zdobywa gracz 1");
        scoreLeft++;
        ball.x=320;
        ball.y=240;
        pad1.y = 215;
        pad1.dy = 0;
        pad2.y = 215;
        pad2.dy = 0;
       // dx = -dx;
        if (scoreLeft>=wygrana) {
           
            alert("Wygrał lewy gracz osiągając wynik = " +wygrana)
            scoreLeft = 0;
            scoreRight = 0;
        }
    }
    
    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(ball.x,ball.y,5,0,2*Math.PI); //pozycja poczatkowa, promien,  kąt podany w radianach
    ctx.fill();
}


function drawPad() {
    pad1.y = pad1.y + pad1.dy;
    if (pad1.y > 430) {
        pad1.y = 430;
    }
    
    if (pad1.y < 0) {
        pad1.y = 0;
    }
    
    pad2.y = pad2.y + pad2.dy;
    if (pad2.y > 430) {
        pad2.y = 430;
    }
    
    if (pad2.y < 0) {
        pad2.y = 0;
    }
    
    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(5,pad1.y,5,50);
    ctx.fillRect(630,pad2.y,5,50);
    
}

scoreLeft = 0;
scoreRight = 0;

function printScore() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "60px Arial";
    ctx.fillText(scoreLeft,200,80);
    ctx.fillText(scoreRight,400,80);
    
    ctx.beginPath();
    ctx.strokeStyle="white";
    ctx.setLineDash([15,10]); //linia przerywana
    ctx.moveTo(320,30);
    ctx.lineTo(320,450);
    
    ctx.stroke();
}


function keyDown(event) {
    console.log(event);
    if (event.keyCode == 90) { 
        pad1.dy = 1;
    }
    if (event.keyCode == 65) { 
        pad1.dy = -1;
    }
    
    if (event.keyCode == 38) { 
        pad2.dy = -1;
    }
    
    if (event.keyCode == 40) { 
        pad2.dy = 1;
    }
    
}

function keyUp(event) {
    if (event.keyCode == 90) { 
        pad1.dy = 0;
    }
    if (event.keyCode == 65) { 
        pad1.dy = 0;
    }
    
    if (event.keyCode == 38) { 
        pad2.dy = 0;
    }
    
    if (event.keyCode == 40) { 
        pad2.dy = 0;
    }
}



start();

setInterval(function() {
    
    start();
    
    printScore();
    drawBall();
    drawPad();
},10)


