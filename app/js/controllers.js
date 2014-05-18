'use strict';

/* Controllers */

angular.module('opennms.controllers', [])
  .factory('navLinkFactory', function($http) {
    var links = [
        {'name': 'Node List', 'url': '#/node/list', 'display': true},
        {'name': 'Search', 'url': '#/node/search', 'display': true},
        {'name': 'Outages', 'url': '#/outages', 'display': true},
        {'name': 'Path Outages', 'url': '#/pathOutages', 'display': true},
        {'name': 'Dashboard', 'url': '#/dashboard', 'display': true},
        {'name': 'Events', 'url': '#/events', 'display': true},
        {'name': 'Alarms', 'url': '#/alarms', 'display': true},
        {'name': 'Notifications', 'url': '#/notifications', 'display': true},
        {'name': 'Assets', 'url': '#/assets', 'display': true},
        {'name': 'Reports', 'url': '#/reports', 'display': true},
        {'name': 'Charts', 'url': '#/charts', 'display': true},
        {'name': 'Surveillance', 'url': '#/surveillance', 'display': true},
        {'name': 'Maps', 'url': '#/maps', 'display': true},
        {'name': 'Add Node', 'url': '#/element/addnode', 'display': true},
        {'name': 'Admin', 'url': '#/admin', 'display': true},
        {'name': 'FAQs', 'url': 'http://www.opennms.org/index.php/FAQ',  'display': true}
    ];
    var factory = {};
    factory.getNavLinks = function() {
      return links;
    };
    return factory;
  })
  .controller('onmsController', ['$scope', function($scope) {
    $scope.page = {
        'title': 'OpenNMS',
        'nonavbar' : false,
        'nobreadcrumbs': false,
        'nofaq': false
    };
    $scope.user = {
        'loggedin': true,
        'name' : 'roskens'
    };
    $scope.format = 'MMM d,yyyy HH:mm Z';
  }])
  .controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {

  }])
  .controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {

  }])
  .controller('MyCtrl2', ['$scope', '$http', function($scope, $http) {

  }])
  .controller('NavBarController', ['$scope', 'navLinkFactory', function($scope, navLinkFactory) {
    $scope.links = [];
    init();
    function init() {
        $scope.links = navLinkFactory.getNavLinks();
    }
  }])
  .controller('ElementController', ['$scope', function($scope) {

  }])
  .controller('ElementListController', ['$scope', function($scope) {

  }])
  .controller('OutagesController', ['$scope', function($scope) {

  }])
  .controller('PathOutagesController', ['$scope', function($scope) {

  }])
  .controller('DashboardController', ['$scope', function($scope) {

  }])
  .controller('EventsController', ['$scope', function($scope) {

  }])
  .controller('AlarmsController', ['$scope', function($scope) {

  }])
  .controller('NotificationsController', ['$scope', function($scope) {

  }])
  .controller('AssetController', ['$scope', function($scope) {

  }])
  .controller('AssetListController', ['$scope', function($scope) {

  }])
  .controller('ReportsController', ['$scope', function($scope) {

  }])
  .controller('ChartsController', ['$scope', function($scope) {

  }])
  .controller('SurveillanceController', ['$scope', function($scope) {

  }])
  .controller('MapsController', ['$scope', function($scope) {

  }])
  .controller('AdminController', ['$scope', function($scope) {

  }])
  .controller('SupportController', ['$scope', function($scope) {

  }]);

// NavBarController