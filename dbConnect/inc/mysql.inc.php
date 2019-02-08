<?php
require_once 'settings.php';
	class MySQL
	{
		private $pdo;
		private $ps;

		function __construct()
		{
			$this->pdo = 0;
			$this->ps = 0;

			$this->Init(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
		}

		function __destruct()
		{
		}

		public function Init($server, $username, $password, $databaseName)
		{
			$this->pdo = new PDO("mysql:host=" . $server. ";dbname=" . $databaseName, $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"));
		}

		public function Prepare($query)
		{
			$this->ps = $this->pdo->prepare($query);
			if ($this->ps === FALSE)
				throw new Exception("Preparing statement has failed. Error info: " . print_r($this->pdo->errorInfo(), true));
		}
		public function BindParam($param, $value)
		{
			$this->ps->bindParam($param, $value);
		}
                public function BindValue($param, $value)
		{
			$this->ps->bindValue($param, $value);
		}
		public function Execute()
		{
			if ($this->ps->execute() === FALSE)
				throw new Exception("Executing query has failed: " . print_r($this->ps->errorInfo(), true));
		}

		public function ExecuteUpdate()
		{
			if ($this->ps->execute() === FALSE)
				throw new Exception("Executing updating query has failed: " . print_r($this->ps->errorInfo(), true));

			return $this->ps->rowCount();
		}

		public function ExecuteInsert()
		{
			if ($this->ps->execute() === FALSE)
				throw new Exception("Executing inserting query has failed: " . print_r($this->ps->errorInfo(), true));

			return $this->pdo->lastInsertId();
		}

		public function FetchRow()
		{
			return $this->ps->fetch(PDO::FETCH_ASSOC);
		}

		public function FetchAll()
		{
			return $this->ps->fetchAll(PDO::FETCH_ASSOC);
		}

		public function Quote($string)
		{
			return $this->pdo->quote($string);
		}

		public function lastInsertId()
		{
			return $this->pdo->lastInsertId();
		}
	}
