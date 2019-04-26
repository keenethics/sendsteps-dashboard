<?php

require __DIR__.'../../vendor/autoload.php';
include __DIR__.'./../helpers/HashHelper.php';

use OpenCloud\ObjectStore\Constants\UrlType;
use OpenCloud\ObjectStore\Resource\Container;
use OpenCloud\ObjectStore\Resource\DataObject;
use OpenCloud\Rackspace;

class Upload
{

    private $client;
    private $connection;

    private $maxUploadSize = 15 * 1024 * 1024; // 15 MB ?

    private $dashboardContainer;

    public function __construct() {
        $this->connection = $this->getConnection();
    }

    public function getConnection() {
        if (!isset($this->connection))
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
            ]
            );
        }

        return $this->connection;
    }

    private function getFileFromBase64String($base64String) {
        $tempFile = tmpfile();
        $data = explode(',', $base64String);
        fwrite($tempFile, base64_decode($base64String[1]));
        fclose($tempFile);
        return $tempFile;
    }

    public function saveFile($base64String) {

        $base64Data = str_replace('data:image/png;base64,', '', $base64String);
        $base64Data = str_replace(' ', '+', $base64Data);

        $cdnObj = $this->getCdnContainer();
        // $uniqueId = HashHelper::generateUniqueId();
        $tmpStream = fopen('php://temp/tempFile.png', 'r+');
        $data = base64_decode($base64Data);
        fwrite($tmpStream, $data);
        rewind($tmpStream);
        fpassthru($tmpStream);
        $remoteFileName = 'testTestTestfile.png';

        $object = $this->getCdnContainer()->uploadObject($remoteFileName, $tmpStream)->getPublicUrl(UrlType::SSL)->getHost();   
        return 'https://'.$object.'/'.$remoteFileName;
        return json_encode($foo); 
    }

    // public function saveFile($base64String, $remoteFile) {

    //     $cdnObject = $this->getCdnContainer()->getObject();
    //     $service = $this->client->objectStoreService(null, Rackspace::US_IDENTITY_ENDPOINT);
    //     $account = $service->getAccount();
    //     $account->setTempUrlSecret();

    //     return $object->getTemporaryUrl(100, 'PUT');

    //     $cdnObject->setName('testFile.png');

    //     $file = $this->getFileFromBase64String($base64String);
    //     return sys_get_temp_dir();
    //     
    //     return $object;
    // }
    

    private function getCdnContainer()
    {
        $objStore = $this->connection->objectStoreService(null, 'LON');
        // Container name to .env param
        $this->dashboardContainer = $objStore->getContainer("dashboard_Sendsteps");
        $this->dashboardContainer->enableCdn();
        return $this->dashboardContainer;
    }
}
