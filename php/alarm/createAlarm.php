<?php
    include $_SERVER["DOCUMENT_ROOT"] . "/helpers/auth.php";

    $urlPrefix = "http://localhost:3000/";

    // Configure curl object
    $curl = curl_init();
    curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "alarms", CURLOPT_POST => 3, CURLOPT_POSTFIELDS => array("days" => $_GET["days"], "hour" => intval($_GET["hour"]), "minute" => intval($_GET["minute"])), CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));
    echo curl_exec($curl);

    header("location: index.php");
?>
