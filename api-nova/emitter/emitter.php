<?php 

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;

require_once __DIR__.'./../base/nova-api.php';

class Emitter {

    private $client;
    private $supportedEvents = [
        'message:updated',
        'message:created',
        'message:removed',
        'groups:updated',
        'messageRound:updated',
        'messageRound:created',
        'presentation:updated',
        'presentation:clear_results',
        'session:start',
        'session:stop',
        'session:subscribe_client',
        'session:unsubscribe_client',
        'session:tabs_updated',
        'session:autoApprove',
        'session:language_updated',
        'session:anonymous_sources_updated',
        'survey:updated',
        'vote:created',
        'vote:updated',
        'vote:resultsgraph',
        'participant:logged_in',
        'participant:logout',
        'participant:created',
        'voteMessage:updated',
        'voteMessage:created',
        'twitter:hashtags_updated'
    ];

    public function emit($eventName, $data) {
        $data['secret'] = getenv('nodeJsSecretKey');
        $this->getClient()->emit($eventName, $data);
        // $this->closeClient();
    }

    public function getClient() {
        if(!isset($this->client)) {
            $this->client = new Client(new Version2X(getenv('nodeJsServerInternal')));
            $this->client->initialize();
        }
        return $this->client;
    }

    public function closeClient() {
        if(isset($this->client)) {
            $this->client->close();
        }
    }
}

