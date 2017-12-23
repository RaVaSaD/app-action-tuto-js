(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('GetNotesController', function($scope, $http, $location, $rootScope, $route){

			init(); 

			function init(){

				$http.post('php/apiNotaGet.php', { usuario : $rootScope.idUsuario })
					.success(function(data) {

					    $scope.notes = data;
					    //console.log($scope.notes);
					});
			}

			$scope.editarNota = function (id){
				/*console.log("ID de la Nota que se va a editar: " + id);*/
				$location.url("/editnota/" + id);
			}

			$scope.borrarNota = function (id){
				/*console.log("ID de la nota a eliminar: " + id);*/
				swal({   
					title: "Vas a eliminar una nota",   
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

							$http.post('php/apiNotaDelete.php', { id : id } )
							.success(function(data) {
								
								swal("Eliminada", "Tu nota ha sido eliminada de la BBDD", "success"); 
								//Utilizamos route.reload para recargar la página, una vez se haya eliminado la nota.
								$route.reload();
							});     
							  
						} 
						else {
							swal("Cancelado", "Tu nota no ha sido eliminada", "error");	
						}
					}
				);
				
			}

			$scope.irNuevaNota = function (){
				$location.url("/addnota");
			}

		});
})();
