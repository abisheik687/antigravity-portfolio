import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class Navbar {
    constructor() {
        // DEFINITIVE ITEMS LIST WITH PATHS
        this.items = [
            { id: '#hero', label: 'Home', path: '/' },
            { id: 'projects', label: 'Projects', path: '/projects.html' },
            { id: '#about', label: 'About', path: '/' },
            { id: '#skills', label: 'Skills', path: '/' },
            { id: '#experience', label: 'Experience', path: '/' },
            { id: '#connect', label: 'Contact', path: '/' }
        ];
        this.dom = {};
        this.currentPath = window.location.pathname; // e.g. "/portfolio/" or "/portfolio/index.html"
        this.init();
    }

    init() {
        this.render();
        this.setupInteractions();

        // ScrollSpy only relevant on the main landing page
        if (this.currentPath === '/' || this.currentPath.endsWith('index.html') || this.currentPath.endsWith('/')) {
            this.setupScrollSpy();
        }

        this.animateIn();
    }

    render() {
        const nav = document.createElement('nav');
        nav.className = 'dock-nav';

        const ul = document.createElement('ul');
        ul.className = 'dock-list';

        this.items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'dock-item';

            // Check active state
            const isProjectsPage = this.currentPath.includes('projects.html');
            if (isProjectsPage && item.label === 'Projects') {
                li.classList.add('active');
            }

            const span = document.createElement('span');
            span.className = 'icon';
            span.textContent = item.label;

            // ATTACH DATA
            li.dataset.path = item.path;
            li.dataset.target = item.id;

            li.appendChild(span);
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        document.body.appendChild(nav);

        this.dom.nav = nav;
        this.dom.items = nav.querySelectorAll('.dock-item');
    }

    setupInteractions() {
        this.dom.items.forEach(item => {
            // FIX: Ensure click covers the entire LI surface area
            item.addEventListener('click', (e) => {
                e.preventDefault(); // Stop any default anchor behavior if we added it

                const path = item.dataset.path;
                const target = item.dataset.target;

                console.log(`Navbar Click: ${item.textContent} -> Path: ${path}, Target: ${target}`);

                const isCurrentPageProjects = this.currentPath.includes('projects.html');
                const isTargetProjects = path.includes('projects.html');

                // CASE 1: Navigate TO Projects Page
                if (isTargetProjects && !isCurrentPageProjects) {
                    console.log('Navigating to Projects...');
                    window.location.href = './projects.html'; // Use relative path to be safe
                    return;
                }

                // CASE 2: Navigate HOME from Projects Page
                if (path === '/' && isCurrentPageProjects) {
                    console.log('Navigating Home...');
                    window.location.href = './index.html' + (target.startsWith('#') ? target : '');
                    return;
                }

                // CASE 3: Scroll on Home Page
                if (path === '/' && !isCurrentPageProjects) {
                    // Handle "Skills" specifically
                    if (target === '#skills') {
                        const skillsEl = document.querySelector('.skill-clusters-container');
                        if (skillsEl) {
                            const offset = skillsEl.getBoundingClientRect().top + window.scrollY - 100;
                            window.scrollTo({ top: offset, behavior: 'smooth' });
                            return;
                        }
                    }

                    const section = document.querySelector(target);
                    if (section) {
                        window.scrollTo({
                            top: section.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });

            // INTERACTIONS
            const icon = item.querySelector('.icon');
            item.addEventListener('mouseenter', () => {
                gsap.to(icon, { scale: 1.15, color: '#fff', duration: 0.3, ease: 'back.out(1.7)' });
            });

            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    gsap.to(icon, { scale: 1, color: 'rgba(255,255,255,0.6)', duration: 0.3 });
                } else {
                    gsap.to(icon, { scale: 1, color: '#fff', duration: 0.3 });
                }
            });
        });
    }

    setupScrollSpy() {
        const spyMap = {
            '#hero': 'Home',
            '#about': 'About',
            '#experience': 'Experience',
            '#connect': 'Contact'
        };

        Object.keys(spyMap).forEach(id => {
            const section = document.querySelector(id);
            if (!section) return;

            ScrollTrigger.create({
                trigger: section,
                start: 'top 50%',
                end: 'bottom 50%',
                onToggle: (self) => {
                    if (self.isActive) {
                        this.setActiveLabel(spyMap[id]);
                    }
                }
            });
        });
    }

    setActiveLabel(label) {
        this.dom.items.forEach(item => {
            const icon = item.querySelector('.icon');
            if (item.textContent === label) {
                item.classList.add('active');
                gsap.to(icon, { color: '#fff', scale: 1.1, duration: 0.3 });
            } else {
                item.classList.remove('active');
                gsap.to(icon, { color: 'rgba(255,255,255,0.6)', scale: 1, duration: 0.3 });
            }
        });
    }

    animateIn() {
        gsap.set(this.dom.nav, { opacity: 1, y: 0 });
        gsap.from(this.dom.nav, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2,
            clearProps: 'all'
        });
    }
}
