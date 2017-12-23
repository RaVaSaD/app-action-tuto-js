<?php

        //Se utiliza en registro.controller.js

        require  'medoo/medoo.php';  
        require  'KLogger.php';

        $log = new KLogger ( "log.txt" , KLogger::DEBUG );      

        header("Content-Type: text/html; charset=utf-8");
        setlocale(LC_TIME, "es_ES.utf8");
        date_default_timezone_set('Europe/Madrid');

        $JSON     = file_get_contents("php://input");

        $request  = json_decode($JSON,true);

        $email  = $request['email'];
        $password  = $request['password'];
        $tipo  = $request['tipo'];        
        $estado  = $request['estado'];
      

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
            'users', [
                'email' => $email,
                'password' => $password,
                'tipo' => $tipo,
                'estado' => $estado
        ]);

        echo json_encode( $datas );

        $log->LogInfo("ApiRegistro -> Email del usuario que se va a insertar: ".$email." y su ID: ".$datas);

?>