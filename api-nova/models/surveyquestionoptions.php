<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Surveyquestionoptions_Model extends Model {

    public function getByQuestionId($surveyQuestionId) {
        $result = $this->database()->select(
            'survey_question_option',
            "*",
            [
                'survey_question_id' => $surveyQuestionId
            ]
        );
        if($result) {
            $optionArray = [];
            foreach($result as $option) {
                $optionArray[$option['survey_question_option_id']] = $option['option'];
            }
            return $optionArray;
        }
        return [];
    }

    public function formatMultipleChoiceOptions($surveyQuestionId, $surveyQuestionOptions) {
        $options = [];
        foreach($surveyQuestionOptions as $key => $option) {
            if(strlen($option) > 0) {
                array_push($options, [
                    'option' => $option,
                    'survey_question_id' => $surveyQuestionId
                ]);
            }
        }
        return $options;
    }
    
    public function formatCheckboxOptions($surveyQuestionId, $surveyQuestionOptions) {
        $options = [];
        foreach($surveyQuestionOptions as $key => $option) {
            if(strlen($option) > 0) {
                array_push($options, [
                    'option' => $option,
                    'survey_question_id' => $surveyQuestionId
                ]);
            }
        }
        return $options;
    }

    public function formatScaleOptions($surveyQuestionId, $surveyQuestionOptions) {

        $prefix = '######';

        $values =  array_values((array) $surveyQuestionOptions);

        $scaleNumbers = '1'.$prefix.$values[2].$prefix;
        $scaleOptions = $values[0].$prefix.$values[1];

        return  [
            'option' => $scaleNumbers.$scaleOptions,
            'survey_question_id' => $surveyQuestionId
        ];
    }

    public function formatExplanationTextOption($surveyQuestionId, $surveyQuestionOptions) {
        return [
            'option' => array_values((array) $surveyQuestionOptions)[0],
            'survey_question_id' => $surveyQuestionId
        ];
    }

    public function formatByType($surveyQuestionId, $surveyTypeId, $surveyQuestionOptions) {
        switch($surveyTypeId) {
            // 3 = MPC
            case 3: {
                return $this->formatMultipleChoiceOptions($surveyQuestionId, $surveyQuestionOptions);
            }
            // 4 = Checkbox
            case 4: {
                return $this->formatCheckboxOptions($surveyQuestionId, $surveyQuestionOptions);
            }
            // 5 = Scale
            case 5: {
                return $this->formatScaleOptions($surveyQuestionId, $surveyQuestionOptions);
            }
            // 6 = Explanation text
            case 6: {
                return $this->formatExplanationTextOption($surveyQuestionId, $surveyQuestionOptions);
            }
            default: {
                return NULL;
            }
        }
    }

    public function addOptions($surveyQuestionId, $surveyTypeId, $surveyQuestionOptions) {
        $this->database()->insert(
            'survey_question_option',
            $this->formatByType($surveyQuestionId, $surveyTypeId, $surveyQuestionOptions)
        );
    }

    public function deleteOptions($surveyQuestionId) {
        $result = $this->database()->delete(
            'survey_question_option',
            [
                'survey_question_id' => $surveyQuestionId
            ]
        );
        return $result;
    }
}