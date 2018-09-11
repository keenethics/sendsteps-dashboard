<?php 
    require_once __DIR__.'/../../api-common/base/model.php';
s
    class Registration_Model extends Model {
        
        public function register($username, $password) {
            return true;
        }
    }