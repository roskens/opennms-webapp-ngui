'use strict';


// Declare app level module which depends on filters, and services
angular.module('opennms', [
  'ui',
  'ui.router',
  'opennms.filters',
  'opennms.services',
  'opennms.directives',
  'opennms.controllers'
])
.config(function($stateProvider) {
    $stateProvider.state('node.view', {
      url: '/node/:id',
      controller: 'NodeController',
      resolve: {
        node: function($stateParams, NodeService) {
          return NodeService.get($stateParams.id);
        },
        currentTimeframe: function(node) {
          return node.getCurrentTimeframe();
        }
      }
    });
})
.config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.when('/node', '/node/list');
    $urlRouterProvider.otherwise('');
}])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('index', {url: ''})
    .state('login', {url: '/login',templateUrl: 'partials/login.html', title: 'Login'})
    .state('logoff', {url: '/logoff',templateUrl: 'partials/logoff.html', title: 'Logoff'})
    .state('view1', {url: '/view1',templateUrl: 'partials/partial1.html', controller: 'MyCtrl1', title: 'View1'})
    .state('view2', {url: '/view2',templateUrl: 'partials/partial2.html', controller: 'MyCtrl2', title: 'View2'})
    .state('node', {url: '/node', abstract: true })
    .state('node.list', { url: '/list', templateUrl: 'partials/node/list.html', controller: 'NodeController', title: 'Node List'})
    .state('node.search', {url: '/search',templateUrl: 'partials/node/search.html', controller: 'NodeController', title: 'Node Search'})
    .state('/asset', {url: '/asset',templateUrl: 'partials/asset.html', controller: 'AssetController', title: 'Asset Search'})
    .state('/asset/nodelist', {url: '/asset/nodelist',templateUrl: 'partials/asset/nodelist.html', controller: 'AssetListController', title: 'Node Asset List'})
    .state('/outages', {url: '/outages',templateUrl: 'partials/outages.html', controller: 'OutagesController', title: 'Outages'})
    .state('/pathOutages', {url: '/pathOutages',templateUrl: 'partials/pathOutages.html', controller: 'PathOutagesController', title: 'Path Outages'});
}]);
