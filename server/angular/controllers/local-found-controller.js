/*****************************
*   LOCAL-FOUND-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "apiSearch",
        "$stateParams",
        function ($scope, $location, apiSearch, $stateParams) {


            $scope.information;

            $scope.exit = function exit() {
                $location.path("/home/neighbourhood");
            };

            //search api for uprn
            apiSearch.searchNeighbourhood($stateParams.uprn)
                .success(function(data) {
                    
                    if (data.hasOwnProperty("error")) {
                        $location.path("/home/neighbourhood");
                        return $scope.updateError(data.message);
                    }
                    $scope.updateError("");
                    return $scope.update("information", data.information);
                })
                .error(function(data) {
                    $scope.updateError("Sorry, it looks like something went wrong");
                    return $location.path("/home/neighbourhood");
                });

        }
    ];
}());
