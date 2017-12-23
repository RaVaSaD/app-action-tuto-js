(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('GetPerfilController', function($scope, $http, $location, $rootScope, $route){

        	var tabla = "";
        	var tipoUsuario = $rootScope.tipoUsuario;        

			init(); 

			function init(){

				if (tipoUsuario == "alumno"){
					tabla = "alumns";
					/*console.log("Es un usuario tipo alumno y su tabla es: " + tabla);*/
					$http.post('php/apiPerfilGet.php', { id : $rootScope.idUsuario, tabla: tabla})
						.success(function(data) {
					    	$scope.perfil = data;					   
						});
				}
				else if(tipoUsuario == "profesor"){
					tabla = "teachers";
					/*console.log("Es un usuario tipo profesor y su tabla es: " + tabla);*/
					$http.post('php/apiPerfilGet.php', { id : $rootScope.idUsuario, tabla: tabla })
						.success(function(data) {
					    	$scope.perfil = data;					   
						});
				}
				else if(tipoUsuario == "administrador"){
					/*Es el usuario tipo administrador y su tabla es: Users, no hay que acceder a ninguna otra*/
					$scope.perfil = {
						tipo: "Administrador del Sistema",
						funcion: "Activar profesores en ActionTuto"
					};					   
					
				}


			}			

		});
})();
