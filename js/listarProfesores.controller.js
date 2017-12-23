(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('listarProfesoresController', function($scope, $http, $location, $route){

			init();

			function init(){
				// this is where the JSON from api.php is consumed
				$http.get('php/apiTeacherActivos.php')
					.success(function(data) {
					    // here the data from the api is assigned to a variable named users
					    $scope.teachers = data;					    
					});
			}

			$scope.desactivar = function (id){

				var accion = "desactivar";

				console.log("El id del profesor es: " + id);

				swal({   
					title: "Vas a desactivar a un profesor",   
					text: "¿Estás seguro?",   
					type: "warning",   
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Si",   
					cancelButtonText: "No",   
					closeOnConfirm: false,   
					closeOnCancel: false }, 
					function(isConfirm){   
						if (isConfirm) {							

							$http.post('php/apiTeacherAdministracion.php', { id : id, accion : accion } )
							.success(function(data) {
								
								swal("Desactivado", "El profesor ha sido desactivado", "success"); 
								//Utilizamos route.reload para recargar la página, una vez se haya desactivado al profesor.
								$route.reload();
							});     
							  
						} 
						else {
							swal("Cancelado", "El profesor no ha sido desactivado", "error");	
						}
					}
				);
			}

		});
})();