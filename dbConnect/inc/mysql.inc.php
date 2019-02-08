<?php
	/**
	 * Wrapper class around the PDO class.
	 */
	class MySQL
	{
        /** @var \PDO $pdo */
		private $pdo;
        /** @var \PDOStatement $ps */
		private $ps;

		function __construct($server, $username, $password, $databaseName)
		{

			$this->pdo = 0;
			$this->ps = 0;
			
			$this->Init($server, $username, $password, $databaseName);
		}
		
		function __destruct()
		{
            if($this->ps !== 0)
            {
                $this->ps->closeCursor();
            }

            $this->ps = null;
            $this->pdo = null;
		}

		/**
		 * Creates new connection to the MySQL database
		 * @return \MySQL the new connection
		 */
		public static function GetConnection()
		{
			return new MySQL(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
		}
		
		/**
		 * Connects to the given database.
		 * 
		 * @param string $server address of the database server
		 * @param string $username database username
		 * @param string $password database password
		 * @param string $databaseName database name
		 */
		public function Init($server, $username, $password, $databaseName)
		{
			$this->pdo = new PDO("mysql:host=" . $server. ";dbname=" . $databaseName, $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8MB4'"));
			
			if (DB_TIMEZONE_OVERWRITE != "")
			{
				$this->Prepare("SET time_zone = '" . DB_TIMEZONE_OVERWRITE . "'");
				$this->Execute();
			}
		}
		
		/**
		 * Prepares a statement with the given query.
		 * 
		 * @param string $query the query string
		 * @throws Exception
		 */
		public function Prepare($query)
		{
			$this->ps = $this->pdo->prepare($query);
			if ($this->ps === FALSE)
				throw new Exception("Preparing statement has failed. Error info: " . print_r($this->pdo->errorInfo(), true));
		}

        /**
         * Binds a value to the prepared statement.
         *
         * @param int|string $param index or parameter placeholder name
         * @param int|string $value the value to be bound
         * @param int $data_type
         */
		public function BindValue($param, $value, $data_type = PDO::PARAM_STR)
		{
			$this->ps->bindValue($param, $value, $data_type);
		}
		
		/**
		 * Executes the prepared statement.
		 * 
		 * @throws Exception
		 */
		public function Execute()
		{
			if ($this->ps->execute() === FALSE)
				throw new Exception("Executing query has failed: " . print_r($this->ps->errorInfo(), true));
		}
		
		/**
		 * Executes the prepared statement as an update query.
		 * 
		 * @return int the number of affected rows
		 * @throws Exception
		 */
		public function ExecuteUpdate()
		{
			if ($this->ps->execute() === FALSE)
				throw new Exception("Executing updating query has failed: " . print_r($this->ps->errorInfo(), true));
				
			return $this->ps->rowCount();
		}
		
		/**
		 * Executes the prepared statement as an insert query.
		 * 
		 * @return int the id of the inserted row
		 * @throws Exception
		 */		
		public function ExecuteInsert()
		{
			if ($this->ps->execute() === FALSE)
				throw new Exception("Executing inserting query has failed: " . print_r($this->ps->errorInfo(), true));
				
			return $this->pdo->lastInsertId();
		}
		
		/**
		 * Fetches a results row from the executed prepared statement.
		 * 
		 * @return array|bool fetched row or false on empty
		 */
		public function FetchRow()
		{
			return $this->ps->fetch(PDO::FETCH_ASSOC);
		}
		
		/**
		 * Fetches all results rows from the executed prepared statement.
		 * 
		 * @return array[]|array all fetched rows or an empty array
		 */		
		public function FetchAll()
		{
			return $this->ps->fetchAll(PDO::FETCH_ASSOC);
		}
	}