/**
 * Created by PAS on 3/02/2015.
 */
angular.module('PasFilters', [])
    .filter('formatDuration', function() {
        return function(input) {
            var readableDuration;
            var seconds;
            durationArray = nezasa.iso8601.Period.parse(input, true);
            if(durationArray[6] > 9)
                seconds = durationArray[6];
            else
                seconds = "0" + durationArray[6];
            readableDuration = durationArray[5] + ":" + seconds;
            if(durationArray[4] > 0)
                readableDuration = durationArray[4] + ":" + readableDuration;

            return  readableDuration;
        }
    })
    .filter('fromDate', function() {
        return function (input) {
          moment.locale('fr');
          return moment(input).fromNow();
        }

    });