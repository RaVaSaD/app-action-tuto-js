<?php
    
        //Se utiliza en getNota.controller.js para obtener el id del alumno

        require  'medoo/medoo.php';
        require  'KLogger.php';

        $log = new KLogger ( "log.txt" , KLogger::DEBUG );  

        header("Content-Type: text/html; charset=utf-8");
        setlocale(LC_TIME, "es_ES.utf8");
        date_default_timezone_set('Europe/Madrid');

        $JSON     = file_get_contents("php://input");
    
        $request  = json_decode($JSON,true);

        $usuario  = $request['usuario'];

        $log->LogInfo("ApiNotaGet -> Id del Usuario: ".$usuario);

        $database = new medoo([
        // required
        'database_type' => 'mysql',
        'database_name' => 'u525078941_bdtfg',
        'server' => 'localhost',
        'username' => 'usertfg',
        'password' => 'mypass',
        'charset' => 'utf8',
 
        ]);

        //$datas = $database->select("notes", "*");

        $datas = $database->query("SELECT notes.id, notes.titulo, notes.descripcion, notes.asignatura, notes.tipo, notes.fk_id_alumns
                                   FROM users,alumns,notes 
                                   WHERE users.id=alumns.uid and alumns.id=notes.fk_id_alumns and users.id=".$usuario."")->fetchAll(PDO::FETCH_CLASS);

        echo json_encode( $datas );        

?>
