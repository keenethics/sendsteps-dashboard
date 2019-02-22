<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Surveyquestions_Model extends Model {

    public function getById($id) {
        $surveyQuestion = $this->database()->select(
            'survey_question',
            "*",
            ['survey_question_id' => $id]
        );
        return $surveyQuestion;
    }

    public function createQuestion(...$params) {
        [ $surveyQuestionName, $surveyTypeId, $isRequired, $surveyId, $order, $sessionId ] = $params;
        $result = $this->insertOn(
            'survey_question',
            [
                'question' => $surveyQuestionName,
                'survey_question_type_id' => $surveyTypeId,
                'session_id' => $sessionId,
                'created_date_time' => gmdate('Y-m-d H:i:s \G\M\T'),
                'survey_id' => $surveyId,
                'status' => 0,
                'is_required' => $isRequired,
                // Fix order somehow
                'order' => $order
            ] 
        );
        return $result;
    }

    public function updateQuestion(...$params) {

        [  $surveyQuestionId, $surveyQuestionName, $surveyTypeId, $isRequired, $order ] = $params;

        $update = $this->database()->update(
            'survey_question',
            [
                'question' => $surveyQuestionName,
                'is_required' => $isRequired,
                'survey_question_type_id' => $surveyTypeId,
                'order' => $order
            ],
            [
                'survey_question_id' => $surveyQuestionId
            ]
        );

        if($update->execute()) {
            return $surveyQuestionId;
        }
        return false;
    }

    public function deleteQuestion($surveyQuestionId) {
        $result = $this->database()->delete(
            'survey_question',
            [
                'survey_question_id' => $surveyQuestionId
            ]
        );

        if($result->execute()) {
            return $surveyQuestionId;
        }
        return false;
    }

    public function getBySurveyId($surveyId) {
        $result = $this->database()->select(
            'survey_question',
            '*',
            [ 'survey_id' => $surveyId ]
        );

        return $result;
    }

    public function updateOrder($idsAndOrder) {

        for($counter = 0; $counter < count($idsAndOrder); $counter++) {
            $result = $this->database()->update(
                'survey_question',
                [ 'order' => $counter + 1 ],
                [ 'survey_question_id' => $idsAndOrder[$counter] ]
            );
            if(!$result->execute()) {
                return false;
            }
        }
        return true;
    }
}