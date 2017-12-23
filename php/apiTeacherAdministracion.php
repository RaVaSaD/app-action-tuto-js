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
        $accion  = $request['accion'];        

        $log->LogInfo("ApiTeacherAdministracion -> Id del profesor que se va actualizar: ".$id);

        $database = new medoo([
        // required
        'database_type' => 'mysql',
        'database_name' => 'u525078941_bdtfg',
        'server' => 'localhost',
        'username' => 'usertfg',
        'password' => 'mypass',
        'charset' => 'utf8',
 
        ]);
        
        if ($accion == "activar"){
            
            $datas = $database->update(
                'users',
                array(
                    'estado' => 'A'
                ),[
                    "id" => $id
                  ]
            );
        }
        else if($accion == "desactivar"){
            $datas = $database->update(
                'users',
                array(
                    'estado' => 'D'
                ),[
                    "id" => $id
                  ]
            );
        }

        echo json_encode( $datas );

?>