'use strict';

/**
 * Directives
 * 
 * Directives are attributes for html tags.
 */


angular.module('opennms.directives', [])
    .directive('appVersion', ['version', function(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        }])
    .directive('noticeStatus', ['noticeStatus', function(noticeStatus) {
            return function(scope, elm, attrs) {
                elm.text(noticeStatus);
            };
        }])
    .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
            function link(scope, element, attrs) {
                var format,
                    timeoutId;

                function updateTime() {
                    element.text(dateFilter(new Date(), format));
                }

                scope.$watch(attrs.myCurrentTime, function(value) {
                    format = value;
                    updateTime();
                });

                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function() {
                    updateTime(); // update DOM
                }, 1000);
            }

            return {
                link: link
            };
        }])
    .directive("customSort", function() {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                order: '=',
                sort: '='
            },
            template:
                ' <a ng-click="sort_by(order)" style="color: #555555;">' +
                '    <span ng-transclude></span>' +
                '    <i ng-class="selectedCls(order)"></i><i class="fa" ng-class="fa-filter"></i>' +
                '</a>',
            link: function(scope) {

                // change sorting order
                scope.sort_by = function(newSortingOrder) {
                    var sort = scope.sort;

                    if (sort.sortingOrder == newSortingOrder) {
                        sort.reverse = !sort.reverse;
                    }

                    sort.sortingOrder = newSortingOrder;
                };


                scope.selectedCls = function(column) {
                    if (column == scope.sort.sortingOrder) {
                        return ('fa fa-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
                    }
                    else {
                        return 'fa fa-sort';
                    }
                };
            }// end link
        }
    });
