<?php
    
        //Se utiliza en editNota.controller.js para actualizar la nota del alumno

        require  'medoo/medoo.php';
        require  'KLogger.php';

        $log = new KLogger ( "log.txt" , KLogger::DEBUG );  

        header("Content-Type: text/html; charset=utf-8");
        setlocale(LC_TIME, "es_ES.utf8");
        date_default_timezone_set('Europe/Madrid');

        $JSON     = file_get_contents("php://input");
    
        $request  = json_decode($JSON,true);

        $id  = $request['id'];
        $titulo  = $request['titulo'];
        $descripcion  = $request['descripcion'];
        $asignatura  = $request['asignatura'];
        $tipo  = $request['tipo'];
        $fk_id_alumns = $request['fk_id_alumns'];

        $log->LogInfo("ApiNotaEdit -> El Id de la nota que va a actualizar editar: ".$id);

        $database = new medoo([
        // required
        'database_type' => 'mysql',
        'database_name' => 'u525078941_bdtfg',
        'server' => 'localhost',
        'username' => 'usertfg',
        'password' => 'mypass',
        'charset' => 'utf8',
 
        ]);

        $datas = $database->query("UPDATE notes SET titulo='".$titulo."', descripcion='".$descripcion."', asignatura='".$asignatura."', tipo='".$tipo."', fk_id_alumns='".$fk_id_alumns."' WHERE id='".$id."'");

        echo json_encode( $datas );        

?>