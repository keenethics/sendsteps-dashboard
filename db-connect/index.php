
    <?php 
    
// echo file_exists(__DIR__."/inc/mysql.inc.php");
    // var_dump('Test');exit();
        include __DIR__."/inc/mysql.inc.php";
        $class = 'MySQL';
        if (!class_exists($class, false)) {
            var_dump("Unable to load class: $class");
        }
        $db = MySQL::GetConnection();

        $db->Prepare("SELECT `id`, `currentSessionId` FROM `Votes` WHERE `id` = ?");


        $db->BindValue(1, $voteId);
        $db->Execute();
        $row = $db->FetchRow();
    