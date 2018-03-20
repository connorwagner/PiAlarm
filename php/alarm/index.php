<html>
<head>
    <title>Pi Alarm</title>
    <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes"/>
</head>
<body>
<?php
    include $_SERVER["DOCUMENT_ROOT"] . '/helpers/auth.php';

    $urlPrefix = "http://localhost:3000/";

    // Configure curl object
    $curl = curl_init();
    curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "alarms", CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));

    $alarmList = json_decode(curl_exec($curl));
?>
    <div id="currentAlarms">
        <h1>Currently Configured Alarms</h1>
        <ul>
            <?php
            foreach ($alarmList as $alarm) {
                echo "<li>";
                    echo sprintf("%02d:%02d", $alarm->Hour, $alarm->Minute) . " on " . $alarm->Days . " (" . ($alarm->Active ? "Active" : "Inactive") . ")";
                    echo "<ul>";
                        echo "<li>";
                            echo "<a href='toggleActiveAlarm.php?id=" . $alarm->ID . "'>Make this alarm active/inactive</a>";
                        echo "</li>";
                        echo "<li>";
                            echo "<a href='deleteAlarm.php?id=" . $alarm->ID . "'>Delete this alarm</a>";
                        echo "</li>";
                    echo "</ul>";
                echo "</li>";
            }
            ?>
        </ul>
    </div>
    <div id="createAlarm">
        <h1>Create an Alarm</h1>
        <form action='createAlarm.php' method='get'>
            <label for='hour'>Hour: </label>
            <input type='number' min='0' max='23' name='hour'>
            <label for='minute'>Minute: </label>
            <input type='number' min='0' max='59' name='minute'>
            <label for='days'>Days to repeat this alarm: </label>
            <input type='text' name='days'>
            <input type='submit'>
        </form>
    </div>
    <div id="changeVolume">
        <h1>Change Alarm Volume</h1>
        <form action='changeVolume.php' method='get'>
            <label for='volume'>Volume (Percent): </label>
            <input type='number' min='0' max='100' name='volume'>
            <input type='submit'>
    </div>
    <div id="stopAlarm">
        <h1><a href='stopTone.php'>Stop an Alarm</a></h1>
    </div>
    <div id="startAlarm">
        <h1><a href='startTone.php'>Start an Alarm</a></h1>
    </div>
</body>
</html>
