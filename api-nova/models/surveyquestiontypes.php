<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Surveyquestiontypes_Model extends Model {

    public function getAllTypes() {
        $result = $this->database()->select(
            'survey_question_type',
            '*'
        );
        return $result;
    }
}