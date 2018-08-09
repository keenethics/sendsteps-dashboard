
<?php
require_once __DIR__.'/../base/nova-api.php';

class About extends NovaAPI {
    function getDashboard(){
        $results = 'dashboard';
        return json_encode(['content' => $results]);
    }

    function getSendsteps() {
        $title = 'What we believe';
        $content = 'At Sendsteps we believe that everybody should be able to speak up during presentations. Presentations require a complete make-over, turning them from strictly one-way communication into lively dialogues. As such presentations provide people a better understanding of what is being said. Levels of engagement with Sendsteps audience response system will sky rocket transforming meetings and providing a massive return on investments. We have seen this happen over and over again. Do you want to know who is behind the Sendsteps technology? Visit <a href="https://www.sendsteps.com/en/about/our-team/" target="_blank">our team webpage</a> and get to know our brilliant minds! We wish you a lot of interactive and inspiring sessions.';
        return json_encode(['title' => $title, 'content' => $content]);
    }
    
    function getHowItWorks() {
        $results = 'howitworks';
        return json_encode(['content' => $results]);
    }
}