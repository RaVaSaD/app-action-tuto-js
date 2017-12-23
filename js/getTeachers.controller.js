(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('GetTeachersController', function($scope, $http, $location){

			init();

			function init(){
				// this is where the JSON from api.php is consumed
				$http.get('php/apiTeacher.php')
					.success(function(data) {
					    // here the data from the api is assigned to a variable named users
					    $scope.teachers = data;					    
					});
			}

			$scope.addTuto = function (idTuto,nameTeacher,apellTeacher,asignatura){
				$location.url("/addtuto/" + idTuto + "/" + nameTeacher + "/" + apellTeacher + "/" + asignatura);
			}

		});
})();
