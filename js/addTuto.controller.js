(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('AddTutoController', function($scope, $http, $routeParams, $rootScope, $location){

        	$scope.mascaraFecha = "99-99-9999";
        	$scope.mascaraHora = "99:99";

			$scope.tuto = {
				estado: "Pendiente",
				titulo: "",
				descripcion: "",
				fecha: "",
				hora: "",
				idProfe: $routeParams.idTeacher,				
				idAlumno: "" 				
			};

			$scope.datosProfe = {
				nombre_prof: $routeParams.nameTeacher + " " + $routeParams.apellTeacher,
				asignatura: $routeParams.asignatura,
			}
  			
			init();

        	function init() {
        		$http.post('php/apiNotaGetIdFkAlumn.php', { usuario : $rootScope.idUsuario })
					.success(function(data) {
						// here the data from the api is assigned to a variable named users
						$scope.tuto.idAlumno = data.fk_id_alumns;
						/*console.log("El id del alumno es: " +$rootScope.idUsuario + ", y su fk_id_alumns es: " + $scope.tuto.idAlumno);*/
					});
        	}

			$scope.AddTuto = function (tutoria) {				

				if (tutoria.titulo == "" || tutoria.descripcion == "" || tutoria.fecha == "" || tutoria.hora == ""){
					swal( "Cuidado", "Recuerda, rellena todos los campos del formulario.", "warning");
				}
				else{
					
					var fecha = componerFecha(tutoria.fecha);	
					var hora = componerHora(tutoria.hora);

					swal({   
						title: "Vas a dar de alta una tutoria",   
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
								
								$http.post('php/apiTutoPost.php', { estado: $scope.tuto.estado, titulo: tutoria.titulo, descripcion: tutoria.descripcion, fecha: fecha, hora: hora, fk_id_teacher: $scope.tuto.idProfe, fk_id_alumns: $scope.tuto.idAlumno } )
								.success(function(data) {
									// here the data from the api is assigned to a variable named users
									swal("Insertada", "Tu tutoría se queda pendiente de validación por el profesor", "success");
									/*console.log("Tutoria insertada con ID: " + data + ", Asignatura: " + $scope.datosProfe.asignatura + ", Titulo: " + $scope.tuto.titulo + ", Estado: " + $scope.tuto.estado +  ", Descripción: " + $scope.tuto.descripcion + ", IdProfe: " + $scope.tuto.idProfe + ", Profesor: " + $scope.datosProfe.nombre_prof + ", Fecha: " + fecha + ", Hora: " + hora + ", idAlumno: " + $scope.tuto.idAlumno); */
									$location.url("/listtuto");
								});     
								  
							} 
							else {
								swal("Cancelado", "Tu tutoría no ha sido insertada", "error");	
							}
						}
					);
				}							    
			}

			$scope.limpiarTuto = function(tuto){
				$scope.tuto.titulo = "";
				$scope.tuto.descripcion = "";
				$scope.tuto.fecha = "";
				$scope.tuto.hora = "";
			}

			function componerFecha(fecha){

				var dia = fecha.substring(0,2);
				var mes = fecha.substring(2,4);
				var ano = fecha.substring(4,8);
				var fecha = dia + "-" + mes + "-" + ano;
				return fecha;
			}

			function componerHora(hora){

				var horas = hora.substring(0,2);
				var minutos = hora.substring(2,4);
				
				var hora = horas + ":" + minutos;
				return hora;
			}

		});
})();
