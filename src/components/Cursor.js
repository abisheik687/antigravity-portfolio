import { gsap } from 'gsap';

export class Cursor {
    constructor() {
        this.dom = {};
        this.init();
    }

    init() {
        this.render();
        this.initEvents();
    }

    render() {
        // Main Cursor Circle
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        this.dom.cursor = cursor;

        // Inner Dot (Optional, better precision)
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
        this.dom.dot = dot;
    }

    initEvents() {
        // Move Setup
        gsap.set(this.dom.cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(this.dom.dot, { xPercent: -50, yPercent: -50 });

        window.addEventListener('mousemove', (e) => {
            // Smooth follower
            gsap.to(this.dom.cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power3.out'
            });
            // Instant dot
            gsap.to(this.dom.dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });

        // Hover Interactions using Delegation
        // We listen to body and check targets to catch dynamic elements like project cards
        document.body.addEventListener('mouseover', (e) => {
            const target = e.target;

            // Define interactive targets
            const isClickable = target.matches('a, button, .nav-btn, .filter-btn, .dock-item, .dock-item span');
            const isProject = target.closest('.project-card');
            const isSkill = target.closest('.skill-tag');
            const isInput = target.matches('input, textarea');

            // Reset State Logic
            let scale = 1;
            let opacity = 0.5;
            let mixBlend = 'normal';
            let borderColor = 'rgba(42, 0, 255, 0.5)'; // Default Accent

            if (isProject) {
                scale = 1; // No cursor zoom, let the card zoom be the focus
                opacity = 0.8;
                borderColor = '#fff';
            } else if (isClickable || isSkill) {
                scale = 2; // Small Zoom
                opacity = 0.3;
            } else if (isInput) {
                scale = 0.5; // Precision focus
            }

            // Apply Animation
            gsap.to(this.dom.cursor, {
                scale: scale,
                opacity: opacity,
                borderColor: borderColor,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Reset on mouse out of window
        document.body.addEventListener('mouseleave', () => {
            gsap.to(this.dom.cursor, { opacity: 0 });
            gsap.to(this.dom.dot, { opacity: 0 });
        });
        document.body.addEventListener('mouseenter', () => {
            gsap.to(this.dom.cursor, { opacity: 0.5 });
            gsap.to(this.dom.dot, { opacity: 1 });
        });
    }
}
