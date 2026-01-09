import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class Experience {
    constructor(data) {
        this.data = data.experience;
        this.container = document.querySelector('.timeline-container');
        this.init();
    }

    init() {
        if (!this.container) return;
        this.render();
        this.initAnimations();
    }

    render() {
        this.container.innerHTML = '';

        this.data.forEach((role, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            // Add data-ui for robust selection
            item.dataset.ui = "timeline-item";

            item.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <span class="period" style="font-family: var(--font-mono); color: var(--accent-color); font-size: 0.9em; display:block; margin-bottom:0.5rem;">${role.period}</span>
                    <h3 class="role-title" style="margin-bottom:0.5rem;">${role.role} <span class="company" style="opacity:0.7">@ ${role.company}</span></h3>
                    <p class="role-desc" style="margin-bottom:1rem; opacity:0.8; line-height:1.6;">${role.description}</p>
                    <ul class="achievements" style="list-style:disc; padding-left:1.2rem; opacity:0.75; font-size:0.95em;">
                        ${role.achievements.map(a => `<li style="margin-bottom:0.3rem;">${a}</li>`).join('')}
                    </ul>
                </div>
            `;

            this.container.appendChild(item);
        });
    }

    initAnimations() {
        // Senior Implementation: ScrollTrigger Batch for efficient handling of multiples
        const items = document.querySelectorAll('[data-ui="timeline-item"]');

        gsap.set(items, { opacity: 0, x: -30 });

        ScrollTrigger.batch(items, {
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                x: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out",
                overwrite: true
            }),
            start: "top 85%",
            // We can add logic here if we want them to fade out on scroll up, but standard portfolio behavior keeps them visible once entered.
        });
    }
}
