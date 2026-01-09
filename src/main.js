import './styles/main.css';
import { DataManager } from './core/DataManager.js';
import { ScrollManager } from './core/ScrollManager.js';

import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { Skills } from './components/Skills.js';
import { About } from './components/About.js';
import { Experience } from './components/Experience.js';
import { Projects } from './components/Projects.js';
import { Certifications } from './components/Certifications.js';
import { Contact } from './components/Contact.js';
import { Cursor } from './components/Cursor.js';

console.log('Antigravity System Online.');

class App {
    constructor() {
        this.init();
    }

    async init() {
        console.log('Initializing modules...');

        // 1. Load Data
        this.dataManager = new DataManager();
        const data = await this.dataManager.load();

        if (!data) {
            console.error('CRITICAL: Data failed to load.');
            return;
        }

        // 2. Initialize Core Systems
        this.scroll = new ScrollManager();
        this.nav = new Navbar(); // Init Navbar
        this.cursor = new Cursor(); // Init Cursor
        // this.physics = new PhysicsWorld(); // Physics handled by GSAP/ScrollTrigger now

        // 3. Initialize Components
        const safeInit = (ClassRef, data, name) => {
            try {
                if (ClassRef) new ClassRef(data);
            } catch (e) {
                console.warn(`Module ${name} failed to load:`, e);
            }
        };

        this.hero = safeInit(Hero, data, 'Hero');
        this.skills = safeInit(Skills, data, 'Skills');
        this.about = safeInit(About, data, 'About');
        this.work = safeInit(Projects, data, 'Projects');
        this.xp = safeInit(Experience, data, 'Answer');
        this.certs = safeInit(Certifications, data, 'Certifications');
        this.contact = safeInit(Contact, data, 'Contact');

        // Remove loading state if we had one
        document.body.classList.add('loaded');
    }
}

new App();
