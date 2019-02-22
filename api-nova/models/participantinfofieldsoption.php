<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Participantinfofieldsoption_Model extends Model {
    
    public function getByInfoFieldId($infoFieldId) {
        $result = $this->database()->select(
            'participantinfofieldsoption',
            "*",
            [
                'participantinfofieldsId' => $infoFieldId
            ]
        );
        if($result) {
            $optionArray = [];
            foreach($result as $option) {
                $optionArray[$option['id']] = $option['allowedValues'];
            }
            return $optionArray;
        }
        return [];
    }

    public function deleteOptions($infoFieldId) {
        $result = $this->database()->delete(
            'participantinfofieldsoption',
            [
                'participantinfofieldsId' => $infoFieldId
            ]
        );
        return $result;
    }

    public function addOptions($infoFieldId, $options) {
        $formattedOptions = [];
        foreach($options as $option) {
            if(strlen($option) > 0) {
                array_push($formattedOptions, [
                    'participantinfofieldsId' => $infoFieldId,
                    'allowedValues' => $option
                ]);
            }
        }
        $this->database()->insert(
            'participantinfofieldsoption',
            $formattedOptions
        );
    }
}