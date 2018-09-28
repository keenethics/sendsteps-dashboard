<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Translations_Model extends Model {
    public function findTranslations($languagesRequested = array()){
        if (count($languagesRequested) != 0){
            $query = "SELECT tk.id AS keyId, tk.text AS `key`, t.text, l.name AS `language` FROM translation_keys tk LEFT JOIN translations t ON t.keyId = tk.id LEFT JOIN languages l ON l.id = t.languageId WHERE <l.name> IN ( :langSet )";
            $params['langSet'] = "'".implode("','" , $languagesRequested) ."'";
            $results = $this->query($query, $params);      
        } else {
            //If no languages are specified, return them all
            // $keysQuery = "SELECT distinct t.key, t.text, l.name AS `language` FROM translations t LEFT JOIN languages l ON l.id = t.languageId" ;
            
            
            $query = "SELECT tk.id AS keyId, tk.text AS `key`, t.text, l.name AS `language` FROM translation_keys tk LEFT JOIN translations t ON t.keyId = tk.id LEFT JOIN languages l ON l.id = t.languageId" ;
            $results = $this->query($query);      
        }
        return $results;
    }
    
    public function findTranslationByKey($id){
        $query = 'SELECT id, keyword FROM phonenumberkeywords k WHERE <k.phoneNumberId> = :phoneNumberId;';
        $params['phoneNumberId'] = $id;
        $results = $this->query($query, $params);
        return $results;
    }
}