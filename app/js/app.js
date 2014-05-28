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
    'opennms.controllers',
    'opennms.reports',
    'opennms.admin'
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
/*
    .config(['$provide', function($provide) {
            $provide.decorator('$rootScope', function($delegate) {
                var _emit = $delegate.$emit;

                $delegate.$emit = function() {
                    console.log.apply(console, arguments);
                    _emit.apply(this, arguments);
                };

                return $delegate;
            });
        }])
*/
    .run(['$rootScope', function($rootScope) {
// Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362
// Paste this in browser's console
// var $rootScope = angular.element(document.querySelectorAll("[ui-view]")[0]).injector().get('$rootScope');

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins.');
                console.log('fromState', fromState);
                console.log('fromParams', fromParams);
                console.log('toState', toState);
                console.log('toParams', toParams);
            });

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
                console.log('$stateChangeError - fired when an error occurs during transition.');
                console.log(arguments);
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
            });

            $rootScope.$on('$viewContentLoading', function(event, viewConfig) {
                console.log('$viewContentLoading - fired before dom rendered', event);
                console.log('viewConfig', viewConfig);
            });

            $rootScope.$on('$viewContentLoaded', function(event) {
                console.log('$viewContentLoaded - fired after dom rendered', event);
            });

            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
                console.log('$stateNotFound ' + unfoundState.to + ' - fired when a state cannot be found by its name.');
                console.log('unfoundState.to', unfoundState.to);
                console.log('unfoundState.toParams', unfoundState.toParams);
                console.log('unfoundState.options', unfoundState.options);
                console.log('fromState', fromState);
                console.log('fromParams', fromParams);
            });
        }])
    ;
