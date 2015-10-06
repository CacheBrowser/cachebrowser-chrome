var cachebrowser = angular.module('cachebrowser', []);

cachebrowser.service('$port', Socket);
cachebrowser.service('$chrome', ChromeHelper);

// var socket = new Socket();
//
// function initialize(socket, url) {
//   socket.send({
//     action: 'check host',
//     host: 'url'
//   }, function (response) {
//     changeIcon(response.result);
//   });
// }
//
//
// socket.recv(function (message) {
//     // appendMessage(message);
// });
//
