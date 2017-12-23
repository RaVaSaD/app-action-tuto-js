(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('AddNotaController', function($scope, $http, $location, $rootScope){
        	
        	var id_alumno;

        	$scope.nota = {
        		titulo : "",
        		descripcion : "",
				asignatura : "",
				tipo : "",
				fk_id_alumns: ""
        	};
        	
        	init();

        	function init() {
        		$http.post('php/apiNotaGetIdFkAlumn.php', { usuario : $rootScope.idUsuario })
					.success(function(data) {
						// here the data from the api is assigned to a variable named users
						id_alumno = data.fk_id_alumns;
						/*console.log("El id del alumno es: " +$rootScope.idUsuario + ", y su fk_id_alumns es: " + id_alumno);*/
					});
        	}


			$scope.AddNota = function (nota) {

				if (nota.titulo == "" || nota.descripcion == "" || nota.asignatura == "" || nota.tipo == ""){
					swal( "Cuidado", "Recuerda, rellena todos los campos del formulario.", "warning");
				}
				else{
					//Añado el valor del usuario ID.
					nota.id_usuario = id_alumno;
					swal({   
						title: "Vas a insertar una nota",   
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
								//alert("Titulo: " + nota.titulo + ", Descripción: " + nota.descripcion + ", Asignatura: " + nota.asignatura + ", Tipo: " + nota.tipo);
								/*console.log("Titulo: " + nota.titulo + ", Descripción: " + nota.descripcion + ", Asignatura: " + nota.asignatura + ", Tipo: " + nota.tipo + ", Usuario ID: " + nota.id_usuario);*/							
								// this is where the JSON from api.php is consumed
								$http.post('php/apiNotaPost.php', nota )
								.success(function(data) {
									// here the data from the api is assigned to a variable named users
									$scope.nota = data;
									swal("Insertado", "Tu nota ha sido insertada en BBDD", "success"); 
									$location.url("/listnotes");
								});     
								  
							} 
							else {
								swal("Cancelado", "Tu nota no ha sido insertada", "error");	
							}
						}
					);
				}
				
			}
		});
		
})();