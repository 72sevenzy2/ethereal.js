import { type EngineState, type Effect } from "../core/engine";
import { resolveCollisions } from "./utils/2dcollisions.js";

export interface circleType {
    positionX: number;
    positionY: number;
    velocityX: number;
    velocityY: number;
    radius: number;
    mass: number;
}

export class circle implements Effect {
    private readonly radius: number;
    private readonly positionX: number;
    private readonly positionY: number;
    private readonly velocityX: number;
    private readonly amount: number;
    private readonly velocityY: number;
    private readonly mass: number = 0;
    private readonly circles: circleType[] = [];

    constructor({ amount = 10, radius = 40, positionX = 70, positionY = 72, velocityX = 10, velocityY = 10, mass = 20 }:
        {
            amount?: number, radius?: number, positionX?: number, positionY?: number, velocityX?: number,
            velocityY?: number, mass?: number
        } = {}) {
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
                velocityY: this.velocityY,
                radius: this.radius,
                mass: this.mass
            }
            this.circles.push(circleObj);
        }
    }
    update(ctx: CanvasRenderingContext2D, state: EngineState) {
        // bounce of the walls
        for (const c of this.circles) {
            if (c.positionX + this.radius > state.width || c.positionX - this.radius < 0) {
                c.velocityX! *= -1;
            }
            if (c.positionY + this.radius > state.height || c.positionY - this.radius < 0) {
                c.velocityY! *= -1;
            }

            c.positionX += c.velocityX!;
            c.positionY += c.velocityY!;


            // collision rendering
            for (let j = 0; j < this.circles.length; j++) {
                for (let i = j + 1; i < this.circles.length; i++) {
                    const p1 = this.circles[j];
                    const p2 = this.circles[i];

                    const dx = p1.positionX - p2.positionX;
                    const dy = p2.positionY - p2.positionY;
                    const distance = Math.hypot(dx, dy);
                    if (distance < p1.radius + p2.radius) {
                        resolveCollisions(p1, p2);
                    }
                }
            }


            // drawing
            ctx.beginPath();
            ctx.arc(c.positionX, c.positionY, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }



    }
}