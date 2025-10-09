import { type EngineState, type Effect } from "../core/engine";

/**
 * Creates a sine wave effect.
 * 
 * @param options - Configs for the wave
 * 
 * @param options.waveLength - The frequency of the sine wave cannot exeed above 0.1.
 * 
 * @param options.intensity - This controls the sine waves length.
 * 
 * @param options.curvature - This controls the spacing between points of the sine wave.
 * 
 * @returns Effect - An object with an 'update' method for the engine.
 */

export function wave({ intensity = 1, curvature = 20, waveLength = 0.03, color = "gray" }: {
    intensity?: number, curvature?: number, waveLength?: number, color?: string
} = {}): Effect {

    // Clamp the waveLength to a max of 0.1 and min of 0.01
    const lengthValue: number = Math.min(Math.max(waveLength, 0.01), 0.1);

    return {
        update(ctx, state: EngineState) {
            ctx.beginPath();
            const amplitude = 20 * intensity;

            for (let x = 0; x < state.width; x += curvature) {
                const y = state.height / 2 + Math.sin((x + state.time * 100) * lengthValue) * amplitude;
                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = color;
            ctx.stroke();
        }
    };
}
