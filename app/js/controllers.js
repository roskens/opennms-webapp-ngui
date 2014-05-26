'use strict';

/* Controllers */

angular.module('opennms.controllers', ['ngResource'])
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
    .controller('OutagesController', ['$scope', '$filter', '$resource', '$timeout', function($scope, $filter, $resource, $timeout) {
            /* Issues:
             * 1. rest interface does not have sort by node foreign source.
             * 2. rest interface does not have sort by node.
             * 3. rest interface does not sort by interface.
             * 4. rest interface does not sort by service.
             */
            var Api = $resource('/opennms/rest/outages');
            // use build-in angular filter
            var config = {
                limit: 0
            };
            $scope.sort = {
                sortingOrder: 'id',
                reverse: false
            };
            $scope.gap = 5;
            $scope.filteredItems = [];
            $scope.groupedItems = [];
            $scope.itemsPerPage = 10;
            $scope.pagedItems = [];
            $scope.currentPage = 0;
            $scope.items = [];
            // limit: count
            // offset: (page - 1) * count
            // orderBy:
            // order:
            // comparator:
            Api.get(config, function(data) {
                $timeout(function() {
                    console.log('outages:', data.outage);
                    $scope.items = data.outage;
                    $scope.search();
                }, 500);
            });
            var searchMatch = function(haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };
            // init the filtered items
            $scope.search = function() {
                $scope.filteredItems = $filter('filter')($scope.items, function(item) {
                    for (var attr in item) {
                        if (searchMatch(item[attr], $scope.query))
                            return true;
                    }
                    return false;
                });
                // take care of the sorting order
                if ($scope.sort.sortingOrder !== '') {
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
                }
                $scope.currentPage = 0;
                // now group by pages
                $scope.groupToPages();
            };
            // calculate page in place
            $scope.groupToPages = function() {
                $scope.pagedItems = [];
                for (var i = 0; i < $scope.filteredItems.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                    } else {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                    }
                }
            };
            $scope.range = function(size, start, end) {
                var ret = [];
                //console.log(size, start, end);

                if (size < end) {
                    end = size;
                    start = size - $scope.gap;
                }
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                //console.log(ret);
                return ret;
            };
            $scope.firstPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage = 0;
                }
            };
            $scope.lastPage = function() {
                if ($scope.currentPage < $scope.pagedItems.length - 1) {
                    $scope.currentPage = $scope.pagedItems.length - 1;
                }
            };
            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };
            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.pagedItems.length - 1) {
                    $scope.currentPage++;
                }
            };
            $scope.setPage = function() {
                $scope.currentPage = this.n;
            };
            $scope.getStatusLabel = function(outage) {
                if (outage.serviceRegainedEvent === null) {
                    return 'DOWN';
                }
            };
            $scope.search();
        }])
    .controller('OutageDetailController', ['$scope', '$filter', '$resource', '$timeout', function($scope, $filter, $resource, $timeout) {
            /* Issues:
             * 1. rest interface does not have sort by node foreign source.
             * 2. rest interface does not have sort by node.
             * 3. rest interface does not sort by interface.
             * 4. rest interface does not sort by service.
             */
            var Api = $resource('/opennms/rest/outages/:outageId', {outageId:'@id'});
            // use build-in angular filter
            var config = {
                id: 1,
                limit: 0
            };
            // limit: count
            // offset: (page - 1) * count
            // orderBy:
            // order:
            // comparator:
            Api.get(config, function(data) {
                $timeout(function() {
                    console.log('data:', data);
                    $scope.outage = data.outage[0];
                }, 500);
            });
            $scope.getStatusLabel = function(outage) {
                if (outage.serviceRegainedEvent === null) {
                    return 'DOWN';
                }
            };
        }])
    .controller('OutagesSearchController', ['$scope', '$stateParams', function($scope, $stateParams) {

        }])
    .controller('PathOutagesController', ['$scope', function($scope) {

        }])
    .controller('DashboardController', ['$scope', function($scope) {

        }])
    .controller('EventsController', ['$scope', '$filter', '$resource', '$timeout', function($scope, $filter, $resource, $timeout) {
            $scope.favorites = [];
        
        }])
    .controller('EventListController', ['$scope', '$filter', '$resource', '$timeout', function($scope, $filter, $resource, $timeout) {
            /* Issues:
             * 1. rest interface does not have sort by node foreign source.
             * 2. rest interface does not have sort by node.
             * 3. rest interface does not sort by interface.
             * 4. rest interface does not sort by service.
             */
            var Api = $resource('/opennms/rest/events');
            // use build-in angular filter
            var config = {
                limit: 10
            };
            $scope.sort = {
                sortingOrder: 'id',
                reverse: false
            };
            $scope.gap = 5;
            $scope.filteredItems = [];
            $scope.groupedItems = [];
            $scope.itemsPerPage = 10;
            $scope.pagedItems = [];
            $scope.currentPage = 0;
            $scope.items = [];
            // limit: count
            // offset: (page - 1) * count
            // orderBy:
            // order:
            // comparator:
            Api.get(config, function(data) {
                $timeout(function() {
                    console.log('outages:', data.outage);
                    $scope.items = data.outage;
                    $scope.search();
                }, 500);
            });
            var searchMatch = function(haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };
            // init the filtered items
            $scope.search = function() {
                $scope.filteredItems = $filter('filter')($scope.items, function(item) {
                    for (var attr in item) {
                        if (searchMatch(item[attr], $scope.query))
                            return true;
                    }
                    return false;
                });
                // take care of the sorting order
                if ($scope.sort.sortingOrder !== '') {
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
                }
                $scope.currentPage = 0;
                // now group by pages
                $scope.groupToPages();
            };
            // calculate page in place
            $scope.groupToPages = function() {
                $scope.pagedItems = [];
                for (var i = 0; i < $scope.filteredItems.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                    } else {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                    }
                }
            };
            $scope.range = function(size, start, end) {
                var ret = [];
                //console.log(size, start, end);

                if (size < end) {
                    end = size;
                    start = size - $scope.gap;
                }
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                //console.log(ret);
                return ret;
            };
            $scope.firstPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage = 0;
                }
            };
            $scope.lastPage = function() {
                if ($scope.currentPage < $scope.pagedItems.length - 1) {
                    $scope.currentPage = $scope.pagedItems.length - 1;
                }
            };
            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };
            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.pagedItems.length - 1) {
                    $scope.currentPage++;
                }
            };
            $scope.setPage = function() {
                $scope.currentPage = this.n;
            };
            $scope.getStatusLabel = function(outage) {
                if (outage.serviceRegainedEvent === null) {
                    return 'DOWN';
                }
            };
            $scope.search();
        }])
    .controller('EventDetailController', ['$scope', '$filter', '$resource', '$timeout', function($scope, $filter, $resource, $timeout) {
            /* Issues:
             * 1. rest interface does not have sort by node foreign source.
             * 2. rest interface does not have sort by node.
             * 3. rest interface does not sort by interface.
             * 4. rest interface does not sort by service.
             */
            var Api = $resource('/opennms/rest/events/:eventId', {eventId:'@id'});
            // use build-in angular filter
            var config = {
                id: 1,
                limit: 0
            };
            // limit: count
            // offset: (page - 1) * count
            // orderBy:
            // order:
            // comparator:
            Api.get(config, function(data) {
                $timeout(function() {
                    console.log('data:', data);
                    $scope.outage = data.outage[0];
                }, 500);
            });
            $scope.getStatusLabel = function(outage) {
                if (outage.serviceRegainedEvent === null) {
                    return 'DOWN';
                }
            };
        }])
    .controller('EventsSearchController', ['$scope', '$stateParams', function($scope, $stateParams) {

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