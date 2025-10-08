import { type EngineState, type Effect } from "../core/engine";

/**
 *  @param options - Configuration for the cursor element.
 * 
 * @param options.strength - The strength of the cursor (smoothness).
 * 
 * @param options.color - The color of the element laying below ur mouse. (any color of your choice).
 * 
 * @returns Effects - A object with an 'update' method for the engine.
 */

export function cursorMagnet({ strength = 0.5, color }: { strength: number, color: string }): Effect {
    return {
        update(ctx, state: EngineState) {
            ctx.beginPath();
            ctx.arc(state.mouseX, state.mouseY, 30 * strength, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    }
}