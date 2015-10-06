function ChromeHelper () {
  this.getCurrentTabUrl = function (callback) {
    var queryInfo = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      callback(url);
    });
  };

  this.changeIcon = function (type) {
    if (type == 'active') {
        chrome.browserAction.setIcon({path: 'images/icon_active.png'});
    } else {
        chrome.browserAction.setIcon({path: 'images/icon_inactive.png'});
    }
  }
}
