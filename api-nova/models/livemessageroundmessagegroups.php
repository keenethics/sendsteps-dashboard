<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Livemessageroundmessagegroups_Model extends Model {

    public function getGroupsByUserId($userId) {
        $groups = $this->database()->select(
            "livemessageroundmessagegroups",
            "*",
            ["userId" => $userId]
        );
        foreach($groups as $group) {
            $assocGroups[$group['id']] = ["name" => $group['name'], "color" => $group['color']]; 
        }
        return $assocGroups;
    }

}