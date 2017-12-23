(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('PrincipalController', function($rootScope, $scope, loginFactory){

		   $rootScope.login = loginFactory.getValor();   

		});
})();
