<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Registration_Model extends Model {
        
        public function register($username, $password) {
            // Gotta check out registration pipeline from old dashboard.
            // It's pretty complex (Mailing, Zoho, DB->account/user/session)
            return true;
        }
    }