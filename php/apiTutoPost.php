<?php

        //Se utiliza en addNota.controller.js para obtener el id del alumno

        require  'medoo/medoo.php';  
        require  'KLogger.php';

        $log = new KLogger ( "log.txt" , KLogger::DEBUG );      

        header("Content-Type: text/html; charset=utf-8");
        setlocale(LC_TIME, "es_ES.utf8");
        date_default_timezone_set('Europe/Madrid');

        $JSON     = file_get_contents("php://input");

        $request  = json_decode($JSON,true);

        $estado  = $request['estado'];
        $titulo  = $request['titulo'];
        $descripcion  = $request['descripcion'];        
        $fecha  = $request['fecha'];
        $hora  = $request['hora'];        
        $fk_id_teacher  = $request['fk_id_teacher'];        
        $fk_id_alumns  = $request['fk_id_alumns'];        

        $database = new medoo([
        // required
        'database_type' => 'mysql',
        'database_name' => 'u525078941_bdtfg',
        'server' => 'localhost',
        'username' => 'usertfg',
        'password' => 'mypass',
        'charset' => 'utf8',
 
        ]);

        //REVISAR LA INSERCION CON ID      

        $datas = $database->insert(
            'tutos', [
                'estado' => $estado,
                'titulo' => $titulo,
                'descripcion' => $descripcion,
                'fecha' => $fecha,
                'hora' => $hora,
                'fk_id_teacher' => $fk_id_teacher,
                'fk_id_alumns' => $fk_id_alumns
        ]);

        echo json_encode( $datas );

        $log->LogInfo("ApiPostNota -> Titulo de la Nota que se va a insertar: ".$titulo." y su ID: ".$datas);

?>