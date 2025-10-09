export class Particles {
    constructor({ amount = 100, radius = 10, speed = 10 } = {}) {
        this.clicked = false;
        this.particles = [];
        this.amount = amount;
        this.radius = radius;
        this.speed = speed;
        window.addEventListener("mousedown", () => {
            this.clicked = true;
        });
        window.addEventListener("mouseup", () => {
            this.clicked = false;
        });
    }
    // called every frame
    update(ctx, state) {
        // spawn new particles near cursor
        if (this.clicked) {
            for (let j = 0; j < this.amount * 0.1; j++) {
                this.particles.push({
                    x: state.mouseX,
                    y: state.mouseY,
                    vx: (Math.random() - 0.5) * this.speed * 2,
                    vy: (Math.random() - 0.5) * this.speed * 2,
                    radius: this.radius + Math.random() * 1.5,
                    life: Math.random() * 40 + 30,
                    maxLife: Math.random() * 40 + 30
                });
            }
            this.clicked = false;
        }
        // clearing every dead particle
        this.particles = this.particles.filter((p) => p.life > 0);
        // drawing
        for (const particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            const alpha = particle.life / particle.maxLife;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
        }
    }
}
//# sourceMappingURL=particle.js.map