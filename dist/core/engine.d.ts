export interface EngineState {
    mouseX: number;
    mouseY: number;
    width: number;
    height: number;
    time: number;
}
export type Effect = {
    update: (ctx: CanvasRenderingContext2D, state: EngineState) => void;
};
export declare class Engine {
    private canvas;
    private ctx;
    private effects;
    private state;
    constructor(canvas: HTMLCanvasElement);
    addEffect(effect: Effect): void;
    private loop;
}
//# sourceMappingURL=engine.d.ts.map