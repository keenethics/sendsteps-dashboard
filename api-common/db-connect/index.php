
    <?php 
        // $filepaths[] = __DIR__."/inc/settings.php";
        // $filepaths[] = __DIR__."/inc/mysql.inc.php";
        // foreach ($filepaths as $filepath){
            
        //     if (!file_exists($filepath)){
        //         var_dump("File $filepath does not exist");
        //     } else {
        //         require $filepath;    
        //     }
            
        // }
        // $class = 'MySQL';
        // if (!class_exists($class, false)) {
        //     var_dump("Unable to load class: $class");
        // } else {
            
            require __DIR__."/settings.php";
            require __DIR__."/mysql.inc.php";
            
            $db = MySQL::GetConnection();
            $db->Prepare("SELECT id FROM `users` WHERE `email` LIKE ?");
    
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
