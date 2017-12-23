<?php

        //Se utiliza en registro.controller.js y es para el registro en la tabla teachers

        require  'medoo/medoo.php';  
        require  'KLogger.php';

        $log = new KLogger ( "log.txt" , KLogger::DEBUG );      

        header("Content-Type: text/html; charset=utf-8");
        setlocale(LC_TIME, "es_ES.utf8");
        date_default_timezone_set('Europe/Madrid');

        $JSON     = file_get_contents("php://input");

        $request  = json_decode($JSON,true);

        $uid  = $request['uid'];
        $nombre  = $request['nombre'];
        $apellidos  = $request['apellidos'];        
        $asignatura  = $request['asignatura'];
        $telefono  = $request['telefono'];
        $despacho  = $request['despacho'];
        $horario_tutos  = $request['horario_tutos'];
      

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
            'teachers', [
                'uid' => $uid,
                'nombre' => $nombre,
                'apellidos' => $apellidos,
                'asignatura' => $asignatura,
                'telefono' => $telefono,
                'despacho' => $despacho,
                'horario_tutos' => $horario_tutos
        ]);

        echo json_encode( $datas );

        $log->LogInfo("ApiRegistro -> UID del profe que se va a insertar: ".$uid." y su ID: ".$datas);

?>