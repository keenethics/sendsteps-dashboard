<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Surveys_Model extends Model {
    public function getOverviewData($sessionId){
        $query='SELECT 
            s.survey_id as id,
            s.survey_name AS `name`,
            s.start_datetime,
            s.status
        FROM survey s   
        WHERE 
            <s.session_id> = :sessionId AND
            isDeleted = 0
        ;';
        $params['sessionId'] = $sessionId;
        $results = $this->query($query, $params);
        return $results;
    }
    
    public function getActiveById($id){
        $query='SELECT 
            *, survey_id as id
        FROM survey s
        WHERE 
            <s.survey_id> = :id AND
            isDeleted = 0
        ;';
        $params['id'] = $id;
        $results = $this->query($query, $params);
        return $results;    
    }
    
    public function getResultsOverviewData($sessionId){
        $query='SELECT
            s.survey_id as id, s.status, 
            sq.question, s.survey_name as `name`, 
            s.start_datetime, s.end_datetime, 
            COUNT(DISTINCT sqa.source) AS respondents
        FROM survey s
        LEFT JOIN survey_question sq 
            ON s.survey_id = sq.survey_id
        LEFT JOIN survey_question_answer sqa
            ON sq.survey_question_id = sqa.survey_question_id
        WHERE
            <s.session_id> = :sessionId
        GROUP BY
            s.survey_id
        ORDER BY 
            CASE WHEN `s`.`start_datetime` = "0000-00-00 00:00:00"  
                THEN `s`.`survey_id` 
                ELSE `s`.`start_datetime` 
            END DESC;';
        $params['sessionId'] = $sessionId;
        $results = $this->query($query, $params);
        return $results;
    }

    public function addSurvey($surveyName, $sessionId) {
        $insertedId = $this->insertOn(
            "survey", 
            [
                'survey_name' => $surveyName, 
                'start_datetime' => '0000-00-00 00:00:00',
                'end_datetime' => '0000-00-00 00:00:00',
                'created_datetime' => gmdate('Y-m-d H:i:s \G\M\T'),
                'session_id' => $sessionId,
                'survey_utc_timezone_id' => 0,
                'status' => 0,
                'server_start_datetime' => '0000-00-00 00:00:00',
                'server_end_datetime' => '0000-00-00 00:00:00',
                'isDeleted' => 0
            ]
        );
        return $this->getOverviewData($sessionId);
    }

    public function deleteSurvey($surveyId, $sessionId) {
        $result = $this->database()->update(
            'survey',
            [ 
                'isDeleted' => true,
                'dateDeleted' => gmdate('Y-m-d H:i:s \G\M\T')
            ],
            [ 'survey_id' => $surveyId ]
        );

        if($result->rowCount()) {
            return ['content' => $this->getOverviewData($sessionId)];
        }
        return ['error' => 'Unable to delete survey'];
    }

    public function updateSurveyNameById($surveyId, $surveyName) {
        $result = $this->database()->update(
            'survey',
            [ 
                'survey_name' => $surveyName,
            ],
            [ 
                'survey_id' => $surveyId 
            ]
        );
        return json_encode($result);
        if($result->rowCount()) {
            true;
        }
        return false;
    }

    public function updateSurveyStatus($surveyId, $fields) {
        $update = $this->database()->update(
            "survey",
            $fields,
            [
                "survey_id" => $surveyId
            ]
        );
        if($update->execute()) {
            return true;
        }
        return false;
    }

    public function stopAllSurveysBySessionId($sessionId) {
        $update = $this->database()->update(
            "survey",
            [
                // Stopped
                "status" => 2
            ],
            [
                "session_id" => $sessionId
            ]
        );
        return $update->execute();
    }

}