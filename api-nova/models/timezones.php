<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Timezones_Model extends Model {
    
    public function getTimezoneList() {
        $result = $this->database()->select(
            'timezones',
            [
                'id',
                'identifier'
            ],
            [
                'ORDER' => [
                    'identifier' => 'ASC'
                ]
            ]
        );

        return $result;
    }
}