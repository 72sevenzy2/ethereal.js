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
            ctx.arc(state.mouseX, state.mouseY, 30 * strength || 0.5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    };
}
//# sourceMappingURL=hideCursor.js.map