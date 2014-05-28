'use strict';

/* Controllers */

angular.module('opennms.admin',
    ['ngResource', 'ui', 'ui.router', 'ui.bootstrap', 'ngQuickDate'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/admin',
                template: '<ui-view/>'
            })
            .state('admin.index', {
                url: '',
                templateUrl: 'partials/admin/index.html'
            })
            .state('admin.users', {
                abstract: true,
                url: '/users',
                template: '<ui-view/>'
            })
            .state('admin.users.index', {
                url: '',
                templateUrl: 'partials/admin/users/index.html'
            })
            .state('admin.users.users', {
                abstract: true,
                url: '/users',
                template: '<ui-view/>'
            })
            .state('admin.users.users.list', {
                url: '',
                controller: 'AdminUsersUsersController',
                templateUrl: 'partials/admin/users/users/list.html'
            })
            .state('admin.users.users.user', {
                url: '/:id',
                controller: 'AdminUsersUsersDetailController',
                templateUrl: 'partials/admin/users/users/detail.html'
            })
            .state('admin.systeminfo', {
                url: '/systeminfo',
                templateUrl: 'partials/admin/systeminfo.html'
            })
            ;
    })
    .controller('AdminController', ['$scope', '$filter', '$resource', '$timeout', '$state', '$stateParams', '$sce', function($scope, $filter, $resource, $timeout, $state, $stateParams, $sce) {
        }])
    .controller('AdminNotificationController', ['$scope', '$filter', '$resource', '$timeout', '$state', '$stateParams', '$sce', function($scope, $filter, $resource, $timeout, $state, $stateParams, $sce) {
            $scope.status = 'Unknown';
            $scope.update = function(status) {
                $scope.status = angular.copy(status);
            };
        }])
    .controller('AdminUsersUsersController', ['$scope', '$filter', '$resource', '$timeout', '$state', '$stateParams', '$sce', function($scope, $filter, $resource, $timeout, $state, $stateParams, $sce) {
            /* Issues:
             * 1. rest interface does not return pager-email or xmpp-address.
             */
            var Api = $resource('/opennms/rest/users');
            var config = {
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
                    console.log('users:', data.user);
                    $scope.items = data.user;
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
    .controller('AdminUsersUsersDetailController', ['$scope', '$filter', '$resource', '$timeout', '$state', '$stateParams', '$sce', function($scope, $filter, $resource, $timeout, $state, $stateParams, $sce) {
            /* Issues:
             * 1. rest interface does not return pager-email, xmpp-address, numerical service & pin, text service & pin, or
             *    work, mobile or home phone numbers.
             */
            var Api = $resource('/opennms/rest/users/:userId', {userId: '@id'});
            // use build-in angular filter
            var config = {
                id: $stateParams.id
            };
            // limit: count
            // offset: (page - 1) * count
            // orderBy:
            // order:
            // comparator:
            Api.get(config, function(data) {
                $timeout(function() {
                    console.log('data:', data);
                    $scope.user = data.user[0];
                }, 500);
            });
        }])
    ;