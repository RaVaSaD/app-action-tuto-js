(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('activarProfesoresController', function($scope, $http, $location){

			init();

			function init(){
				// this is where the JSON from api.php is consumed
				$http.get('php/apiTeacherInactivos.php')
					.success(function(data) {
					    // here the data from the api is assigned to a variable named users
					    $scope.teachers = data;					    
					});
			}

			$scope.activar = function (id){

				var accion = "activar";
				
				console.log("El id del profesor es: " + id);

				swal({   
					title: "Vas a activar a un profesor",   
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
								
								swal("Activado", "El profesor ha sido activado", "success"); 
								//Utilizamos route.reload para recargar la página, una vez se haya activado al profesor.
								$location.url("/listarprofesores");
							});     
							  
						} 
						else {
							swal("Cancelado", "El profesor no ha sido activado", "error");	
						}
					}
				);				
			}

		});
})();