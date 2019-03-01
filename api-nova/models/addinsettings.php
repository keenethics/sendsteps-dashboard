<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Addinsettings_Model extends Model {

    public function getWebsiteAddressById($id) {
        return $this->database()->get(
            'addinsettings',
            [ 'websiteAddress' ],
            [ 'id' => $id ]
        );
    }
}