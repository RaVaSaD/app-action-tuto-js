<?php
        
        require  'medoo/medoo.php';

        header("Content-Type: text/html; charset=utf-8");
        setlocale(LC_TIME, "es_ES.utf8");
        date_default_timezone_set('Europe/Madrid');

        $database = new medoo([
        // required
        'database_type' => 'mysql',
        'database_name' => 'u525078941_bdtfg',
        'server' => 'localhost',
        'username' => 'usertfg',
        'password' => 'mypass',
        'charset' => 'utf8',
 
        ]);

        //$datas = $database->select("teachers", "*");

        $datas = $database->query("SELECT t.id, t.uid, t.nombre, t.apellidos, t.asignatura, t.telefono, t.despacho, u.email, t.horario_tutos, u.estado  
                FROM users u, teachers t
                WHERE t.uid = u.id")->fetchAll(PDO::FETCH_CLASS);

        echo json_encode( $datas );

?>