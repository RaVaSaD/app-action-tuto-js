<?php

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
        $estado  = $request['estado'];
        $descripcion  = $request['descripcion'];
        $fecha  = $request['fecha'];
        $hora  = $request['hora'];

        $log->LogInfo("ApiUpdateTutoAlum -> Id de la Tutoria que se va a actualizar: ".$id);

        $database = new medoo([
        // required
        'database_type' => 'mysql',
        'database_name' => 'u525078941_bdtfg',
        'server' => 'localhost',
        'username' => 'usertfg',
        'password' => 'mypass',
        'charset' => 'utf8',
 
        ]);
        

        $datas = $database->update(
            'tutos',
            array(
                'titulo' => $titulo,
                'estado' => $estado,
                'descripcion' => $descripcion,
                'fecha' => $fecha,
                'hora' => $hora
            ),[
                "id" => $id
              ]
        );

        echo json_encode( $datas[0] );

?>