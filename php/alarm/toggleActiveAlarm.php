<?php
    include $_SERVER["DOCUMENT_ROOT"] . "/helpers/auth.php";

    $urlPrefix = "http://localhost:3000/";

    // Configure curl object
    $curl = curl_init();
    curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "alarms/" . $_GET["id"], CURLOPT_CUSTOMREQUEST => "PUT", CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));
    curl_exec($curl);

    header("location: index.php");
?>
