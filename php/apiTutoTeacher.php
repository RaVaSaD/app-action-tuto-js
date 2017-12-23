<?php

        require  'medoo/medoo.php';  
        require  'KLogger.php';

        $log = new KLogger ( "log.txt" , KLogger::DEBUG );      

        header("Content-Type: text/html; charset=utf-8");
        setlocale(LC_TIME, "es_ES.utf8");
        date_default_timezone_set('Europe/Madrid');

        $JSON     = file_get_contents("php://input");
    
        $request  = json_decode($JSON,true);

        $usuario  = $request['usuario'];

        $log->LogInfo("ApiTutoAlum -> Id de Usuario: ".$usuario);

        $database = new medoo([
        // required
        'database_type' => 'mysql',
        'database_name' => 'u525078941_bdtfg',
        'server' => 'localhost',
        'username' => 'usertfg',
        'password' => 'mypass',
        'charset' => 'utf8',
 
        ]);
        

        $datas = $database->query("SELECT tutos.id, tutos.titulo, teachers.nombre as nombre_prof, teachers.asignatura, tutos.descripcion, tutos.fecha, tutos.hora, alumns.nombre as nombre_al, tutos.estado
                FROM teachers, tutos, alumns, users 
                WHERE teachers.id = tutos.fk_id_teacher AND alumns.id = tutos.fk_id_alumns
                AND users.id = ".$usuario." AND teachers.uid = users.id")->fetchAll(PDO::FETCH_CLASS);

        echo json_encode( $datas );

?>