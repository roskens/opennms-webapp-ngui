'use strict';


// Declare app level module which depends on filters, and services
angular.module('opennms', [
    'ui',
    'ui.router',
    'ui.bootstrap',
    'ngQuickDate',
    'opennms.filters',
    'opennms.services',
    'opennms.directives',
    'opennms.controllers'
])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                title: 'Login'
            })
            .state('logoff', {
                url: '/logoff',
                templateUrl: 'partials/logoff.html',
                title: 'Logoff'
            })
            .state('view1', {
                url: '/view1',
                templateUrl: 'partials/partial1.html',
                controller: 'MyCtrl1',
                title: 'View1'
            })
            .state('view2', {
                url: '/view2',
                templateUrl: 'partials/partial2.html',
                controller: 'MyCtrl2',
                title: 'View2'
            })
            .state('node', {
                abstract: true,
                url: '/node',
                template: '<ui-view/>'
                    //templateUrl: 'partials/node.html'
            })
            .state('node.default', {
                url: '',
                templateUrl: 'partials/node/search.html',
                // controller: 'NodeController',
                title: 'Node List'
            })
            .state('node.list', {
                url: '/list',
                templateUrl: 'partials/node/list.html',
                controller: 'NodeController',
                title: 'Node List'
            })
            .state('node.search', {
                url: '/search',
                templateUrl: 'partials/node/search.html',
                // controller: 'NodeController',
                title: 'Node Search'
            })
            .state('node.node', {
                url: '/:id',
                templateUrl: 'partials/node/node.html',
                controller: 'NodeDetailController',
                title: 'Node Detail List'
            })
            .state('/asset', {
                url: '/asset',
                templateUrl: 'partials/asset.html',
                controller: 'AssetController',
                title: 'Asset Search'
            })
            .state('/asset/nodelist', {
                url: '/asset/nodelist',
                templateUrl: 'partials/asset/nodelist.html',
                controller: 'AssetListController',
                title: 'Node Asset List'
            })
            .state('outages', {
                abstract: true,
                url: '/outages',
                template: '<ui-view/>'
            })
            .state('outages.default', {
                url: '',
                templateUrl: 'partials/outages/search.html',
                // controller: 'OutagesController',
                title: 'Outages'
            })
            .state('outages.list', {
                url: '/list',
                templateUrl: 'partials/outages/list.html',
                controller: 'OutagesController',
                title: 'Outages List'
            })
            .state('outages.search', {
                url: '/search',
                templateUrl: 'partials/outages/search.html',
                // controller: 'NodeController',
                title: 'Outages Search'
            })
            .state('outages.outage', {
                url: '/:id',
                templateUrl: 'partials/outages/outage.html',
                controller: 'OutageDetailController',
                title: 'Outages List'
            })
            .state('/pathOutages', {
                url: '/pathOutages',
                templateUrl: 'partials/pathOutages.html',
                controller: 'PathOutagesController',
                title: 'Path Outages'
            })
            .state('events', {
                abstract: true,
                url: '/events',
                template: '<ui-view/>'
            })
            .state('events.default', {
                url: '',
                templateUrl: 'partials/events/index.html',
                // controller: 'EventsController',
                title: 'Events'
            })
            .state('events.list', {
                url: '/list',
                templateUrl: 'partials/events/list.html',
                controller: 'EventsController',
                title: 'Events List'
            })
            .state('events.search', {
                url: '/search',
                templateUrl: 'partials/events/search.html',
                controller: 'EventSearchController',
                title: 'Events Search'
            })
            .state('events.event', {
                url: '/:id',
                templateUrl: 'partials/events/event.html',
                controller: 'EventDetailController',
                title: 'Event Details'
            });
    })
    .config(function(ngQuickDateDefaultsProvider) {
        ngQuickDateDefaultsProvider.set('parseDateFunction', function(str) {
            d = Date.create(str);
            return d.isValid() ? d : null;
        });
    })
    .config(['$provide', function($provide) {
            $provide.decorator('$rootScope', function($delegate) {
                var _emit = $delegate.$emit;

                $delegate.$emit = function() {
                    console.log.apply(console, arguments);
                    _emit.apply(this, arguments);
                };

                return $delegate;
            });
        }]);