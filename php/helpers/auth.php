<?php
// Logging setup
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php.log");

if (!isset($_COOKIE["username"]) || !isset($_COOKIE["token"])) {
    header("location: /helpers/login.php");
} else {
    $urlPrefix = "http://localhost:3000/";

    // Configure curl object
    $curl = curl_init();
    curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "token/" . $_COOKIE["token"], CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));

    $username = curl_exec($curl);
    if ($username !== $_COOKIE["username"]) {
        header("location: /helpers/login.php");
    }
}
?>
