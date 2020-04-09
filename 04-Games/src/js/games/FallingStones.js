import { GameTemplate } from "./GameTemplate.js"
import { MovableGameObject, Ball, GameObject } from "../GameObject.js";
import { Paddle } from "./Pong.js";

export class FallingStones extends GameTemplate {

    start() {
        this.stones = [];
        this.stoneSpeed = 2;
        this.stoneHeight = 100;
        this.stoneWidth = 50;
        this.counter = 0;

        this.life = 5;
        this.points = 0;

        this.player = new Paddle(225, 450, 50, 50, 10);

        this.bulletLock = 0;
        this.bullets = [];

        this.gameOver = false;
    }

    bindControls() {
        this.inputBinding = {
            "left": this.player.left.bind(this.player), 
            "right": this.player.right.bind(this.player), 
            "up": this.shoot.bind(this),
        };
    }

    update(ctx) {
        this.updateStones(ctx);
        this.player.update(ctx);
        this.updateBullets(ctx);
    }

    updateStones(ctx) {
        this.stones.forEach(stone => {
            stone.update(ctx);            
        });
        this.counter++;
        if(this.counter >=  2 * this.stoneHeight / this.stoneSpeed) {
            this.counter = 0;
            this.spawnStone(ctx);
        }
        if(this.stones[0] && this.stones[0].y > ctx.canvas.height) {
            this.stones.shift();
            this.life--;
            if(this.life <= 0) {
                this.gameOver = true;
                this.gameOverText = ["GAME OVER", this.points + " stones destroyed", "Restart: A"];
            };  
        }
    }

    updateBullets(ctx) {
        this.bulletLock--;
        this.bullets.forEach(bullet => {
            bullet.update(ctx);            
        });

        if(this.bullets[0]) {
            this.stones.forEach((stone, i) => {
                if(GameObject.rectangleCollision(this.bullets[0], stone)) {
                    this.stones.splice(i, 1);
                    this.bullets.shift();
                    this.points++;
                }
            });   
        }
        if(this.bullets[0] && this.bullets[0].y < 0) {
            this.bullets.shift();
        }
    }

    draw(ctx) {
        this.stones.forEach(stone => stone.draw(ctx));
        this.bullets.forEach(bullet => bullet.draw(ctx));
        this.player.draw(ctx);
        this.drawLife(ctx);
    }

    drawLife(ctx) {
        ctx.fillStyle = "#060";
        ctx.font = "30px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(this.life, this.player.x + 25, this.player.y + 25);
    }

    shoot() {
        if(this.bulletLock <= 0) {
            this.bulletLock = 30;
            this.bullets.push(new MovableGameObject(this.player.x + 20, this.player.y, 10, 10, "#6bd26b", this.player.vx, -15));
        } 
    }

    spawnStone(ctx) {
        let width = this.stoneWidth,
            height = this.stoneHeight,
            spawnX = Math.random() * (ctx.canvas.width - width);
        this.stones.push(new MovableGameObject(spawnX, -height, width, height, "#6bd26b", 0, this.stoneSpeed));
    }

    static get NAME() {
        return "Falling Stones";
    }
}
