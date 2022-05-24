// defining variables for the canvas element. 
console.log('hellp')
let hero;
let corn; 
let redbull;
let anudaCorn;
let thirdCorn;


let game = document.querySelector('#game')
console.log(game)
let ctx = game.getContext('2d')
console.log(ctx)
game.setAttribute("width", getComputedStyle(game)['400']);
game.setAttribute("height", getComputedStyle(game)['1000']);

class Hero {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color; 
        this.height = height; 
        this.width = width; 
        this.alive = true; 
        this.speed = 3;
    }
// added this.speed and jergins move function to this class
    render(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    move() {
		this.y += this.speed;
    	if(this.y === 1000){
    		this.y = 0
    		this.x = (Math.random() * 250);
    	}
  	}
}


// used codealong to get some js going. I know I will have to modify this but I wanted to start

window.addEventListener("DOMContentLoaded", function (e){
    hero = new Hero(325, 750, "#870a66", 30, 90);
    corn = new Hero(null, 10, "#ffff00", 250, 75);
    anudaCorn = new Hero(350, 10, "#ffff00", 5, 75);
    thirdCorn = new Hero(150, 10, "#ffff00", 250, 75);
    
    const runGame = setInterval(gameLoop, 8);
}) 

function gameLoop(){
    
    ctx.clearRect(0, 0, game.width, game.height);

    // if (shrek.alive){
    //     shrek.render();
    //     let hit = detectHit(hero, shrek);
    // }

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
    
}
//added the corn move method/function 
function movementHandler(e){
    console.log("the key that was pressed was: " + e.key);

    switch (e.key){
        case "ArrowUp":
            
            hero.y > 0 ?  hero.y -= 50  :  null;
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

game.width = 650
game.height = 850

//render falling objects using modifying lecture function
//added a conditional to joels newshrek (im back on my bs)
function reCornGen() {
    if(corn.y === 900){
    corn.alive = false;
    setTimeout(function(){
        let x = Math.floor(Math.random() * game.width) - 200;
        let y = 0
        corn = new Hero(x, y, "#ffff00", 225, 75)
    }, 1000)
    return true;}

}

function reAnudaCornGen() {
    if(anudaCorn.y === 900) {
        anudaCorn.alive = false;
    setTimeout(function(){
        let x = Math.floor(Math.random() * game.width) - 200;
        let y = 0
        anudaCorn = new Hero(x, y, "#ffff00", 200, 75)
    }, 2000)
    return true;}

}

function thirdCornRegen(){
    if(thirdCorn.y === 900) {
        thirdCorn.alive = false;
    setTimeout(function(){
        let x = Math.floor(Math.random() * game.width) - 200;
        let y = 0
        thirdCorn = new Hero(x, y, "#ffff00", 175, 75)
    }, 1000)
    return true;}
}