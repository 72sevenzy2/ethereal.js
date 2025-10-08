import { type EngineState, type Effect } from "../core/engine";

export function gridGlow({ color = "gray", spacing = 10 } = {}): Effect {
    return {
        update(ctx, state: EngineState) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            for (let x = 0; x < state.width; x += spacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, state.height);
                ctx.stroke();
                ctx.closePath();
            }
            for (let y = 0; y < state.height; y += spacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(state.width, y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}