import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class ScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // 1. Initialize Lenis
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // 2. Connect Lenis to GSAP ScrollTrigger
        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // 3. Setup Global Animations
        this.setupAnimations();
    }

    setupAnimations() {
        // A. Skew Effect on Scroll (Decoupled via data-skew)
        // Select all elements that opted-in to the skew effect
        const skewElements = document.querySelectorAll('[data-skew="true"]');

        if (skewElements.length > 0) {
            let proxy = { skew: 0 },
                skewSetter = gsap.quickSetter(skewElements, "skewY", "deg"), // Apply to all
                clamp = gsap.utils.clamp(-20, 20);

            ScrollTrigger.create({
                onUpdate: (self) => {
                    let skew = clamp(self.getVelocity() / -300);
                    if (Math.abs(skew) > Math.abs(proxy.skew)) {
                        proxy.skew = skew;
                        gsap.to(proxy, {
                            skew: 0,
                            duration: 0.8,
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => skewSetter(proxy.skew)
                        });
                    }
                }
            });
        }

        // B. Hero Parallax (Decoupled logic)
        // Checks for the component boundary, separate from styling classes
        const heroSection = document.querySelector('[data-component="hero"]');
        const heroCards = document.querySelectorAll('[data-ui="hero-card"]');

        if (heroSection && heroCards.length) {
            gsap.to(heroCards, {
                y: (i) => -100 * (i + 1),
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    }
}
