import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class About {
    constructor(data) {
        this.data = data.profile;
        this.dom = {
            container: document.querySelector('#about'),
            // We will create the inner DOM dynamically
        };
        this.init();
    }

    init() {
        if (!this.dom.container) return;
        this.renderV2();
        this.animateIn();
    }

    renderV2() {
        // Clear previous content
        this.dom.container.innerHTML = '';

        // Create the HUD Wrapper
        const hud = document.createElement('div');
        hud.className = 'identity-hud';

        // 1. Header / ID Block
        const header = document.createElement('div');
        header.className = 'hud-header';
        header.innerHTML = `
            <div class="hud-marker">ID_CORE_V1.0</div>
            <h2 class="hud-title">ARCHITECT_BIO</h2>
            <div class="hud-line"></div>
        `;

        // 2. Main Content Grid
        const content = document.createElement('div');
        content.className = 'hud-content';

        // Left Col (Stats)
        const stats = document.createElement('div');
        stats.className = 'hud-stats';
        stats.innerHTML = `
            <div class="profile-frame">
                <img src="/images/profile.jpg" alt="Profile" class="profile-img" />
            </div>
            <div class="stat-item">
                <span class="label">LOC</span>
                <span class="value">${this.data.location}</span>
            </div>
            <div class="stat-item">
                <span class="label">ROLE</span>
                <span class="value">${this.data.role}</span>
            </div>
            <div class="stat-item">
                <span class="label">EXP</span>
                <span class="value">Freshman+</span>
            </div>
        `;

        // Right Col (Narrative)
        const narrative = document.createElement('div');
        narrative.className = 'hud-narrative';

        // We split the summary into a "Lead" and "Body"
        // Let's assume the first sentence is the lead for impact
        const sentences = this.data.summary.split('. ');
        const leadText = sentences[0] + '.';
        const bodyText = sentences.slice(1).join('. ');

        narrative.innerHTML = `
            <p class="narrative-lead" data-scramble="true">${leadText}</p>
            <div class="narrative-body">${this.parseMarkdown(bodyText)}</div>
        `;

        content.appendChild(stats);
        content.appendChild(narrative);

        // Append everything
        hud.appendChild(header);
        hud.appendChild(content);

        // Decorative corners
        hud.innerHTML += `
            <div class="hud-corner top-left"></div>
            <div class="hud-corner top-right"></div>
            <div class="hud-corner bottom-left"></div>
            <div class="hud-corner bottom-right"></div>
        `;

        this.dom.container.appendChild(hud);
    }

    parseMarkdown(text) {
        // Highlighting logic
        return text.replace(/\*\*(.*?)\*\*/g, '<span class="hud-highlight">$1</span>');
    }

    animateIn() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.dom.container,
                start: 'top 75%',
                end: 'bottom 75%',
                toggleActions: 'play reverse play reverse'
            }
        });

        // 1. HUD Reveal (Scale & Opacity)
        tl.from('.identity-hud', {
            scaleX: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.inOut'
        });

        // 2. Stats Slide In
        tl.from('.stat-item', {
            x: -50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.4');

        // 3. Scramble the Lead Text
        tl.add(() => {
            this.scrambleText(document.querySelector('.narrative-lead'));
        }, '-=0.2');

        // 4. Reveal Body
        tl.from('.narrative-body', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5');

        // 5. Highlights Glow
        tl.from('.hud-highlight', {
            color: '#888',
            textShadow: 'none',
            duration: 1,
            stagger: 0.1
        }, '-=0.5');
    }

    scrambleText(element) {
        if (!element) return;
        const originalText = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        const duration = 1.5; // seconds
        const frames = 60 * duration;
        let frame = 0;

        const interval = setInterval(() => {
            let output = '';
            const progress = frame / frames;

            for (let i = 0; i < originalText.length; i++) {
                if (i < originalText.length * progress) {
                    output += originalText[i];
                } else {
                    output += chars[Math.floor(Math.random() * chars.length)];
                }
            }

            element.textContent = output;
            frame++;

            if (frame > frames) {
                clearInterval(interval);
                element.textContent = originalText; // Ensure final state
            }
        }, 1000 / 60);
    }
}
