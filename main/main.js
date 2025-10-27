import { Engine } from "./core/engine.js";
/**
 * @param - Hello user, just wanted to make sure aware of the following:
 *
 * @param The (circles) effect and the (particle) effect will overlap eacheother, so please make sure to choose ONE.
 */
export function ethereal({ element, effects }) {
    const canvas = document.querySelector(element);
    if (!canvas)
        throw new Error(`Canvas not found: ${element}`);
    const engine = new Engine(canvas);
    effects.forEach((event) => { engine.addEffect(event); });
}
//# sourceMappingURL=main.js.map