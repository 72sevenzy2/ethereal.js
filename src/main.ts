import { Engine } from "./core/engine";

export function ethereal({ element, effects }: { element: string, effects: any[] }) {
    const canvas = document.querySelector<HTMLCanvasElement>(element);
    if (!canvas) throw new Error(`Canvas not found: ${element}`);
    const engine = new Engine(canvas);
    effects.forEach((event) => { engine.addEffect(event) });
}