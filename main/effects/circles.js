import { resolveCollisions } from "./utils/2dcollisions.js";
export class circle {
    constructor({ amount = 10, radius = 50, velocityX = 10, velocityY = 10, mass = 100, positionBound = [0, 0] } = {}) {
        this.circles = [];
        this.radius = radius;
        this.positionBound = positionBound;
        this.velocityX = velocityX;
        this.amount = amount;
        this.velocityY = velocityY;
        this.mass = mass;
    }
    update(ctx, state) {
        let circleObj;
        if (this.circles.length === 0) {
            for (let i = 0; i < this.amount; i++) {
                const minX = this.positionBound[0];
                const maxX = this.positionBound[1];
                const minY = this.positionBound[2] ?? 0;
                const maxY = this.positionBound[3] ?? 100;
                const posX = Math.floor(Math.random() * (maxX - minX)) + minX;
                const posY = Math.floor(Math.random() * (maxY - minY)) + minY;
                circleObj = {
                    positionX: posX,
                    positionY: posY,
                    velocityX: this.velocityX,
                    velocityY: this.velocityY,
                    radius: this.radius,
                    mass: this.mass
                };
                this.circles.push(circleObj);
            }
        }
        // bounce of the walls
        for (const c of this.circles) {
            if (c.positionX + this.radius > state.width) {
                c.velocityX *= -1;
                c.positionX = state.width - this.radius;
            }
            if (c.positionX - this.radius < 0) {
                c.velocityX *= -1;
                c.positionX = this.radius;
            }
            if (c.positionY + this.radius > state.height) {
                c.velocityY *= -1;
                c.positionY = state.height - this.radius;
            }
            if (c.positionY - this.radius < 0) {
                c.velocityY *= -1;
                c.positionY = this.radius;
            }
            c.positionX += c.velocityX;
            c.positionY += c.velocityY;
        }
        // collision rendering
        for (let j = 0; j < this.circles.length; j++) {
            for (let i = j + 1; i < this.circles.length; i++) {
                const p1 = this.circles[j];
                const p2 = this.circles[i];
                const dx = p1.positionX - p2.positionX;
                const dy = p1.positionY - p2.positionY;
                const distance = Math.hypot(dx, dy);
                if (distance < p1.radius + p2.radius) {
                    resolveCollisions(p1, p2);
                }
            }
        }
        for (const c of this.circles) {
            // drawing
            ctx.beginPath();
            ctx.arc(c.positionX, c.positionY, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }
    }
}
//# sourceMappingURL=circles.js.map