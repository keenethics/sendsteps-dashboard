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

    public function createQuestion($question, $sessionId) {
        $result = $this->insertOn(
            'survey_question',
            [
                'question' => $question->question,
                'survey_question_type_id' => $question->survey_question_type_id,
                'session_id' => $sessionId,
                'created_date_time' => gmdate('Y-m-d H:i:s \G\M\T'),
                'survey_id' => $question->survey_id,
                'status' => 0,
                'is_required' => $question->is_required,
                'order' => $question->order
            ] 
        );
        return $result;
    }

    public function updateQuestion($question) {

        $update = $this->database()->update(
            'survey_question',
            [
                'question' => $question->question,
                'is_required' => $question->is_required,
                'survey_question_type_id' => $question->survey_question_type_id,
                'order' => $question->order
            ],
            [
                'survey_question_id' => $question->survey_question_id
            ]
        );

        if($update->execute()) {
            return $question->survey_question_id;
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