<?php
    require(__DIR__.'/../base/nova-api.php');
    class Survey extends NovaAPI {
        function getBeforeSession(){
            
            // $modelSurvey = new Survey();
            // $userSessions = Sessions::findUserSessionsByType(Yii::$app->user->identity->id);
            // $modelSurveyQuestions = SurveyQuestion::getSurveyBysessionId($userSessions->id);
            // $modelTabSettings = $this->findModelTabSettings($userSessions->id);
            // $modelTabSurvey = $this->findModelSurvey($userSessions->id);
            // $modelTabSurvey->setStatusSurvey($modelTabSurvey->status);

            // return $this->render('index', [
            //             'modelSurvey' => $modelSurvey,
            //             'modelTabSettings' => $modelTabSettings,
            //             'modelSurveyQuestion' => $modelSurveyQuestions,
            //             'modelTabSurvey' => $modelTabSurvey,
            // ]);
            
            
            // $results = $this->query('SELECT * FROM phonenumbers LEFT JOIN countries ON phonenumbers.countryIsoCode=countries.isoCode WHERE phonenumbers.isDeleted != 1;');
            // $return = array(
            //     'modelSurvey' => $modelSurvey,
            //     'modelTabSettings' => $modelTabSettings,
            //     'modelSurveyQuestion' => $modelSurveyQuestions,
            //     'modelTabSurvey' => $modelTabSurvey,
            // );
            // echo json_encode($return);
        }
    }