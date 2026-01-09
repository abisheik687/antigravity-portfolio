import resumeData from '../data/resume.json';

export class DataManager {
    constructor() {
        this.data = null;
    }

    async load() {
        try {
            // In Vite, importing JSON bundles it into the build, removing the need for fetch
            this.data = resumeData;
            return this.data;
        } catch (e) {
            console.error('Failed to load resume data:', e);
            return null;
        }
    }

    get(key) {
        if (!this.data) return null;
        return key ? this.data[key] : this.data;
    }
}
