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
    curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "leds", CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));

    $colorList = json_decode(curl_exec($curl));
?>
    <div id="currentAlarms">
        <h1>Current LED Status</h1>
        <ul>
            <?php
            foreach ($colorList as $color) {
                echo "<li>";
                    echo $color;
                echo "</li>";
            }
            ?>
        </ul>
    </div>
    <div id="changeLEDs">
        <h1>Change LED Color</h1>
        <form action='changeLED.php' method='get'>
            <label for='red'>Red: </label>
            <input type='number' min='0' max='255' name='red'>
            <label for='green'>Green: </label>
            <input type='number' min='0' max='255' name='green'>
            <label for='blue'>Blue: </label>
            <input type='number' min='0' max='255' name='blue'>
            <label for='white'>White: </label>
            <input type='number' min='0' max='255' name='white'>
            <input type='submit'>
        </form>
    </div>
    <div id="togglePower">
        <h1><a href="toggleLED.php">Toggle LED Power</a></h1>
    </div>
    <div id="changeRed">
        <h1>Change Red Value</h1>
        <form action='changeRed.php' method='get'>
            <label for='red'>Red: </label>
            <input type='number' min='0' max='255' name='red'>
            <input type='submit'>
        </form>
    </div>
    <div id="changeGreen">
        <h1>Change Green Value</h1>
        <form action='changeGreen.php' method='get'>
            <label for='green'>Green: </label>
            <input type='number' min='0' max='255' name='green'>
            <input type='submit'>
        </form>
    </div>
    <div id="changeBlue">
        <h1>Change Blue Value</h1>
        <form action='changeBlue.php' method='get'>
            <label for='blue'>Blue: </label>
            <input type='number' min='0' max='255' name='blue'>
            <input type='submit'>
        </form>
    </div>
    <div id="changeWhite">
        <h1>Change White Value</h1>
        <form action='changeWhite.php' method='get'>
            <label for='white'>White: </label>
            <input type='number' min='0' max='255' name='white'>
            <input type='submit'>
        </form>
    </div>
</body>
</html>
