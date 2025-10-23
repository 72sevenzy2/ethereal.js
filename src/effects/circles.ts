import { type EngineState, type Effect } from "../core/engine";

interface circleType {
    positionX: number;
    positionY: number;
    velocityX?: number;
    velocityY?: number;
}

export class circle implements Effect {
    private radius: number;
    private positionX: number;
    private positionY: number;
    private velocityX: number;
    private amount: number;
    private velocityY: number;
    private circles: circleType[] = [];

    constructor({ amount = 10, radius = 40, positionX = 70, positionY = 72, velocityX = 10, velocityY = 10 }:
        {
            amount?: number, radius?: number, positionX?: number, positionY?: number, velocityX?: number,
            velocityY?: number
        }) {
        this.radius = radius;
        this.positionX = positionX;
        this.velocityX = velocityX;
        this.amount = amount;
        this.velocityY = velocityY;
        this.positionY = positionY;

        let circleObj: circleType;
        for (let i = 0; i < this.amount; i++) {
            circleObj = {
                positionX: this.positionX + Math.random() * 100,
                positionY: this.positionY + Math.random() * 100,
                velocityX: this.velocityX,
                velocityY: this.velocityY
            }
            this.circles.push(circleObj);
        }
    }
    update(ctx: CanvasRenderingContext2D, state: EngineState) {
        for (const c of this.circles) {
            if (c.positionX + this.radius > state.width || c.positionX - this.radius < 0) {
                c.velocityX! *= -1;
            }
            if (c.positionY + this.radius > state.height || c.positionY - this.radius < 0) {
                c.velocityY! *= -1;
            }

          

            c.positionX += c.velocityX!;
            c.positionY += c.velocityY!;

            ctx.beginPath();
            ctx.arc(c.positionX, c.positionY, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }
    }
}