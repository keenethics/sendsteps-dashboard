<?php 

require_once __DIR__.'./../base/nova-api.php';

class Emitter {

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
        $file = __DIR__ . "/events.log";
        $fWrite = fopen($file, "a");
        flock($fWrite, LOCK_EX);
        fwrite($fWrite, $eventName . "\n" . json_encode($data) . "\n");
        fwrite($fWrite, LOCK_UN);
        fclose($fWrite);
    }
}

