import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class Projects {
    constructor(data) {
        this.data = data.projects;
        // Strict Mode: Only strictly target the Full Projects container
        // If this element doesn't exist (e.g. on Home), we simply do nothing.
        this.dom = {
            fullContainer: document.querySelector('[data-component="projects-full"]')
        };

        this.init();
    }

    init() {
        // If we are not on the projects page (no container), stop.
        if (!this.dom.fullContainer) return;

        if (!this.data || !Array.isArray(this.data) || this.data.length === 0) {
            console.warn('Projects Module: No project data available.');
            this.dom.fullContainer.innerHTML = '<div style="text-align:center; padding:5rem; color:#888;">Updating Project Archive...</div>';
            return;
        }

        this.renderFull();
        this.animateIn();
    }

    renderFull() {
        // 1. Render Filter Bar
        this.renderFilterBar();

        // 2. Render Grid
        const grid = document.createElement('div');
        grid.className = 'project-gallery full-grid';
        grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(350px, 1fr))";
        this.dom.fullContainer.appendChild(grid);

        this.dom.grid = grid;
        this.renderCards(this.data); // Initial render all
    }

    renderFilterBar() {
        // Extract unique categories dynamically or use preset
        const categories = ['All', 'Generative AI', 'AI Systems', 'Machine Learning', 'Full-Stack'];

        const navbar = document.createElement('div');
        navbar.className = 'project-filter-nav';

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${cat === 'All' ? 'active' : ''}`;
            btn.textContent = cat;
            btn.addEventListener('click', () => this.filterProjects(cat, btn));
            navbar.appendChild(btn);
        });

        this.dom.fullContainer.appendChild(navbar);
    }

    filterProjects(category, activeBtn) {
        // Update Active State
        this.dom.fullContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');

        // Filter Data
        const filtered = category === 'All'
            ? this.data
            : this.data.filter(p => p.category && p.category.includes(category));

        // Re-render Cards
        this.dom.grid.innerHTML = '';
        this.renderCards(filtered);

        // Re-trigger animation
        gsap.from(this.dom.grid.children, {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            clearProps: 'all' // Ensure we don't trap opacity
        });
    }

    renderCards(items) {
        if (items.length === 0) {
            this.dom.grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: #666;">No projects found in this category.</div>';
            return;
        }

        items.forEach((p, i) => {
            const card = this.createCard(p, i);
            this.dom.grid.appendChild(card);
        });
    }

    createCard(project, index) {
        const article = document.createElement('article');
        article.className = 'project-card';

        // Detailed Tech Stack
        const techStack = project.tech ? project.tech.join(' · ') : '';

        // Features List
        let featuresHTML = '';
        if (project.key_features) {
            featuresHTML = `<ul class="card-features">${project.key_features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}</ul>`;
        }

        article.innerHTML = `
            <div class="card-visual">
                <img src="${project.image}" alt="${project.title}" loading="lazy" style="width:100%; height:100%; object-fit:cover; opacity:0.8; transition:opacity 0.5s;">
                <div class="card-overlay"></div>
            </div>
            <div class="card-info">
                <div class="card-header-row">
                    <h3>${project.title}</h3>
                    <span class="card-cat">${project.category || 'Project'}</span>
                </div>
                <div class="card-details">
                    <p class="card-desc">${project.description}</p>
                    ${featuresHTML}
                    <div class="card-tech-full">${techStack}</div>
                </div>
            </div>
        `;

        return article;
    }

    animateIn() {
        if (!this.dom.grid) return;

        ScrollTrigger.batch(this.dom.grid.children, {
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            }),
            start: 'top 85%'
        });

        // Set initial state
        gsap.set(this.dom.grid.children, { opacity: 0, y: 50 });
    }
}
