
export class DataManager {
    constructor() {
        this.data = null;
    }

    async load() {
        try {
            const response = await fetch('./src/data/resume.json');
            this.data = await response.json();
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
