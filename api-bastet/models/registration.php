<?php 
    require_once __DIR__.'/../base/model.php';

    class Registration_Model extends Model {
        
        public function register($username, $password) {
            return true;
        }
    }