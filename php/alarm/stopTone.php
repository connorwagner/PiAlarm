<?php
    // Logging setup
    ini_set("log_errors", 1);
    ini_set("error_log", "/tmp/php.log");

    $urlPrefix = "http://localhost:3000/";

    // Configure curl object
    $curl = curl_init();
    curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "/speaker", CURLOPT_CUSTOMREQUEST => "DELETE", CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));
    curl_exec($curl);

    header("location: index.php");
?>
