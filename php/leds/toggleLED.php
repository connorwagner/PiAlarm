<?php
    include $_SERVER["DOCUMENT_ROOT"] . "/helpers/auth.php";

    $urlPrefix = "http://localhost:3000/";

    // Configure curl object
    $curl = curl_init();
    curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "leds", CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));
    $result = curl_exec($curl);
    $ledsSum = 0;
    foreach ($result as $color) {
        $ledsSum += $color;
    }

    curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "leds/power", CURLOPT_CUSTOMREQUEST => "PUT", CURLOPT_POSTFIELDS => array("power" => ($ledsSum == 0) ? 0 : 1)));

    header("location: index.php");
?>
