<?php
function main($Secret) {
    $mongo_url = "mongodb+srv://" . $Secret["mongodb.username"] . ":" . $Secret["mongodb.password"] . "@" . $Secret["mongodb.server"] . "/?retryWrites=true&w=majority&appName=h";
    $manager = new MongoDB\Driver\Manager($mongo_url);
    $seepower_pid = 0;
    $filter = ["id" => 1];
    $options = [];
    $query = new MongoDB\Driver\Query($filter, $options);
    $documents = $manager->executeQuery('nxu_charge.data', $query);
    foreach($documents as $document){
        $document = json_decode(json_encode($document),true);
        $seepower_pid = $document['num'];
        $token = $document['token'];
    }
    $result = array(
        "code" => 200,
        "successful" => true,
        "id" => $seepower_pid,
        "token" => $token,
    );
    echo json_encode($result);
}
?>