import { gsap } from 'gsap';

export class Skills {
    constructor(data) {
        this.data = data.skills;
        this.container = document.querySelector('.skill-list');
        this.init();
    }

    init() {
        if (!this.container) return;
        this.render();
        this.animateIn();
        this.initInteractions();
    }

    render() {
        this.container.innerHTML = '';
        this.container.classList.add('skill-clusters-container');

        // Dynamically iterate over the JSON keys
        Object.keys(this.data).forEach((categoryName, index) => {
            const skillsList = this.data[categoryName];
            if (!skillsList || skillsList.length === 0) return;

            // Create Cluster
            const cluster = document.createElement('div');
            cluster.className = `skill-cluster cluster-${index}`;
            // Add a slight delay index for staggered scroll trigger if needed later
            cluster.style.setProperty('--i', index);

            // Label
            const label = document.createElement('h4');
            label.className = 'cluster-label';
            label.textContent = categoryName; // Use the key directly (e.g., "AI & Machine Learning")
            cluster.appendChild(label);

            // Grid Container
            const grid = document.createElement('div');
            grid.className = 'cluster-grid';

            skillsList.forEach(skillName => {
                const tag = document.createElement('div');
                tag.className = 'skill-tag';
                tag.textContent = skillName;
                grid.appendChild(tag);
            });

            cluster.appendChild(grid);
            this.container.appendChild(cluster);
        });
    }

    animateIn() {
        // Disabled JS entrance animations to ensure visibility stability.
        // CSS handles the layout and interactions.
    }

    initInteractions() {
        // Magnetic Hover Effect
        const tags = document.querySelectorAll('.skill-tag');

        tags.forEach(tag => {
            tag.addEventListener('mousemove', (e) => {
                const rect = tag.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(tag, {
                    x: x * 0.5,
                    y: y * 0.5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }
}
