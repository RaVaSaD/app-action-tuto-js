(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('GetTutosController', function($scope, $http, $rootScope, $location, $route){

			init(); 

			//Cargamos todas las tutorias del usuario con el que accedemos.
			function init(){
			        
				if ( $rootScope.tipoUsuario == 'alumno'){
				    $http.post('php/apiTutoAlum.php', { usuario : $rootScope.idUsuario })
				      .success(function(data) {
				          //Se carga en el scope todas las tutorias de este alumno, y después en lisTutos.html se pinta con el ng-repeat.
				          $scope.tutos = data;
				      })
				      .error(function(data) {
				          console.log('Error: ' + data);
				      });
				}

			}

			//Esta función se ejecuta cuando pulsamos sobre editar en una de las tutorias. Utilizamos el $location para enviar el parametro de la ID de tutos, y el control lo toma el Controller "EditTuto"
			$scope.editarTuto = function (idTuto){
				$location.url("/edittuto/" + idTuto);
			}

			$scope.eliminarTuto = function (idTuto){

				swal({   
					title: "Vas a dar de baja una tutoria",   
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
							
							$http.post('php/apiDeleteTutoAlum.php', { id : idTuto })
						        .success(function(data) {

						            /*console.log('Tutoria eliminada. Id: ' + idTuto);*/
						            swal("Eliminada", "Tu tutoria ha sido eliminada de la BBDD", "success");
						            $route.reload();             
						        })
						        .error(function(data) {
						            console.log('Error: ' + data);
						        });    
							  
						} 
						else {
							swal("Cancelado", "Tu tutoria no ha sido dada de baja", "error");	
						}
					}
				); 
			}
		});
})();
