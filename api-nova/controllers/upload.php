<?php

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
                    // Setting this to true conflicts with cUrl versions. Perhaps a certificate thing?
                    CURLOPT_SSL_VERIFYPEER => false, 
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

    private function createTempFileStream($data, $extension) {
        $tmpStream = fopen('php://temp/tempFile.'. $extension, 'r+');
        fwrite($tmpStream, $data);
        rewind($tmpStream);
        // fpassthru($tmpStream); we don't need this apparently? 
        return $tmpStream;
    }

    private function getFileExtensionFromBase64String($base64String) {
        $fileData = explode(',', $base64String);
        $fileInfo = explode('/', $fileData[0]);
        $extension = explode(';', $fileInfo[1])[0];
        return $extension;
    }

    public function removeFileDataFromBase64String($base64String) {
        $base64Data = explode(',', $base64String)[1];
        $base64Data = str_replace(' ', '+', $base64Data);
        return base64_decode($base64Data);
    }

    public function saveFile($base64String) {
        $fileExtension = $this->getFileExtensionFromBase64String($base64String);
        $uniqueId = HashHelper::generateUniqueId();
        $cdnObj = $this->getCdnContainer();

        $base64Data = $this->removeFileDataFromBase64String($base64String);
        $tmpStream = $this->createTempFileStream($base64Data, $fileExtension);

        $remoteFileName = $uniqueId . '.' . $fileExtension;

        $url = $this->getCdnContainer()->uploadObject($remoteFileName, $tmpStream)->getPublicUrl(UrlType::SSL)->getHost();  

        return 'https://'.$url.'/'.$remoteFileName;
    }

    private function getCdnContainer()
    {
        $objStore = $this->connection->objectStoreService(null, 'LON');
        // Container name to .env param
        $this->dashboardContainer = $objStore->getContainer("dashboard_Sendsteps");
        $this->dashboardContainer->enableCdn();
        return $this->dashboardContainer;
    }
}
