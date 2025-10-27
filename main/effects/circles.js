export class circle {
    constructor({ amount = 10, radius = 40, positionX = 70, positionY = 72, velocityX = 10, velocityY = 10 } = {}) {
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
        }
        // collision detection
        for (let i = 0; i < this.circles.length; i++) {
            for (let j = i + 1; j < this.circles.length; j++) {
                const c1 = this.circles[i];
                const c2 = this.circles[j];
                const dx = c2.positionX - c1.positionX;
                const dy = c2.positionY - c1.positionY;
                const distance = Math.hypot(dx, dy);
                if (distance < this.radius * 2) {
                    // bounce
                    c1.velocityX *= -1;
                    c1.velocityY *= -1;
                    c2.velocityX *= -1;
                    c2.velocityY *= -1;
                    const overlap = (this.radius * 2 - distance) / 2;
                    const angle = Math.atan2(dy, dx);
                    c1.positionX -= Math.cos(angle) * overlap;
                    c1.positionY -= Math.sin(angle) * overlap;
                    c2.positionX -= Math.cos(angle) * overlap;
                    c2.positionY -= Math.cos(angle) * overlap;
                }
            }
        }
        for (const c of this.circles) {
            ctx.beginPath();
            ctx.arc(c.positionX, c.positionY, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }
    }
}
//# sourceMappingURL=circles.js.map