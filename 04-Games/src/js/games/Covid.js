import { GameTemplate } from "./GameTemplate.js"
import { GameObject, MovableGameObject, Ball, Mode, Bullet, StrokedObject } from "../GameObject.js";
import { Pong, Paddle } from "../games/Pong.js";

export class Covid extends GameTemplate {

    start() 
    {
        //to do: globale variablen
        this.gameOver = false;
        //this.playerSpeed = 5;
        //ctx.canvas.height 
        this.canvas = document.querySelector(".screen")
        //this.canvas.onmousedown = shoot();
        //console.log(this.canvas);
        this.canvas.addEventListener("mousedown",(e) => this.shoot(e));
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Paddle(175, 250, 25, 25, 2); //border collision
        //this.player = new Ball(200, 450, 50, 50, "#6bd26b", 8, 0);
        //document.querySelector(".canvas")
        this.bullets = [];
        this.stones = [];
        this.walls = []
        this.points = 0;
        this.lives = 5;
        this.spawnIntervalStones = 0;
        this.spawnIntervalBullets = 0;
        this.bulletId = 0;
        this.buildMap();
        //this.player.addEventListener("mousedown", event => this.shoot(event));
        //this.screen =  
    }

    bindControls() 
    {
        this.inputBinding = {
            "up" : this.player.up.bind(this.player),
            "down" : this.player.down.bind(this.player), 
            "left" : this.player.left.bind(this.player), 
            "right" : this.player.right.bind(this.player), 
            "primary" : this.shoot.bind(this),
        };
    }

    update(ctx) // einmal pro frame
    {
        this.player.update(ctx);
        this.checkBullets(ctx);
        //this.checkStones(ctx);
        ctx.font = "30px Verdana";
        //ctx.fillStyle = "#000000";
        ctx.fillText(this.lives, this.player.x, this.player.y);
        if(this.lives === 0)
        {
            this.gameOver = true;
        }
    }

    draw(ctx) 
    {
        this.player.draw(ctx);
        this.bullets.forEach(bullets => bullets.draw(ctx));
        this.stones.forEach(stones => stones.draw(ctx));
        this.walls.forEach(walls => walls.draw(ctx));
        this.checkWalls();
        this.drawPoints(ctx);
    }

    shoot(e)
    {
        //console.log(ctx);
        let rect = this.canvas.getBoundingClientRect();
        let scaleX = this.canvas.width / rect.width;    // relationship bitmap vs. element for X
        let scaleY = this.canvas.height / rect.height;
        let dx = ((e.x-rect.left)*scaleX - this.player.x);
        let dy = ((e.y-rect.top)*scaleY - this.player.y);
        let scale = Math.sqrt(dx * dx + dy * dy); //???
        if(this.spawnIntervalBullets > 10)
        {
            this.bullets.push(new Ball(this.player.x, this.player.y, 10, 10, "#6bd26b", (dx / scale) * 30, (dy / scale) * 30));
            //console.log(e.x-rect.left);
            //console.log(e.y-rect.top);
            this.spawnIntervalBullets = 0;
            // to do: speed variable
            //this.bullets[this.bulletId] = new Bullet(this.player.x, this.player.y, 10, 10, "#6bd26b", 0, -8, this.bulletId, -8, e.x, e.y);
            //this.bulletId += 1;
        }
    }

    checkBullets(ctx)
    {
        if(this.spawnIntervalBullets <= 10)
        {
            this.spawnIntervalBullets = this.spawnIntervalBullets + 1;
        }
        for(let i = 0; i < this.bullets.length; i++) // for each bessser weil sonst abfrage auf bereits gelöschte elemente
        {
            this.bullets[i].update(ctx);
            if(this.bullets[i].y < 0)
            {
                this.bullets.splice(i, 1);
            }
            for(let j = 0; j < this.stones.length; j++)
            {
                /*if(this.bullets[i].x === this.stones[j].x && this.bullets[i].y === this.stones[j].y)
                {

                    this.bullets.splice(i, 1);
                    this.stones.splice(j, 1);
                    console.log(this.bullets[i].y+10);
                }*/
                if(GameObject.rectangleCollision(this.bullets[i], this.stones[j])) {
                    this.bullets.splice(i, 1);
                    this.stones.splice(j, 1);
                    this.points = this.points + 1;
                }
                if(GameObject.rectangleCollision(this.walls[j], this.bullets[i])) {
                    this.bullets.splice(i, 1);
                    //this.walls.splice(j, 1);
                }
            }
            /*this.stones.forEach(this.stones => {
                if(GameObject.rectangleCollision(this.bullets[i], paddle)) {
                    this.handleHit(ctx, paddle);
                }
            });*/
        }
    }

    checkStones(ctx)
    {
        for(let j = 0; j < this.stones.length; j++)
        {
            this.stones[j].update(ctx);
            if(this.stones[j].y > 500)
            {
                this.stones.splice(j, 1);
                //this.lives = this.lives - 1;
            }
        }
        if(this.spawnIntervalStones > 30)
        {
            this.stones.push(new Ball((Math.random()*300)+25, 0, 50, 100, "#6bd26b", 0, 1));
            this.spawnIntervalStones = 0;
        }
        else
        {
            this.spawnIntervalStones = this.spawnIntervalStones + 1;
        }
    }

    checkWalls()
    {
        for(let i = 0; i < this.walls.length; i++) // for each bessser weil sonst abfrage auf bereits gelöschte elemente
        {
            if(GameObject.rectangleCollision(this.player, this.walls[i])) {
                console.log("Hallo");
                let index =  i;
                // Problem: Wenn collision dann wird erst das oberste überprüft alternativ: vx und vy >< 0
                if(this.player.x < this.walls[index].x + 40 && this.player.x > this.walls[index].x)
                {
                    //right
                    console.log("right");
                    this.player.x = this.walls[index].x + 40;
                }
                else if(this.player.x > this.walls[index].x)
                {
                    //left
                    console.log("left");
                    this.player.x = this.walls[index].x;
                }
                else if(this.player.y < this.walls[index].y + 40)
                {
                    //under
                    console.log("under");
                    this.player.y = this.walls[index].y + 40;
                }
                else if(this.player.y > this.walls[index].y)
                {
                    //over
                    console.log("over");
                    this.player.y = this.walls[index].y;
                }
            }
            for(let j = 0; j < this.bullets.length; j++)
            {
                if(GameObject.rectangleCollision(this.walls[i], this.bullets[j])) {
                    this.bullets.splice(i, 1);
                    //this.walls.splice(j, 1);
                }
            }
        }
    }

    buildMap() 
    {
        let wallPostition = [[50,50], [50,410], [310,50], [310,410]];
        for(let i = 0; i < wallPostition.length; i++)
        {
            this.walls.push(new StrokedObject(wallPostition[i][0],  wallPostition[i][1], 40, 40, "#6bd26b", 5));
            //console.log(wallPostition[i][0]);
            //this.food = new StrokedObject(50, 50, 25, 25, "#6bd26b", 5);
        }
    }

    drawPoints(ctx) {
        ctx.fillStyle = "#6bd26b";
        ctx.font = "30px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(this.points, 200, 15);
    }

    gameOverScreen(ctx) {
        this.drawPoints(ctx);
        super.gameOverScreen(ctx);
    }

    static get NAME()
    {
        return "Covid";
    }
}
