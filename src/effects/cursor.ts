import { type EngineState, type Effect } from "../core/engine";

export function cursorMagnet({ strength = 0.5 }: { strength: number }): Effect {
    return {
        update(ctx, state: EngineState) {
            ctx.beginPath();
            ctx.arc(state.mouseX, state.mouseY, 30 * strength, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();
            ctx.closePath();
        }
    }
}