import { type EngineState, type Effect } from "../core/engine";

/**
 * @params options - Configuration for the gridHover effect.
 * 
 * @param options.spacing - The radius in which the cursor will cover in each individual square of the grid.
 * 
 * @param options.fadeSpeed - This is how fast the squares which have been hovered will fade.
 * 
 * @param options.alpha - The opacity of the effect.
 * 
 * @param options.growSpeed - How fast each square will grow on hover.
 * 
 * @param options.growAmount - The size in which the square will grow on hover.
 * 
 * @returns Effect - An object which contains an 'update' method for the engine.
 */

export function gridHover({ spacing = 20, fadeSpeed = 0.05, alpha = 0.8, growSpeed = 1.5, growAmount = 1.3 }:
    { spacing?: number, fadeSpeed?: number, alpha?: number, growSpeed?: number, growAmount?: number } = {}
): Effect {
    const highlights = new Map<string, { alpha: number; scale: number }>();
    return {
        update(ctx, state: EngineState) {
            ctx.save();
            ctx.strokeStyle = "rgba(200, 200, 200, 0.2)";
            ctx.lineWidth = 1;
            for (let j = 0; j < state.width; j += spacing) {
                ctx.beginPath();
                ctx.moveTo(j, 0);
                ctx.lineTo(j, state.height);
                ctx.stroke();
            }
            for (let y = 0; y < state.height; y += spacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(state.width, y);
                ctx.stroke();
            }

            // finding which grid the client is in

            const cellx = Math.floor(state.mouseX / spacing);
            const celly = Math.floor(state.mouseY / spacing);
            const key = `${cellx}, ${celly}`;

            // set or refresh the cells alpha
            if (!highlights.has(key)) {
                highlights.set(key, { alpha, scale: 1 });
            }
            else {
                const h = highlights.get(key)!;
                h!.alpha = alpha;
                h.scale = Math.min(h.scale + growSpeed, growAmount);
            }

            //draw each alpha

            for (const [key, h] of highlights) {
                const [cx, cy] = key.split(",").map(Number);
                const x = cx * spacing;
                const y = cy * spacing;

                // fade the alpha out

                h.alpha = Math.max(0, h.alpha - fadeSpeed);
                if (h.alpha <= 0) {
                    highlights.delete(key);
                    continue;
                }

                if (h.scale > 1) { h.scale -= growSpeed / 2; }
                const size = spacing * h.scale;
                const offset = (size - spacing) / 2;

                ctx.fillStyle = `rgba(255, 255, 255, ${h.alpha})`;
                ctx.fillRect(x - offset, y - offset, size, size);
            }
            ctx.restore();
        }
    }
}