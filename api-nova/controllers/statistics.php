<?php
require_once __DIR__.'/../base/nova-api.php';

class Statistics extends NovaAPI {
    public function getDetails($id) {
        if($id != NULL){
            $model = $this->loadModel('statistics');
            $emails = array(
                'frieslandcampina.com'
            );
            $rows = $model->findDataForEmailsLike($email);
            $totals = array();
            $totals['Votes'] = $totals['Messages'] = $totals['Session Runs'] = 0;
            foreach ($rows as $r){
                $totals['Votes'] += (int) $r['Votes'];
                $totals['Messages'] += (int) $r['Messages'];
                $totals['Session Runs'] += (int) $r['Session Runs'];
            }
            $totals['Email'] = 'Total:';
            $rows[] = $totals;
            return json_encode(['content' => $rows]);
        }
        return false;
    }
    
    public function getOverview(){
        $model = $this->loadModel('statistics');
        $results = $model->listReports();
        return json_encode(['content' => $results]);
    }
        
}