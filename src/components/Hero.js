import { gsap } from 'gsap';

export class Hero {
    constructor(data) {
        this.data = data.profile;
        this.dom = {
            title: document.querySelector('[data-ui="hero-title"]'),
            role: document.querySelector('[data-ui="hero-role"]'),
            cards: document.querySelectorAll('[data-ui="hero-card"]')
        };

        this.init();
    }

    init() {
        this.bindData();
        this.animateIn();
        this.initParallax();
    }

    bindData() {
        // Inject Name and Role
        if (this.dom.title) {
            this.dom.title.textContent = this.data.name.toUpperCase();
            this.dom.title.dataset.text = this.data.name.toUpperCase(); // For glitch effect
        }

        if (this.dom.role) {
            // Use the tagline from JSON, falling back to a default if needed
            this.dom.role.innerHTML = `${this.data.role} <br> <span style="font-size: 0.8em; opacity: 0.7">${this.data.tagline}</span>`;
        }
    }

    animateIn() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. Title Reveal (Glitch-style stagger)
        if (this.dom.title) {
            tl.fromTo(this.dom.title,
                { opacity: 0, y: 50, skewX: 20 },
                { opacity: 1, y: 0, skewX: 0, duration: 1.2 }
            );
        }

        // 2. Role Reveal
        if (this.dom.role) {
            tl.fromTo(this.dom.role,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1 },
                '-=0.8'
            );
        }

        // 3. Floating Cards Reveal
        if (this.dom.cards.length) {
            tl.fromTo(this.dom.cards,
                { opacity: 0, z: -500, rotationY: 90 },
                {
                    opacity: (i) => i === 3 ? 0.5 : 1, // Keep the last one ghosted
                    z: 0,
                    rotationY: (i) => {
                        // Mathematical distribution instead of magic number array
                        // Spread from -15 to +10 degrees
                        const range = 25;
                        const start = -15;
                        return start + (Math.random() * range);
                    },
                    stagger: 0.1,
                    duration: 1.5,
                    ease: 'elastic.out(1, 0.7)'
                },
                '-=1'
            );
        }
    }

    initParallax() {
        // Performance Upgrade: Use quickSetter for 60fps+ tracking
        if (!this.dom.cards.length) return;

        const xSetters = [];
        const ySetters = [];
        const rXSetters = [];
        const rYSetters = [];

        this.dom.cards.forEach((card) => {
            xSetters.push(gsap.quickSetter(card, "x", "px"));
            ySetters.push(gsap.quickSetter(card, "y", "px"));
            rXSetters.push(gsap.quickSetter(card, "rotationX", "deg"));
            rYSetters.push(gsap.quickSetter(card, "rotationY", "deg"));
        });

        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

            this.dom.cards.forEach((card, i) => {
                const depth = (i + 1) * 15; // Increased depth factor for more dramatic effect
                // Apply optimized transforms
                xSetters[i](x * depth);
                ySetters[i](y * depth);
                rXSetters[i](-y * 8);
                rYSetters[i](x * 8);
            });
        });
    }
}
