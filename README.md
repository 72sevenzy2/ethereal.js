# Ethereal.js

Ethereal.js is a lightweight, modular background engine for creating dynamic and interactive effects.  
It’s designed for simplicity, flexibility, and creativity — perfect for adding ambient to landing pages, and creative projects.

( Please note I will be actively maintaining this framework and constantly adding new effects )
---

## Installation

```bash
npm install ethereal.js


Or using yarn:

yarn add ethereal


Usage
Basic Setup

Create an HTML file and initialize the engine with one or more effects.


<canvas id="canvas"></canvas>

<script type="module">
  import { ethereal } from "ethereal";
  import { wave } from "ethereal/effects/sineWaves.js";
  import { gridGlow } from "ethereal/effects/grids.js";
  import { cursorParticles } from "ethereal/effects/cursorParticles.js";
  import { hideCursor } from "ethereal/effects/hideCursor.js";

  ethereal({
    element: "#canvas",
    effects: [
      wave({ intensity: 1, curvature: 20, waveLength: 0.03 }),
      gridGlow({ color: "gray", spacing: 20 }),
      cursorParticles({ amount: 15, minRadius: 10, maxRadius: 40, speed: 2, color: "white", trailLength: 8 }),
      hideCursor({ element: "#canvas", color: "white" })
    ]
  });
</script>


 API Reference
ethereal({ element, effects })

The main function that initializes the rendering engine.
| Parameter | Type       | Description                                     |
| --------- | ---------- | ----------------------------------------------- |
| `element` | `string`   | CSS selector for your canvas element.           |
| `effects` | `Effect[]` | Array of imported effects to render each frame. |


 These are some built in effects (with examples included):
 wave({ intensity, curvature, waveLength })

Draws a dynamic sine-wave animation across the canvas.
| Option       | Type     | Default | Description                                                            |
| ------------ | -------- | ------- | ---------------------------------------------------------------------- |
| `intensity`  | `number` | `1`     | Height (amplitude) of the wave.                                        |
| `curvature`  | `number` | `20`    | Horizontal distance between wave samples.                              |
| `waveLength` | `number` | `0.03`  | Frequency of the wave — capped automatically between `0.01` and `0.1`. |


 gridGlow({ color, spacing })

Draws a glowing animated grid background.
| Option    | Type     | Default  | Description                       |
| --------- | -------- | -------- | --------------------------------- |
| `color`   | `string` | `"gray"` | Grid color.                       |
| `spacing` | `number` | `20`     | Pixel spacing between grid lines. |


 cursorParticles({ amount, minRadius, maxRadius, speed, trailLength })

Creates orbiting particles that follow the cursor, leaving a glowing trail.
| Option        | Type     | Default   | Description                |
| ------------- | -------- | --------- | -------------------------- |
| `amount`      | `number` | `20`      | Number of particles.       |
| `minRadius`   | `number` | `10`      | Minimum orbit radius.      |
| `maxRadius`   | `number` | `40`      | Maximum orbit radius.      |
| `speed`       | `number` | `1`       | Rotation speed.            |
| `color`       | `string` | `"white"` | Particle color.            |
| `trailLength` | `number` | `10`      | Length of particle trails. |


 hideCursor({ element, color })

Hides the default cursor and optionally replaces it with a minimal custom one.

gridHover({ spacing, fadeSpeed, alpha, growSpeed, growAmount })

Highlights and grows individual grid cells as your cursor hovers over them.
| Option       | Type     | Default | Description                          |
| ------------ | -------- | ------- | ------------------------------------ |
| `spacing`    | `number` | `20`    | Pixel size of each grid cell.        |
| `fadeSpeed`  | `number` | `0.05`  | Speed at which hovered squares fade. |
| `alpha`      | `number` | `0.8`   | Opacity of highlight.                |
| `growSpeed`  | `number` | `0.1`   | Growth speed when hovered.           |
| `growAmount` | `number` | `1.3`   | Maximum growth scale.                |



 Engine Overview

The engine is lightweight — each effect must return an object with an update(ctx, state) method.

Engine State:
interface EngineState {
  mouseX: number;
  mouseY: number;
  width: number;
  height: number;
  time: number;
}
Effects receive this state every frame and render accordingly.


 License - MIT © 2025 — Created with ✨ by Seventy
