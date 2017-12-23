(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('EditTutoController', function($scope, $http, $rootScope, $routeParams, $location){
  
        	$scope.mascaraFecha = "99-99-9999";
        	$scope.mascaraHora = "99:99";

			//Una vez que hemos pulsado editar, se abre la pagina de editar la tutoria. En esta parte del código cargamos los datos de la tutoria en el formulario.
			if ( $rootScope.tipoUsuario == 'alumno'){
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

					var fecha = componerFecha(tuto.fecha);	
					var hora = componerHora(tuto.hora);	
					/*console.log(tuto.fecha + "-" + tuto.hora + "---" + fecha + "-" + hora );*/

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
								
								$http.post('php/apiUpdateTutoAlum.php', { id : tuto.id , titulo: tuto.titulo, estado: tuto.estado, descripcion: tuto.descripcion, fecha: fecha, hora: hora})
									.success(function(data) {
										/*console.log('Tutoria modificada. Id: ' + tuto.id + ', Titulo: ' + tuto.titulo + ', Descripcion: ' + tuto.descripcion + ', Fecha: ' + tuto.fecha + ', Hora: ' + tuto.hora + ', Estado: ' + tuto.estado +'.');*/										
										swal("Actualizada", "Tu tutoria ha sido actualizada en BBDD", "success"); 
										$location.url("/listtuto");
									})
									.error(function(data) {
									  	console.log('Error: ' + data);
									});    
								  
							} 
							else {
								swal("Cancelado", "Tu tutoria no ha sido modificada", "error");	
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

			function componerFecha(fecha){

				//Compruebo si el usuario modifica la fecha y lo controlo de esta forma. Si no modifica, viaja la fecha todo seguido, y si lo modifica viene separado por guiones.
				if (fecha.charAt(2) != "-"){
					var dia = fecha.substring(0,2);
					var mes = fecha.substring(2,4);
					var ano = fecha.substring(4,8);
					var fecha = dia + "-" + mes + "-" + ano;
				}
				return fecha;
			}

			function componerHora(hora){

				//Compruebo si el usuario modifica la hora y lo controlo de esta forma.
				if (hora.charAt(2) != ":"){
					var horas = hora.substring(0,2);
					var minutos = hora.substring(2,4);
					var hora = horas + ":" + minutos;
				}
				return hora;
			}

		});
})();
