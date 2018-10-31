function start() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,640,480);
    
}


x = 320;
y = 240;
dx = 0;  
dy = 0;

losdx = Math.random()*10;
losdy = Math.random()*10; 

if (losdx >= 5) {
    dx = 0.8;
}else {
    dx = -0.8;
}

if (losdy >= 5) {
    dy = 0.8;
}else {
    dy = -0.8;
}

//pad1
p1y = 215;
p1dy = 0;

//pad2
p2y = 215;
p2dy = 0;

function drawBall() {
    x = x + dx;
    y = y + dy;
    
    //dolna krawedz
    if (y>475) {
        dy = -dy;
        y = 475;
        audio = document.getElementById("wall");
        audio.play();
    }
    
    //prawa krawedz
    if ( x > 635) {
        dx = -dx;
        x = 635;
        audio = document.getElementById("punkt");
        audio.play();
    }
    
    //górna krawędź
    if (y < 5) {
        dy = -dy;
        y = 5;
        audio = document.getElementById("wall");
        audio.play();
    }
    
    //lewa krawedz
    if ( x < 5) {
        dx = -dx;
        x = 5;
        audio = document.getElementById("punkt");
        audio.play();
    }
    
    //lewa paletka
    if (dx < 0) {
        if ((x > 12) && (x < 15)) {
            
            if ((y>=p1y) && (y <= p1y+50)) {
                dx = -dx;
                x = 15;
                audio = document.getElementById("paletka");
                audio.play();
            }            
        }
    }
    //prawa paletka
    
    if (dx > 0) {
        if ((x >= 625) && (x < 628)) {
            
            if ((y>=p2y) && (y <= p2y+50)) {
                dx = -dx;
                x = 625;
                audio = document.getElementById("paletka");
                audio.play();
            }            
        }
    }
    
    wygrana = 20;
    if ((x<=5) ){
        //alert("Punkt zdobywa gracz 2");
        scoreRight++;
        x=320;
        y=240;
        p1y = 215;
        p1dy = 0;
        p2y = 215;
        p2dy = 0;
        //dx = -dx;
        if (scoreRight>=wygrana) {
            
            alert("Wygrał prawy gracz osiągając wynik = " +wygrana)
            scoreLeft = 0;
            scoreRight = 0;
        }
        }
    
    if (x>=635) {
        //alert("Punkt zdobywa gracz 1");
        scoreLeft++;
        x=320;
        y=240;
        p1y = 215;
        p1dy = 0;
        p2y = 215;
        p2dy = 0;
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
    ctx.arc(x,y,5,0,2*Math.PI); //pozycja poczatkowa, promien,  kąt podany w radianach
    ctx.fill();
}


function drawPad() {
    p1y = p1y + p1dy;
    if (p1y > 430) {
        p1y = 430;
    }
    
    if (p1y < 0) {
        p1y = 0;
    }
    
    p2y = p2y + p2dy;
    if (p2y > 430) {
        p2y = 430;
    }
    
    if (p2y < 0) {
        p2y = 0;
    }
    
    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(5,p1y,5,50);
    ctx.fillRect(630,p2y,5,50);
    
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
        p1dy = 1;
    }
    if (event.keyCode == 65) { 
        p1dy = -1;
    }
    
    if (event.keyCode == 38) { 
        p2dy = -1;
    }
    
    if (event.keyCode == 40) { 
        p2dy = 1;
    }
    
}

function keyUp(event) {
    if (event.keyCode == 90) { 
        p1dy = 0;
    }
    if (event.keyCode == 65) { 
        p1dy = 0;
    }
    
    if (event.keyCode == 38) { 
        p2dy = 0;
    }
    
    if (event.keyCode == 40) { 
        p2dy = 0;
    }
}



start();

setInterval(function() {
    
    start();
    
    printScore();
    drawBall();
    drawPad();
},10)


