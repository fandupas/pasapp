/**
 * Created by PAS on 3/02/2015.
 */
angular.module('PasFilters', [])
    .filter('formatDuration', function() {
        return function(input) {
           return input.replace("PT","").replace("H",":").replace("M",":").replace("S","");
        };
    });