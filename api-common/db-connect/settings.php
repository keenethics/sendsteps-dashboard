<?php
// define the core database connection info
define("DB_SERVER", "localhost");
define("DB_DATABASE", "addins");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "pass");
define("DB_PORT", 3306);
define("DB_TYPE", "mysql");
define("DB_TIMEZONE_OVERWRITE", ""); // Ensure that dates and times from the databases are always CET, this is used by the classes defined in mysql.inc.php 


// Define some additional options
define("DB_CHARSET", "utf8mb4"); // Make sure emojis render
define("DB_LOGGING", true); // Enable logging (Logging is disabled by default for better performance)
define("DB_COMMAND", "SET SQL_MODE=ANSI_QUOTES"); // Treat " as an identifier quote character (like the ` quote character) 