
    <?php 
    
echo file_exists(__DIR__."/inc/mysql.inc.php");
    var_dump('Test');exit();
        require __DIR__."/inc/mysql.inc.php";
        
        $db = MySQL::GetConnection();

        $db->Prepare("SELECT `id`, `currentSessionId` FROM `Votes` WHERE `id` = ?");


        $db->BindValue(1, $voteId);
        $db->Execute();
        $row = $db->FetchRow();
    