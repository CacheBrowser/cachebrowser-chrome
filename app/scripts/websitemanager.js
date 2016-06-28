
export class WebsiteManager {
    constructor(ipc) {
        this.ipc = ipc;

        this.activeWebsites = new Set();
    }

    websiteFromUrl(url) {
        var url = new URL(url);
        return url.hostname;
    }

    isWebsiteActive(website) {
        return this.activeWebsites.has(website);
    }

    toggleWebsite(website) {
        if (this.activeWebsites.has(website)) {
            this.activeWebsites.delete(website);
            return false;
        } else {
            this.activeWebsites.add(website);
            return true;
        }
    }

    getActiveWebsites() {
        return Array.from(this.activeWebsites);
    }
}
