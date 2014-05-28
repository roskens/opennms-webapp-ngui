'use strict';

/* Controllers */

angular.module('opennms.reports',
    ['ngResource', 'ui', 'ui.router', 'ui.bootstrap', 'ngQuickDate'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('reports', {
                abstract: true,
                url: '/reports',
                template: '<ui-view/>'
            })
            .state('reports.default', {
                url: '',
                templateUrl: 'partials/reports/index.html'
            })
            .state('reports.resources', {
                url: '/resources',
                templateUrl: 'partials/reports/resources/index.html',
                controller: 'ReportsResourcesController'
            })
            .state('reports.dashboards', {
                url: '/dashboards',
                templateUrl: 'partials/reports/dashboards/index.html',
                controller: 'ReportsDashboardsController'
            })
            .state('reports.databases', {
                url: '/databases',
                templateUrl: 'partials/reports/databases/index.html',
                controller: 'ReportsDatabasesController'
            })
            .state('reports.statistics', {
                url: '/statistics',
                templateUrl: 'partials/reports/statistics/index.html',
                controller: 'ReportsStatisticsController'
            });
    })
    .controller('ReportsResourcesController', ['$scope', '$filter', '$resource', '$timeout', '$state', '$stateParams', '$sce', function($scope, $filter, $resource, $timeout, $state, $stateParams, $sce) {
        }])
    .directive('opennmsReportsResources', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'partials/reports/reports.resources.html'
        };
    })
    .controller('ReportsDashboardsController', ['$scope', '$filter', '$resource', '$timeout', '$state', '$stateParams', '$sce', function($scope, $filter, $resource, $timeout, $state, $stateParams, $sce) {
        }])
    .controller('ReportsDatabasesController', ['$scope', '$filter', '$resource', '$timeout', '$state', '$stateParams', '$sce', function($scope, $filter, $resource, $timeout, $state, $stateParams, $sce) {
        }])
    .controller('ReportsStatisticsController', ['$scope', '$filter', '$resource', '$timeout', '$state', '$stateParams', '$sce', function($scope, $filter, $resource, $timeout, $state, $stateParams, $sce) {
        }])
    .config(function(ngQuickDateDefaultsProvider) {
        ngQuickDateDefaultsProvider.set('parseDateFunction', function(str) {
            d = Date.create(str);
            return d.isValid() ? d : null;
        });
    })
    ;