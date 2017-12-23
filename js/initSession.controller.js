(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('initSessionController', function($rootScope, $scope, $http, loginFactory, $location){

		    $scope.formData = {}; //Objeto formData que guarda los datos del formulario
		    $scope.rsJSON = [ ]; //Array que contiene JSON
		    $scope.idUsuario = '';

		    // Ocultamos los divs de Alertas
		    $scope.alertaLoginCorrecto = true;
		    $scope.alertaLoginError    = true;

		    //Div de alerta de usuario pendiente de validar por administrador
		    $scope.alertaLoginProfeDes    = true;

		    $rootScope.tipoUsuario = "";

		    
		    // obtenemos el evento submit del formulario ng-submit="entrar()"
		    $scope.entrar = function(formData) {
		      	consultarUsuario(formData);
		    };
		    
		    // obtenemos el evento click del boton limpiar ng-click="limpiar()"
		    $scope.limpiar = function() {
		      	limpiarForm();
		    };

		    $scope.registrarse = function(){
		    	$location.url("/registro");
		    }

		    function limpiarForm(){
				$scope.alertaLoginError    = true;   
				$scope.alertaLoginCorrecto = true;   
				$scope.formData.email    = '';
				$scope.formData.password = '';   
		    }

		    function consultarUsuario(formData){
		      $http.post('./php/inicio.php',{ email : formData.email , password : formData.password })
		        .success(function(data) {
					// No existe el usuario y nos muestra un alerta de error.
					if (typeof(data.email) == "undefined"){             
						$scope.alertaLoginError = false;   
						$scope.alertaLoginCorrecto = true;   
						formData.email    = '';
						formData.password = '';   
					}else{
						// Existe el usuario, accede a la sesión y nos pone un mensaje de bienvenida
						/*console.log('USUARIO: id: ' + data.id + ', tipo: ' + data.tipo + ', email: ' + data.email + ', password: ' + data.password + ', estado: ' + data.estado);*/             
						
						if ( data.estado === 'A'){
							loginFactory.putValor(true);
							$rootScope.login = loginFactory.getValor();             
							$rootScope.idUsuario = data.id;
							$rootScope.emailUsuario = data.email;
							$rootScope.tipoUsuario = data.tipo;
							$scope.rsJSON = data.email;
							$scope.alertaLoginCorrecto = false;            
							$scope.alertaLoginError = true;	
						}
						else if ( data.estado === 'D'){
							$scope.alertaLoginProfeDes  = false;												   
						}
					}
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
		        });   		        
			}

		});
})();
