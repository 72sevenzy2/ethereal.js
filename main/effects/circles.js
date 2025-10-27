export class circle {
    constructor({ amount = 10, radius = 40, positionX = 70, positionY = 72, velocityX = 10, velocityY = 10 }) {
        this.circles = [];
        this.radius = radius;
        this.positionX = positionX;
        this.velocityX = velocityX;
        this.amount = amount;
        this.velocityY = velocityY;
        this.positionY = positionY;
        let circleObj;
        for (let i = 0; i < this.amount; i++) {
            circleObj = {
                positionX: this.positionX + Math.random() * 100,
                positionY: this.positionY + Math.random() * 100,
                velocityX: this.velocityX,
                velocityY: this.velocityY
            };
            this.circles.push(circleObj);
        }
    }
    update(ctx, state) {
        for (const c of this.circles) {
            if (c.positionX + this.radius > state.width || c.positionX - this.radius < 0) {
                c.velocityX *= -1;
            }
            if (c.positionY + this.radius > state.height || c.positionY - this.radius < 0) {
                c.velocityY *= -1;
            }
            c.positionX += c.velocityX;
            c.positionY += c.velocityY;
            ctx.beginPath();
            ctx.arc(c.positionX, c.positionY, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }
    }
}
//# sourceMappingURL=circles.js.map