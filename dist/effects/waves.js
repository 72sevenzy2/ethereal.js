import { } from "../core/engine.js";
console.log("waves loaded");
export function wave({ intensity = 1 } = {}) {
    return {
        update(ctx, state) {
            ctx.beginPath();
            const amplitude = 20 * intensity;
            for (let x = 0; x < state.width; x += 10) {
                const y = state.height / 2 + Math.sin((x + state.time * 100) * 0.05) * amplitude;
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = "gray";
            ctx.stroke();
        }
    };
}
//# sourceMappingURL=waves.js.map