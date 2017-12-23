(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('EditTutoProfesController', function($scope, $http, $rootScope, $routeParams, $location){
  
        	$scope.mascaraFecha = "99-99-9999";
        	$scope.mascaraHora = "99:99";

			//Una vez que hemos pulsado editar, se abre la pagina de editar la tutoria. En esta parte del código cargamos los datos de la tutoria en el formulario.
			if ( $rootScope.tipoUsuario == 'profesor'){
			    $http.post('php/apiEditTutoAlum.php', { id : $routeParams.idTuto })
			      .success(function(data) {
			          // here the data from the api is assigned to a variable named users
			          $scope.tutoModificada = data;
			      })
			      .error(function(data) {
			          console.log('Error: ' + data);
			      });
			}

			//Y por último, en esta función realizamos la modificación de la tutoria, mandando los datos a modificar en el post.
			$scope.EditTuto = function (tuto) {

				if (tuto.titulo == '' || tuto.descripcion == '' ||  tuto.fecha == '' || tuto.hora == ''){
				  alert('Recuerda. Debes rellenar todos los campos editables.');
				}
				else{

					swal({   
						title: "Vas a modificar una tutoria",   
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
								
								$http.post('php/apiUpdateTutoAlum.php', { id : tuto.id , titulo: tuto.titulo, estado: tuto.estado, descripcion: tuto.descripcion, fecha: tuto.fecha, hora: tuto.hora})
									.success(function(data) {
										/*console.log('Tutoria modificada. Id: ' + tuto.id + ', Titulo: ' + tuto.titulo + ', Descripcion: ' + tuto.descripcion + ', Fecha: ' + tuto.fecha + ', Hora: ' + tuto.hora + ', Estado: ' + tuto.estado +'.');*/										
										swal("Actualizada", "La tutoria ha sido actualizada en BBDD", "success"); 
										$location.url("/listtutoprofe");
									})
									.error(function(data) {
									  	console.log('Error: ' + data);
									});    
								  
							} 
							else {
								swal("Cancelado", "La tutoria no ha sido modificada", "error");	
							}
						}
					);
				}
			} 

			$scope.limpiarCourse = function(tutoModificada){
				$scope.tutoModificada.titulo = '';
				$scope.tutoModificada.descripcion = '';
				$scope.tutoModificada.fecha = '';
				$scope.tutoModificada.hora = '';
			}

		});
})();
