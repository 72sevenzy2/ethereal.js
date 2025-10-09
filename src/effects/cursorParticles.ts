import { type EngineState, type Effect } from "../core/engine";

/**
 * @param options - Configuration for the cursorParticles effect.
 * 
 * @param options.amount - The amount of particles going around the mouse.
 * 
 * @param options.minRadius - Minimum radius from the paricles to the cursor.
 * 
 * @param options.maxRadius - Maximum radius from the particles to the cursor.
 * 
 * @param options.speed - The speed of the particles going around the cursor.
 * 
 * @param options.color - The color of the particles.
 * 
 * @param options.trailLength - The length of the trail (of each particle).
 * 
 * @param options.counterClockwise - Whether the particles should move clockwise or counterclockwise.
 * 
 * @returns Effect - An object which contains the 'update' method for the engine.
 */

export function cursorParticles({ amount = 10, minRadius = 20, maxRadius = 40, speed = 30,
    color = "white", trailLength = 10, counterClockwise = false }: {
        amount: number, minRadius: number, maxRadius: number,
        speed: number, color: string, trailLength: number, counterClockwise: boolean
    }): Effect {
    const particles = Array.from({ length: amount }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * (maxRadius - minRadius) + minRadius,
        size: Math.random() * 3 + 1,
        positions: [] as { x: number, y: number }[]
    }));
    return {
        update(ctx, state: EngineState) {
            ctx.save();
            ctx.fillStyle = color;
            for (const particle of particles) {
                particle.angle += 0.02 * speed;

                const x = state.mouseX + Math.cos(particle.angle) * particle.radius;
                const y = state.mouseY + Math.sin(particle.angle) * particle.radius;

                particle.positions.push({ x, y });
                if (particle.positions.length > trailLength) { particle.positions.shift(); }

                for (let j = 0; j < particle.positions.length; j++) {
                    const pos = particle.positions[j];
                    const alpha = (j + 0.01) / particle.positions.length;
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, particle.size, 0, Math.PI * 2, counterClockwise);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.fill();
                    ctx.closePath();
                }
            }

            ctx.restore();
        }
    }
}