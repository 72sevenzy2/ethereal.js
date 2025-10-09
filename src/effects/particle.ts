import { type EngineState, type Effect } from "../core/engine";

/**
 * @param options - Configuration for the Particles effect.
 * 
 * @param options.amount - The amount of particles that will be generated.
 * 
 * @param options.radius - The size of the particles.
 * 
 * @param options.speed - The speed of the particles.
 * 
 * @returns Effect - An object with an 'update' method for the engine.
 */

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    life: number;
    maxLife: number;
}

export class Particles implements Effect {
    private amount: number;
    private radius: number;
    private speed: number;
    private clicked: boolean = false;
    private particles: Particle[] = [];
    constructor({ amount = 100, radius = 10, speed = 10 }: {
        amount?: number, x?: number, y?: number, radius?: number, speed?: number
    } = {}) {
        this.amount = amount;
        this.radius = radius;
        this.speed = speed;

        window.addEventListener("mousedown", () => {
            this.clicked = true;
        });
        window.addEventListener("mouseup", () => {
            this.clicked = false;
        })
    }

    // called every frame

    update(ctx: CanvasRenderingContext2D, state: EngineState) {
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