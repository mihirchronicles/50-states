(function() {
    'use strict';
    angular
        .module('fifty-states', ['ngRoute', 'mapDirective', 'nzSweetAlert'])
        .constant('stateNames', {
            al: "Alabama",
            ak: "Alaska",
            az: "Arizona",
            ar: "Arkansas",
            ca: "California",
            co: "Colorado",
            ct: "Connecticut",
            de: "Delaware",
            fl: "Florida",
            ga: "Georgia",
            hi: "Hawaii",
            id: "Idaho",
            il: "Illinois",
            in: "Indiana",
            ia: "Iowa",
            ks: "Kansas",
            ky: "Kentucky",
            la: "Louisiana",
            me: "Maine",
            md: "Maryland",
            ma: "Massachusetts",
            mi: "Michigan",
            mn: "Minnesota",
            ms: "Mississippi",
            mo: "Missouri",
            mt: "Montana",
            ne: "Nebraska",
            nv: "Nevada",
            nh: "New Hampshire",
            nj: "New Jersey",
            nm: "New Mexico",
            ny: "New York",
            nc: "North Carolina",
            nd: "North Dakota",
            oh: "Ohio",
            ok: "Oklahoma",
            or: "Oregon",
            pa: "Pennsylvania",
            ri: "Rhode Island",
            sc: "South Carolina",
            sd: "South Dakota",
            tn: "Tennessee",
            tx: "Texas",
            ut: "Utah",
            vt: "Vermont",
            va: "Virginia",
            wa: "Washington",
            wv: "West Virginia",
            wi: "Wisconsin",
            wy: "Wyoming"
        })
        .config(configApp);

    function configApp($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './scripts/views/mapTmpl.html',
                controller: 'MapCtrl',
                controllerAs: 'mapCtrl'
            })
            .when('/state/:state', {  //route for when user clicks a state
                templateUrl: './scripts/views/stateInfo.html',
                controller: 'StateCtrl',
                controllerAs: 'stateCtrl',
                resolve: {
                    currentState: function($route) {
                        return $route.current.params.state;
                    },
                    repArrays: function($route, StateService) {
                        return StateService.getRepsByState($route.current.params.state);
                    }
                }
            });
    }

})();
