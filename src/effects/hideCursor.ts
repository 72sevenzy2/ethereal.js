import { type Effect, type EngineState } from "../core/engine";

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