
    <?php 
    
        require __DIR__."/inc/mysql.inc.php";
        
        var_dump('Test');exit();
        $db = MySQL::GetConnection();

        $db->Prepare("SELECT `id`, `currentSessionId` FROM `Votes` WHERE `id` = ?");


        $db->BindValue(1, $voteId);
        $db->Execute();
        $row = $db->FetchRow();
    