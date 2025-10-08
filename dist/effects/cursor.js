export function cursorMagnet({ strength = 0.5 }) {
    return {
        update(ctx, state) {
            ctx.beginPath();
            ctx.arc(state.mouseX, state.mouseY, 30 * strength, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();
            ctx.closePath();
        }
    };
}
//# sourceMappingURL=cursor.js.map