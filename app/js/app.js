'use strict';


// Declare app level module which depends on filters, and services
angular.module('opennms', [
  'ngRoute',
  'opennms.filters',
  'opennms.services',
  'opennms.directives',
  'opennms.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl', title: 'Login'});
  $routeProvider.when('/logoff', {templateUrl: 'partials/logoff.html', controller: 'LoginCtrl', title: 'Logoff'});
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1', title: 'View1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2', title: 'View2'});
  $routeProvider.when('/element', {templateUrl: 'partials/element.html', controller: 'ElementController', title: 'Search'});
  $routeProvider.when('/element/nodelist', {templateUrl: 'partials/element/nodelist.html', controller: 'ElementListController', title: 'Node List'});
  $routeProvider.when('/asset', {templateUrl: 'partials/asset.html', controller: 'AssetController', title: 'Asset Search'});
  $routeProvider.when('/asset/nodelist', {templateUrl: 'partials/asset/nodelist.html', controller: 'AssetListController', title: 'Node Asset List'});
  $routeProvider.when('/outages', {templateUrl: 'partials/outages.html', controller: 'OutagesController', title: 'Outages'});
  $routeProvider.when('/pathOutages', {templateUrl: 'partials/pathOutages.html', controller: 'PathOutagesController', title: 'Path Outages'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
