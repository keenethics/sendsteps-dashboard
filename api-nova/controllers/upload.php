<?php

require __DIR__.'../../vendor/autoload.php';

use OpenCloud\ObjectStore\Constants\UrlType;
use OpenCloud\ObjectStore\Resource\Container;
use OpenCloud\ObjectStore\Resource\DataObject;
use OpenCloud\Rackspace;

class Upload
{

    private $client;
    private $connection;

    private $dashboardContainer;

    public function __construct() {
        $this->connection = $this->getConnection();
    }

    public function getConnection() {
        if (!isset($this->_connection))
        {
            $this->connection = new Rackspace(Rackspace::US_IDENTITY_ENDPOINT, array(
                'username' => getenv('rackspaceUsername'),
                'apiKey'   => getenv('rackspaceAPIKey')
            ),
            [
                // Guzzle ships with outdated certs
                Rackspace::SSL_CERT_AUTHORITY => 'system',
                Rackspace::CURL_OPTIONS => [
                    CURLOPT_SSL_VERIFYPEER => true,
                    CURLOPT_SSL_VERIFYHOST => 2,
                ],
            ]);
        }

        return $this->connection;
    }

    public function saveFile($localFile, $remoteFile) {
        // Upload an object to the container.

        // $localFileName  = __DIR__ . '/php-elephant.jpg';
        // $remoteFileName = 'php-elephant.jpg';

        $handle = fopen($localFile, 'r');
        $object = $this->getCdnContainer()->uploadObject($remoteFile, $handle);
    }

    private function getCdnContainer()
    {
        $objStore = $this->connection->objectStoreService(null, Rackspace::US_IDENTITY_ENDPOINT);
        $objStore->createContainer("dashboard_Sendsteps");
        $this->dashboardContainer = $objStore->getContainer("dashboard_Sendsteps");
        $this->dashboardContainer->enableCdn();

        return $this->dashboardContainer;
    }
}
