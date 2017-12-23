(function() {
    'use strict';

    angular
        .module('actionTuto')
        .controller('registroController', function($scope, $http, $location){

        	var idUser = null;

		    $scope.usuario = {
		    	email: "",
		    	password: "",
		    	tipo: "", 
		    	estado:""
		    };

		    $scope.alumno = {
		    	uid: "",
		    	nombre: "",
		    	apellidos: "", 
		    	matricula:"",
		    	telefono: ""
		    };

		    $scope.profesor = {
		    	uid: "",
		    	nombre: "",
		    	apellidos: "", 
		    	asignatura: "",
		    	telefono: "",
		    	despacho: "", 
		    	horario_tutos:""
		    };

		    //Alerta que se muestra cuando existe el usuario
		    $scope.alertaRegistroError = false;

		    //Con esto hago que aparezca el formulario del alumno o del profe
		    $scope.formulariosRegistro = true;

		    //Con esto muestro el formulario inicial
		    $scope.formularioInicial = false;

		    //Alertas para el registro del usuario		    
		    $scope.alertaRegistroUsuarioExito = false;
		    $scope.alertaRegistroUsuarioAceptar = false;


		   	//Alerta de usuario pendiente de validar por administrador
		    $scope.alertaRegistroProfeAceptar = false;
		    $scope.alertaRegistroProfeExito = false;

		    $scope.registro = function(usuario){		    	

		    	$http.post('./php/apiRegistroComprobacionUser.php',{ email : usuario.email })
		        .success(function(data) {
					// En el registro, cuando no existe el usuario, si es Profesor se queda 'P' de pendiente de autorizar, si es Alumno se queda 'A' de activo.
					if (data.length === 0){             
						/*console.log('NO Existe el usuario');*/
						if (usuario.tipo == "alumno"){
							usuario.estado = 'A';
							/*console.log("Email: " + usuario.email + ", password: " + usuario.password + ", tipo: " + usuario.tipo + ", estado: " + usuario.estado);*/

							$http.post('./php/apiRegistro.php', usuario )
		        				.success(function(data) {
		        					 /*console.log('Exito: ' + data);*/
		        					 idUser = data;		        					 
		        					 $scope.formularioInicial = true;
		        					 $scope.alertaRegistroUsuarioExito = true;
		        				})
		        				.error(function(data) {
						            console.log('Error: ' + data);
						        });

						}else if (usuario.tipo == "profesor"){
							usuario.estado = 'D';
							/*console.log("Email: " + usuario.email + ", password: " + usuario.password + ", tipo: " + usuario.tipo + ", estado: " + usuario.estado);*/

							$http.post('./php/apiRegistro.php', usuario )
		        				.success(function(data) {
		        					 /*console.log('Exito: ' + data);*/
		        					 idUser = data;
		        					 $scope.formularioInicial = true;		        					 
		        					 $scope.alertaRegistroProfeExito = true;
		        				})
		        				.error(function(data) {
						            console.log('Error: ' + data);
						        });
						}

					}else{
						// Existe el usuario
						/*console.log('Existe el usuario');*/
						$scope.alertaRegistroError = true;             
						  
					}
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
		        });
		    }

		    $scope.datosAlumno = function(alumno){
		    	/*console.log('Estoy en alumno con id de de la tabla User: ' + idUser);*/
		    	idUser = replaceAll( idUser, '"', '' );
		    	alumno.uid = idUser;

		    	$http.post('./php/apiRegistroAlumno.php', alumno )
    				.success(function(data) {
    					console.log(data);    					 
    				})
    				.error(function(data) {
			            console.log('Error: ' + data);
			        });

		    	$scope.alertaRegistroUsuarioAceptar = true;
		    	$scope.formulariosRegistro = false;
		    }

		    $scope.datosProfe = function(profe){
		    	/*console.log('Estoy en profe con id de de la tabla User: ' + idUser);*/
		    	idUser = replaceAll( idUser, '"', '' );

		    	$http.post('./php/apiRegistroProfe.php', { uid: idUser, nombre: profe.nombre, apellidos: profe.apellidos, asignatura: profe.asignatura, telefono: profe.telefono, despacho: profe.despacho, horario_tutos: profe.horario_tutos } )
    				.success(function(data) {
    					 console.log(data);
    				})
    				.error(function(data) {
			            console.log('Error: ' + data);
			        });

		    	$scope.alertaRegistroProfeAceptar = true;
		    	$scope.formulariosRegistro = false;
		    }
		    //Esta función sirve para quitar las comillas del idUser.
		    function replaceAll( text, busca, reemplaza ){
			  	while (text.toString().indexOf(busca) != -1)
			    	text = text.toString().replace(busca,reemplaza);

				return text;
			}
		    
		});
})();