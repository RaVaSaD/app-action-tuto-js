(function(){
	'use strict';

	angular.module('actionTuto')
	.config(function($routeProvider) {

		$routeProvider
			.when('/', {
			  templateUrl: 'vistas/sesion.html',
			  controller: 'initSessionController'
			})
			.when('/registro', {
			  templateUrl: 'vistas/registro.html',
			  controller: 'registroController'
			})
			.when('/salir', {
			  templateUrl: 'vistas/finsesion.html',
			  controller: 'exitSessionController'
			})
			.when('/activarprofesores', {
			  templateUrl: 'vistas/activarprofesores.html',
			  controller: 'activarProfesoresController'
			})
			.when('/listarprofesores', {
			  templateUrl: 'vistas/listarprofesores.html',
			  controller: 'listarProfesoresController'
			})
			.when('/listteachers', {
					templateUrl: 'vistas/listTeachers.html', 
					controller: 'GetTeachersController'
			})
			.when('/listtuto', {
			  templateUrl: 'vistas/listTutos.html', 
			  controller: 'GetTutosController'
			})
			.when('/listtutoprofe', {
			  templateUrl: 'vistas/listtutosprofes.html', 
			  controller: 'GetTutosProfesController'
			})
			.when('/addtuto/:idTeacher/:nameTeacher/:apellTeacher/:asignatura', {
					templateUrl: 'vistas/addtuto.html',
					controller: 'AddTutoController'
			})
			.when('/edittuto/:idTuto', {
			  templateUrl: 'vistas/edittuto.html',
			  controller: 'EditTutoController'
			})
			.when('/edittutoprofes/:idTuto', {
			  templateUrl: 'vistas/edittutoprofe.html',
			  controller: 'EditTutoProfesController'
			})
			.when('/addnota', {
			  templateUrl: 'vistas/addnota.html',
			  controller: 'AddNotaController'
			})
			.when('/editnota/:idNota', {
			  templateUrl: 'vistas/editnota.html',
			  controller: 'EditNotaController'
			})
			.when('/listnotes', {
			  templateUrl: 'vistas/listNotes.html', 
			  controller: 'GetNotesController'
			})
			.when('/about', {
			  templateUrl: 'vistas/about.html'          
			})
			.when('/perfil', {
			  templateUrl: 'vistas/perfil.html', 
			  controller: 'GetPerfilController'
			})
			.otherwise({
				redirectTo: '/'
			});
		})
		.run(function($rootScope) {
		    $rootScope.login = false;
		    $rootScope.idUsuario = 0;
		    $rootScope.emailUsuario = '';
		    $rootScope.tipoUsuario = '';
		})
		.factory('loginFactory', function(){
    
		    var login = false;
		    var interfaz = {        
		        getValor: function(){
		            return login;
		        },
		        putValor: function(valor){
		            login = valor;
		        }
		    }
		    return interfaz;
		});

})();