export class ProxyManager{
    constructor() {
        this.proxySettings = {
            host: '127.0.0.1',
            port: '8080'
        }
    }

    generatePAC(activeWebsites) {
        var condition =
        'host == "' + activeWebsites.join('" || host == "') + '"';

        return `
        function FindProxyForURL(url, host) {
            if (${condition}) {
                return "PROXY ${this.proxySettings.host}:${this.proxySettings.port}";
            }
            return "DIRECT";
        }
        `
    }

    updatePAC(activeWebsites, callback) {
        var pac = this.generatePAC(activeWebsites);
        console.log(pac);
        var config = {
            mode: 'pac_script',
            pacScript: {
                data: pac
            }
        };
        chrome.proxy.settings.set({value: config, scope: 'regular'}, function() {
            if (callback) {
                callback();
            }
        });
    }
}
