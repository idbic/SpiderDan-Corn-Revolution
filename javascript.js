// defining variables for the canvas element. 
console.log('hellp')
let hero;

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
    }

    render(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    
}

window.addEventListener('DOMContentLoaded', (function (){
    hero = new Hero(10, 20, "#870a66", 20, 20);
    

    console.log(hero);
})())
// used codealong to get some js going. I know I will have to modify this but I wanted to start

window.addEventListener("DOMContentLoaded", function (e){
    hero = new Hero(10, 20, "#870a66", 20, 20);
    
    
    const runGame = setInterval(gameLoop, 120);
})

function gameLoop(){
    ctx.clearRect(0, 0, game.width, game.height);

    // if (shrek.alive){
    //     shrek.render();
    //     let hit = detectHit(hero, shrek);
    // }

    hero.render();
}

function movementHandler(e){
    console.log("the key that was pressed was: " + e.key);

    switch (e.key){
        case "ArrowUp":
            
            hero.y > 0 ?  hero.y -= 10  :  null;
            break
        case "ArrowDown":
            hero.y < (game.height - hero.height) ? hero.y += 10 : null;
            break
        case "ArrowLeft":
            hero.x > 0 ? hero.x -= 10 : null;
            break
        case "ArrowRight":
            hero.x < (game.width - hero.width) ? hero.x += 10 : null;
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