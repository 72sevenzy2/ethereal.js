import { type Effect, type EngineState } from "../core/engine";

/**
 * @param options - Configuration for the hideCursor effect.
 * 
 * @param options.strength - The strength of the cursor. (smoothness)
 * 
 * @param options.element - Selector for the element you want your mouse to overlay from.
 * 
 * @param options.color - The color of the mouse. (any color of your choice)
 * 
 * @returns Effect - An object that contains the 'update' method for the engine
 */

export function hideCursor({ strength = 0.5, element, color }: {
    element: string, strength?: number,
    color: string
}): Effect {
    let inititialized: boolean = false;
    return {
        update(ctx, state: EngineState) {
            if (!inititialized) {
                const elem = document.querySelector(element);
                if (elem) {
                    (elem as HTMLElement).style.cursor = "none";
                }
                else document.body.style.cursor = "none";
                inititialized = true;
            }

            ctx.beginPath();
            ctx.arc(state.mouseX, state.mouseY, 30 * strength || 0.5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    }
}