import { type EngineState, type Effect } from "../core/engine";

export class circle implements Effect {
    private radius: number;
    private positionX: number;
    private positionY: number;
    private velocityX: number;
    private velocityY: number;

    constructor({ radius = 40, positionX = 12, positionY = 72, velocityX = 10, velocityY = 10 }:
        { radius: number, positionX: number, positionY: number, velocityX?: number, velocityY?: number }) {
        this.radius = radius;
        this.positionX = positionX;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.positionY = positionY;
    }
    update(ctx: CanvasRenderingContext2D, state: EngineState) {

    }
}