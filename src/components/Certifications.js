import { gsap } from 'gsap';

export class Certifications {
    constructor(data) {
        this.data = data.certifications;
        this.container = document.querySelector('.cert-grid');
        this.init();
    }

    init() {
        if (!this.container) return;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        // Styles handled by src/styles/components.css .cert-grid

        this.data.forEach(cert => {
            const el = document.createElement('div');
            el.className = 'cert-card';

            // Handle both string (legacy) and object formats safely
            const title = cert.title || cert;
            const issuer = cert.issuer || '';
            const year = cert.year || '';

            el.innerHTML = `
                <div class="cert-header">
                    <div class="cert-icon">✦</div>
                    <div>
                        <div class="cert-title">${title}</div>
                        ${issuer ? `<div class="cert-issuer">${issuer} • ${year}</div>` : ''}
                    </div>
                </div>
            `;
            this.container.appendChild(el);

            // Hover Effect
            el.addEventListener('mouseenter', () => {
                gsap.to(el, { y: -5, borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.05)', duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { y: 0, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', duration: 0.3 });
            });
        });
    }
}
