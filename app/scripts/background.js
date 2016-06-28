'use strict';

import { IPCManager } from './ipc';
import { ProxyManager } from './proxy';
import { WebsiteManager } from './websitemanager';

var ipc = new IPCManager();
var proxy = new ProxyManager();
var websiteManager = new WebsiteManager(ipc);

function setTabIcon(tab) {
    var website = websiteManager.websiteFromUrl(tab.url);
    var active = websiteManager.isWebsiteActive(website);
    var icon = active ? 'images/icon.png' : 'images/icon-disabled.png';

    chrome.pageAction.setIcon({
        tabId: tab.id,
        path: icon
    });
}

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
  chrome.tabs.get(tabId, tab => {setTabIcon(tab)});
});


chrome.pageAction.onClicked.addListener(function (tab) {
    var website = websiteManager.websiteFromUrl(tab.url);
    var active = websiteManager.toggleWebsite(website);

    setTabIcon(tab);
    proxy.updatePAC(websiteManager.getActiveWebsites(), () => {
        chrome.tabs.reload(tab.id);
    });
});

// TODO not sure if needed on load
proxy.updatePAC(websiteManager.getActiveWebsites());

// chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
//     chrome.tabs.get(details.tabId, function(tab) {
//         var website = websiteManager.websiteFromUrl(tab.url);
//         details.requestHeaders['X-CB-WEBSITE'] = website;
//         return {requestHeaders: details.requestHeaders};
//     });
// },  {urls: ['<all_urls>']}, ['blocking', 'requestHeaders']);
