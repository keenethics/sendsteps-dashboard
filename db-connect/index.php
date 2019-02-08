
    <?php 
        $filepaths[] = __DIR__."/inc/settings.php";
        $filepaths[] = __DIR__."/inc/mysql.inc.php";
        foreach ($filepaths as $filepath){
            
            if (!file_exists($filepath)){
                var_dump("File $filepath does not exist");
            } else {
                include $filepath;    
            }
            
        }
        // $class = 'MySQL';
        // if (!class_exists($class, false)) {
        //     var_dump("Unable to load class: $class");
        // } else {
            $db = MySQL::GetConnection();
            $db->Prepare("SELECT * FROM `users` WHERE `email` LIKE ?");
    
            $email = 'john.wheatley@sendsteps.com';
            $db->BindValue(1, $email);
            $db->Execute();
            $results = $db->FetchRow();
            var_dump($results);
        // }

        // $db->Prepare("SELECT `id`, `currentSessionId` FROM `Votes` WHERE `id` = ?");


        // $db->BindValue(1, $voteId);
        // $db->Execute();
        // $row = $db->FetchRow();
    
?>
