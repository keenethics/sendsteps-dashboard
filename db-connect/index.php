
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
    // var_dump('Test');exit();
        $class = 'MySQL';
        if (!class_exists($class, false)) {
            var_dump("Unable to load class: $class");
        } else {
            $db = MySQL::GetConnection();
        }

        // $db->Prepare("SELECT `id`, `currentSessionId` FROM `Votes` WHERE `id` = ?");


        // $db->BindValue(1, $voteId);
        // $db->Execute();
        // $row = $db->FetchRow();
    
?>
