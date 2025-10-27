import { Engine } from "./core/engine";
export function ethereal({ element, effects }) {
    const canvas = document.querySelector(element);
    if (!canvas)
        throw new Error(`Canvas not found: ${element}`);
    const engine = new Engine(canvas);
    effects.forEach((event) => { engine.addEffect(event); });
}
//# sourceMappingURL=main.js.map