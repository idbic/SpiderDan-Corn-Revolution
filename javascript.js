// defining variables for the canvas element. 
console.log('hellp')
let hero;
let corn;
let redbull;
let anudaCorn;
let thirdCorn;
let health;
let gameRunning = false;
let startButton;
let score = 0;
let scoreCounter = document.getElementById('scoreCounter')
let cornPic = new Image();
cornPic.src = "closecorn.jpeg";
let spiderDan = new Image();
spiderDan.src = "spiderman.png"
let rbPic = new Image();
rbPic.src = "redbull.png"
let building = new Image();
building.src = "building.jpg"
//created start button variable
//added a game running variable and I am going to create a func to change variable for start button and game end

let game = document.querySelector('#game')
console.log(game)
let ctx = game.getContext('2d')
console.log(ctx)
game.setAttribute("width", getComputedStyle(game)['400']);
game.setAttribute("height", getComputedStyle(game)['1000']);

class Hero {
    constructor(x, y, color, width, height, img) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.height = height;
        this.width = width;
        this.alive = true;
        this.speed = 3;
        this.img = img;
    }
    // added this.speed and jergins move function to this class
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    move() {
        this.y += this.speed;
        if (this.y === 1000) {
            this.y = 0
            this.x = (Math.random() * 250);
        }
    }
    clear() {
        ctx.clearRect(0, 0, game.width, game.height);
        
    }
    draw(pic, x, y, xs, ys) {
        ctx.drawImage(pic, x, y, xs, ys)
    }
}
//adding collectibles


// used codealong to get some js going. I know I will have to modify this but I wanted to start

window.addEventListener("DOMContentLoaded", function (e) {
    hero = new Hero(325, 750, "#000000", 25, 35, spiderDan);
    corn = new Hero(null, 10, "#ffff00", 200, 75, cornPic);
    anudaCorn = new Hero(350, 10, "#ffff00", 5, 75, cornPic);
    thirdCorn = new Hero(150, 10, "#ffff00", 250, 75, cornPic);
    
    startButton = new Hero(150, 380, "#ffff00", 400, 150, cornPic);
    redbull = new Hero(500, -500, '#abed15', 75, 75, rbPic)
    const runGame = setInterval(gameLoop, 8);
    
})



function gameLoop() {
    if (gameRunning === true) {
        ctx.clearRect(0, 0, game.width, game.height);


        //created health bar
        //removed health bar because it was counting every pixel as a hit


        // health.render();
        ctx.drawImage(building, 0, 0, 650, 850)
        redbull.render();
        redbull.move();
        hero.render();
        corn.render();
        corn.move();
        
        anudaCorn.render()
        anudaCorn.move();
        thirdCorn.render();
        thirdCorn.move()
        reCornGen();
        reAnudaCornGen();
        thirdCornRegen();
        detectHit(hero, corn, anudaCorn, thirdCorn);
        collect();
        detectHitCollect(hero, redbull);
        winna();

       
    } else {
        ctx.drawImage(building, 0, 0, 650, 850)
        startButton.render();
        
    }
}
window.addEventListener('click', function () {
    gameRunning = true;
})
//added the corn move method/function 
function movementHandler(e) {
    console.log("the key that was pressed was: " + e.key);

    switch (e.key) {
        case "ArrowUp":

            hero.y > 0 ? hero.y -= 50 : null;
            break
        case "ArrowDown":
            hero.y < (game.height - hero.height) ? hero.y += 50 : null;
            break
        case "ArrowLeft":
            hero.x > 0 ? hero.x -= 40 : null;
            break
        case "ArrowRight":
            hero.x < (game.width - hero.width) ? hero.x += 40 : null;
            break
        // case "mousemove":
        //     hero.x < (game.width - hero.width) ? hero.x += 10 : null;
        //     break    
    }

    console.log(hero);

}

document.addEventListener("keydown", movementHandler);
// document.addEventListener("mousemove", movementHandler);

//setting height and width of canvas element 

game.height = 850
game.width = 650

//render falling objects using modifying lecture function
//added a conditional to joels newshrek (im back on my bs)
function reCornGen() {
    // if(corn.alive === false){
    //     setTimeout(function(){
    //         let x = Math.floor(Math.random() * game.width) - 200;
    //         let y = 0
    //         corn = new Hero(x, y, "#ffff00", 225, 75)
    //     }, 1000)   
    // } else 
    if (corn.y === 900) {
        corn.alive = false;
        setTimeout(function () {
            let x = Math.floor(Math.random() * game.width) - 200;
            let y = 0
            corn = new Hero(x, y, "#ffff00", 225, 75, cornPic)
        }, 1000)
        return true;
    }

}

function reAnudaCornGen() {
    if (anudaCorn.y === 900) {
        anudaCorn.alive = false;
        setTimeout(function () {
            let x = Math.floor(Math.random() * game.width) - 200;
            let y = 0
            anudaCorn = new Hero(x, y, "#ffff00", 200, 75, cornPic)
        }, 2000)
        return true;
    }

}

function thirdCornRegen() {
    if (thirdCorn.y === 900) {
        thirdCorn.alive = false;
        setTimeout(function () {
            let x = Math.floor(Math.random() * game.width) - 200;
            let y = 0
            thirdCorn = new Hero(x, y, "#ffff00", 175, 75, cornPic)
        }, 1000)
        return true;
    }
}
//hit detection for all corn classes
function detectHit(p1, p2, p3, p4) {


    let hitTest =
        p1.y + p1.height > p2.y &&
        p1.y < p2.y + p2.height &&
        p1.x + p1.width > p2.x &&
        p1.x < p2.x + p2.width ||
        p1.y + p1.height > p3.y &&
        p1.y < p3.y + p3.height &&
        p1.x + p1.width > p3.x &&
        p1.x < p3.x + p3.width ||
        p1.y + p1.height > p4.y &&
        p1.y < p4.y + p4.height &&
        p1.x + p1.width > p4.x &&
        p1.x < p4.x + p4.width // {boolean} : if all are true -> hit

    if (hitTest) {
        location.reload();
        window.alert('Game Over You Stupid Bitch')





    } else {

        return false;
    }
}


//collectibles function

function collect() {
    if (redbull.y === 900) {
        redbull.alive = false;
        setTimeout(function () {
            let x = Math.floor(Math.random() * game.width) - 200;
            let y = 0
            redbull = new Hero(x, y, "#abed15", 75, 75, rbPic)
        }, 10000)
        return true;
    }
}

function detectHitCollect(uno, dos) {
    
    let daBull =
        uno.y + uno.height > dos.y &&
        uno.y < dos.y + dos.height &&
        uno.x + uno.width > dos.x &&
        uno.x < dos.x + dos.width; // {boolean} : if all are true -> hit

    if (daBull) {
        redbull.alive = false;
        score = score + 1
        scoreCounter.innerText = score
        return console.log(score);
        
    } else {
        return false;
    }
}

//create a win function

function winna(){
    if (score === 250) {
        location.reload();
        window.alert('You win you stupid mother fucker!');
        
    }
}