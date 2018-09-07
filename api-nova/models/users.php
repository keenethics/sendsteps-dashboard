<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Users_Model extends Model {
        function __construct (){
            $this->table = 'users';
        }


    }

?>