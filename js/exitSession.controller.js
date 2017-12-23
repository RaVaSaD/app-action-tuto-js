(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('exitSessionController', function($rootScope, $scope, loginFactory, $location){

			loginFactory.putValor(false);
			$rootScope.login = loginFactory.getValor();

			$scope.irAInicio = function(){
				$location.url("/");
			}
		});
})();
