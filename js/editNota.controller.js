(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('EditNotaController', function($scope, $http, $rootScope, $routeParams, $location){

        	init(); 

			function init(){
				// this is where the JSON from api.php is consumed
				$http.post('php/apiNotaEditIdNota.php', { id_nota : $routeParams.idNota })
					.success(function(data) {
					    // here the data from the api is assigned to a variable named users
					    $scope.nota = data;
					    //console.log($scope.notes);
					});
			}
  
			//Y por último, en esta función realizamos la modificación de la nota, mandando los datos a modificar en el post.
			$scope.EditNota = function (nota) {

				if (nota.titulo == "" || nota.descripcion == "" || nota.asignatura == "" || nota.tipo == ""){
					swal( "Cuidado", "Recuerda, rellena todos los campos del formulario.", "warning");
				}
				else{					
					swal({   
						title: "Vas a actualizar una nota",   
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
								
								/*console.log("Id: "+ nota.id + ", Titulo: " + nota.titulo + ", Descripción: " + nota.descripcion + ", Asignatura: " + nota.asignatura + ", Tipo: " + nota.tipo);*/
								// this is where the JSON from api.php is consumed
								$http.post('php/apiNotaEdit.php', nota)
								.success(function(data) {
								    // here the data from the api is assigned to a variable named users
								    swal("Actualizada", "Tu nota ha sido actualizada en BBDD", "success"); 
									$location.url("/listnotes");
								    /*console.log("La query es: " + data.queryString);*/
								});	 
							} 
							else {
								swal("Cancelado", "Tu nota no ha sido actualizada", "error");	
							}
						}
					);
				}

				
				
			} 
			

		});
})();
