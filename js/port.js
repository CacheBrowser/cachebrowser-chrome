console.log("HERE")
function Socket() {
  var self = this;
  var port = null;
  var recvCallbacks = [];
  var closeCallbacks = [];
  var messageCallbacks = {};
  var messageIdCounter = 1;

  this.connect = function(callback) {
    var hostName = "com.spin.cachebrowser";
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(onRecv);
    port.onDisconnect.addListener(onClose);
    if (callback) {
        callback();
    }
  };

  this.disconnect = function() {

  };

  this.close = function (callback) {
    if (callback) {
      closeCallbacks.push(callback);
    }
  };

  this.recv = function (callback) {
    if (callback) {
      recvCallbacks.push(callback);
    }
  };

  this.send = function (message, callback) {
    message.messageId = messageIdCounter++;
    if (callback) {
      messageCallbacks[message.messageId] = callback;
    }
    port.postMessage(message);
  };

  function onRecv(message) {
    var messageId = message.messageId;
    if (messageId && messageCallbacks[messageId]) {
      var callback = messageCallbacks[messageId];
      delete messageCallbacks[messageId];
      return callback(message);
    }

    for (var i = 0; i < recvCallbacks.length; i++) {
      recvCallbacks[i](message);
    }
  }

  function onClose() {
    console.log(chrome.runtime.lastError.message);
    for (var i = 0; i < closeCallbacks.length; i++) {
      closeCallbacks[i](chrome.runtime.lastError.message);
    }
  }
}


function TCPSocket(ip, port) {
  var self = this;
  this.socketId = null;

  this.connect = function(callback) {
    chrome.sockets.tcp.create({}, function(createInfo) {
      chrome.sockets.tcp.connect(createInfo.socketId,
        ip, port, function () {
          self.socketId = createInfo.socketId;
          if (callback) {
            callback();
          }
        });
    });
  };

  this.close = function() {
    chrome.sockets.tcp.disconnect(self.socketId);
  };

  this.recv = function (callback) {
    chrome.sockets.tcp.onReceive.addListener(function(info) {
      if (info.socketId != self.socketId)
        return;
      if (callback) {
        return callback(info.data);
      }
    });
  };

  this.send = function(data, callback) {
    if (typeof(data) == 'object') {
      data = JSON.stringify(data);
    }
    data = data + "\n";
    chrome.sockets.tcp.send(self.socketId, data, callback);
  }
}
