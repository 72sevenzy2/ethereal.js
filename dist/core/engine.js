export class Engine {
    canvas;
    ctx;
    effects = [];
    state;
    constructor(canvas) {
        console.log("loaded engine");
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.state = {
            mouseX: 0,
            mouseY: 0,
            width: canvas.width = window.innerWidth,
            height: canvas.height = window.innerHeight,
            time: 0
        };
        window.addEventListener("mousemove", (e) => {
            this.state.mouseX = e.clientX;
            this.state.mouseY = e.clientY;
        });
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.state.width = window.innerWidth;
            this.state.height = window.innerHeight;
        });
        requestAnimationFrame(this.loop.bind(this));
    }
    addEffect(effect) {
        this.effects.push(effect);
    }
    loop(timestamp) {
        this.state.time = timestamp / 1000;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const effect of this.effects) {
            effect.update(this.ctx, this.state);
        }
        requestAnimationFrame(this.loop.bind(this));
    }
}
//# sourceMappingURL=engine.js.map