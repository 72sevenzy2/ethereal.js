/**
 * @param options - Configuration for the hideCursor effect.
 *
 * @param options.strength - The strength of the cursor. (size)
 *
 * @param options.element - Selector for the element you want your mouse to overlay from.
 *
 * @param options.color - The color of the mouse. (any color of your choice)
 *
 * @returns Effect - An object that contains the 'update' method for the engine
 */
export function hideCursor({ strength = 0.5, element, color }) {
    let inititialized = false;
    return {
        update(ctx, state) {
            if (!inititialized) {
                const elem = document.querySelector(element);
                if (elem) {
                    elem.style.cursor = "none";
                }
                else
                    document.body.style.cursor = "none";
                inititialized = true;
            }
            ctx.beginPath();
            ctx.arc(state.mouseX, state.mouseY, 20 * strength || 0.5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    };
}
//# sourceMappingURL=hideCursor.js.map