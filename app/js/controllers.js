'use strict';

/* Controllers */

angular.module('opennms.controllers', ['ngTable', 'ngResource'])
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
            {'name': 'FAQs', 'url': 'http://www.opennms.org/index.php/FAQ', 'display': true}
        ];
        var factory = {};
        factory.getNavLinks = function() {
            return links;
        };
        return factory;
    })
    .factory('breadcrumbsFactory', function($http) {
        var breadcrumbs = [
            {'name': 'FAQs', 'url': 'http://www.opennms.org/index.php/FAQ', 'display': true},
            {'name': 'FAQs', 'url': 'http://www.opennms.org/index.php/FAQ', 'display': true}
        ];
        var factory = {};
        factory.getBreadcrumbs = function() {
            return breadcrumbs;
        };
        return factory;
    })
    .factory('nodeFactory', function($http) {
        var nodes = [
            {'id': 1, 'label': 'node8', 'foreignSource': 'bigreq', 'foreignId': 'node8'},
            {'id': 2, 'label': 'node3'},
            {'id': 3, 'label': 'node7'},
            {'id': 4, 'label': 'node5'},
            {'id': 5, 'label': 'node6'},
            {'id': 6, 'label': 'node4'},
            {'id': 7, 'label': 'node2'},
            {'id': 8, 'label': 'node1'},
            {'id': 9, 'label': 'node10'},
            {'id': 10, 'label': 'node9'},
            {'id': 11, 'label': 'localhost'},
            {'id': 12, 'label': 'Test Node'},
            {'id': 13, 'label': 'roskens-fedora'}
        ];
        var factory = {};
        factory.getNodes = function() {
            return nodes;
        };
        return factory;
    })
    .factory('nodeDetailFactory', function($http) {
        var node = {'id': 1, 'label': 'node8', 'foreignSource': 'bigreq', 'foreignId': 'node8'};
        var factory = {};
        factory.getNode = function(id) {
            return node;
        };
        return factory;
    })
    .controller('onmsController', ['$scope', function($scope) {
            $scope.page = {
                'title': 'OpenNMS',
                'nonavbar': false,
                'nobreadcrumbs': false,
                'nofaq': false
            };
            $scope.user = {
                'loggedin': true,
                'name': 'roskens'
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
    .controller('BreadcrumbsController', ['$scope', 'breadcrumbsFactory', function($scope, breadcrumbsFactory) {
            $scope.breadcrumbs = [];
            init();
            function init() {
                $scope.breadcrumbs = breadcrumbsFactory.getBreadcrumbs();
            }
        }])
    .controller('NodeController', ['$scope', 'nodeFactory', function($scope, nodeFactory) {
            $scope.listInterfaces = false;
            $scope.nodes = [];
            init();
            function init() {
                $scope.nodes = nodeFactory.getNodes();
            }
            ;
            $scope.getNodeLink = function(node) {
                return '#/node/' + node.id;
            };
        }])
    .controller('NodeDetailController', ['$scope', '$stateParams', 'nodeDetailFactory', function($scope, $stateParams, nodeDetailFactory) {
            $scope.node = {};
            $scope.node.label = 'node8';
            $scope.node.id = 1;
            $scope.node.foreignSource = 'bigreq';
            $scope.node.foreignId = 'node8';
            $scope.node.statusSite = '';
            $scope.node.links = [];
            $scope.node.resources = [];
            $scope.node.navEntries = [];
            $scope.node.schedOutages = '';
            $scope.node.asset = {
                'description': '',
                'comments': ''
            };
            $scope.node.snmp = {
                'sysName': '',
                'sysObjectId': '',
                'sysLocation': '',
                'sysContact': '',
                'sysDescription': ''
            };
            init();
            function init() {
                $scope.node = nodeDetailFactory.getNode($stateParams.id);
            }
            ;
            console.log($scope.node);
        }])
    .controller('OutagesController', ['$scope', '$filter', '$http', '$resource', '$timeout', 'ngTableParams', function($scope, $filter, $http, $resource, $timeout, ngTableParams) {
            var data = [
                {
                    id: 0,
                    'node': {
                        id: 0,
                        foreignSource: '',
                        label: ''
                    },
                    ipaddr: '',
                    serviceName: '',
                    lostServiceTime: '',
                    regainedServiceTime: ''
                },
                {
                    id: 1,
                    node: {
                        id: 0,
                        foreignSource: '',
                        label: ''
                    },
                    ipaddr: '',
                    serviceName: '',
                    lostServiceTime: '',
                    regainedServiceTime: ''
                },
                {
                    id: 2,
                    node: {
                        id: 0,
                        foreignSource: '',
                        label: ''
                    },
                    ipaddr: '',
                    serviceName: '',
                    lostServiceTime: '',
                    regainedServiceTime: ''
                },
                {
                    id: 3,
                    node: {
                        id: 0,
                        foreignSource: '',
                        label: '',
                    },
                    ipaddr: '',
                    serviceName: '',
                    lostServiceTime: '',
                    regainedServiceTime: ''
                },
                {
                    id: 4,
                    node: {
                        id: 0,
                        foreignSource: '',
                        label: ''
                    },
                    ipaddr: '',
                    serviceName: '',
                    lostServiceTime: '',
                    regainedServiceTime: ''
                },
                {
                    id: 5,
                    node: {
                        id: 0,
                        foreignSource: '',
                        label: ''
                    },
                    ipaddr: '',
                    serviceName: '',
                    lostServiceTime: '',
                    regainedServiceTime: ''
                }
            ];
            var Api = $resource('/opennms/opennms/rest/outages');
            $scope.getStatusColor = function(outage) {

            };

            $scope.getStatusLabel = function(outage) {

            };
            
            $scope.getServiceName = function(outage) {
                return outage.monitoredService.serviceName;
            }

            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10, // count per page
                filter: {
                },
                sorting: {
                    id: 'desc'     // initial sorting
                }
            }, {
                counts: [10, 25, 50, 100, 250, 500, 1000, 2000],
                total: data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    
                    // limit: count
                    // offset: (page - 1) * count
                    // comparator:
                    // orderBy:
                    Api.get({limit:params.count(), offset: (params.page() - 1) * params.count(), orderBy: 'id'}, function(data) {
                        $timeout(function() {
                            console.log('outages:', data.outage);
                            var filteredData = params.filter() ?
                                $filter('filter')(data.outage, params.filter()) :
                                data.outage;
                            var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                data.outage;
                            params.total(orderedData.length); // set total for recalc pagination
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }, 5000);
                    });
                }
            });

        }])
    .controller('OutageDetailController', ['$scope', '$stateParams', function($scope, $stateParams) {

        }])
    .controller('OutagesSearchController', ['$scope', '$stateParams', function($scope, $stateParams) {

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