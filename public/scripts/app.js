(function() {
    'use strict';
    angular
        .module('fifty-states', ['ngRoute'])
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
        // $routeProvider
        //     .when('/', {
        //         templateUrl: 'views/map.html',
        //         controller: 'MapCtrl',
        //         controllerAs: 'mapCtrl'
        //     });
    }

})();
