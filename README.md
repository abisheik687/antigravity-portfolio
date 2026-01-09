# Antigravity Portfolio System

## Mission Status: Ready for Deployment
This project is a high-performance, physics-driven portfolio engine designed to emulate the "feel" of premium award-winning sites without the bloat of heavy frameworks.

## Quick Start

1.  **Install Dependencies** (Crucial for Vite/Three.js):
    ```bash
    npm install
    ```

2.  **Ignite Engine** (Dev Server):
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Architecture Overview

*   **`src/core/Math.js`**: The physics brain. Contains `lerp` (Linear Interpolation) and `Inertia` classes.
*   **`src/core/ScrollManager.js`**: A custom virtual scroll engine with **Advanced 3D Transforms**. It rotates and scales elements based on viewport position.
*   **`src/core/PhysicsWorld.js`**: A Verlet-integration physics engine that handles gravity, collision, and drag-and-drop for the footer elements.
*   **`src/styles`**: Pure CSS variables and glassmorphism components.

## The "Secret Sauce" (Animation Philosophy)

We strictly avoided "canned" animations. Instead of `duration: 0.5s`, we use **Physics Loops**:
*   **Input**: User scrolls or drags.
*   **Math**: We calculate velocity and applying it to `transform: rotate3d()`.
*   **Response**: Elements tilt, bounce, and collide naturally.

## Features Implemented
*   **Hero 3D Cluster**: Deep layered image stack with parallax.
*   **Scroll-Linked Physics**: Cards rotate and scale as they move (`rotateX`).
*   **Interactive Playground**: Bouncing, draggable UI elements.

## Future Upgrades (The Roadmap)

1.  **WebGL Integration**: The `<canvas id="webgl">` is ready for future shader work.
2.  **Page Transitions**: Use the `Inertia` class to handle opacity for a seamless "single page app" feel.

