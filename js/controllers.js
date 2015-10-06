var cachebrowser = angular.module('cachebrowser');

function MainCtrl($scope, $port, $chrome) {
  $scope.host = null;
  $scope.url = null;
  $scope.state = {
    loading: true
  };

  function addHost(url) {
    $port.send({
      action: 'add host',
      host: url
    }, function (response) {
      if (response.result == 'success') {
        $chrome.changeIcon('active');
        $scope.host = response.host;
      }

      $scope.$apply(function () {
          $scope.state.loading = false;
      });
    });
  }

  $scope.removeHost = function () {
    $port.send({
      action: 'remove host',
      host: 'url'
    }, function (response) {
      if (response.result == 'success') {
        $chrome.changeIcon('inactive');
      }
    });
  };

  $port.connect(function() {
      $chrome.getCurrentTabUrl(function (url) {
        $scope.url = url;
        addHost(url);
      });
  });
}

cachebrowser.controller('MainCtrl', MainCtrl);
