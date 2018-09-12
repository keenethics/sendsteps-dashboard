<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Surveys_Model extends Model {
        function getOverviewData($sessionId){
            $query='SELECT
                s.survey_id, s.status, 
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
    }
?>