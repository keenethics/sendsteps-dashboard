<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Livemessageroundmessagegroups_Model extends Model {

    public function getGroupsByUserId($userId) {
        $groups = $this->database()->select(
            "livemessageroundmessagegroups",
            "*",
            ["userId" => $userId]
        );
        $assocGroups = array();
        foreach($groups as $group) {
            $assocGroups[$group['id']] = ["name" => $group['name'], "color" => $group['color']]; 
        }
        return $assocGroups;
    }

    public function removeGroup($userId, $groupId) {
        $query = $this->database()->delete(
            "livemessageroundmessagegroups",
            [
                "AND" => [
                    "id" => $groupId,
                    "userId" => $userId
                ]
            ]
        );
        if($query->execute()) {
            return $groupId;
        }
        return false;
    }

    public function addGroup($userId, $groupName, $color) {
        $insertedGroupId = $this->insertOn(
            "livemessageroundmessagegroups",
            [
                "userId" => $userId,
                "name" => $groupName,
                "color" => $color
            ]
        );
        return $this->database()->select(
            "livemessageroundmessagegroups", 
            "*", 
            ["id" => $insertedGroupId])[0];
    }
}