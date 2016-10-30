(function() {
    "use-strict";
    angular
        .module('fifty-states')
        .controller('StateCtrl', StateCtrl);

    function StateCtrl(currentState, repArrays, stateNames, $location, $scope, $route) {

        var vm = this;
        vm.nationalReps = repArrays[0];
        vm.stateReps = repArrays[1];
        vm.localReps = repArrays[2];
        vm.state = currentState;
        vm.stateName = stateNames[vm.state];


        //clear out input boxes
        if($scope.mainCtrl.address.city){
            $scope.mainCtrl.address.state.abbreviation = '';
            $scope.mainCtrl.address.street = '';
            $scope.mainCtrl.address.city = '';
        }
  
    }
})();
