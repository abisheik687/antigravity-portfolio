export class Contact {
    constructor(data) {
        this.data = data.profile;
        this.init();
    }

    init() {
        const section = document.querySelector('.contact-section'); // Make sure main.html has this or we append it
        // If the HTML structure doesn't exist, we should probably append it to the main container.

        // Let's check if the section exists, if not, wait or create it.
        // For this vanilla app, we might need to find a place to inject it.
        // Assuming main.html has a placeholder, or we append to smooth-content.

        const contentContainer = document.getElementById('smooth-content');
        if (!contentContainer) return;

        // Create footer element if not exists or replace content
        let footerEl = document.querySelector('.contact-section');
        if (!footerEl) {
            footerEl = document.createElement('footer');
            footerEl.className = 'contact-section';
            contentContainer.appendChild(footerEl);
        }

        const socialLinks = Object.entries(this.data.social).map(([platform, url]) =>
            `<a href="${url}" target="_blank" class="contact-link">${platform}</a>`
        ).join('');

        footerEl.innerHTML = `
            <div class="contact-header">
                <h2>Let's Build the Future.</h2>
                <a href="mailto:${this.data.email}" class="contact-link" style="background:var(--accent-color); border:none; margin-top:1rem; display:inline-block;">
                    ${this.data.email}
                </a>
            </div>
            
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:2rem;">
                <div class="contact-links">
                    ${socialLinks}
                </div>
                <div style="font-family:var(--font-mono); color:var(--text-secondary); font-size:0.8rem;">
                    &copy; ${new Date().getFullYear()} ${this.data.name} <span style="margin:0 10px;">|</span> Engineered by Abisheik.

                </div>
            </div>
        `;
    }
}
