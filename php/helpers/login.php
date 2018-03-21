<html>
<head>
    <title>Login to Pi Alarm</title>
    <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes"/>
</head>
<body>
    <form action='/helpers/login.php' method='post'>
        <label for='username'>Username: </label>
        <input type='text' name='username'>
        <label for='password'>Password: </label>
        <input type='text' name='password'>
        <input type='submit'>
    </form>
</body>
</html>
<?php
    // Logging setup
    ini_set("log_errors", 1);
    ini_set("error_log", "/tmp/php.log");

    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $urlPrefix = "http://localhost:3000/";

        // Configure curl object
        $curl = curl_init();
        curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "user/" . $_POST["username"] . "?password=" . $_POST["password"], CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));

        $result = curl_exec($curl);

        setcookie("username", $_POST["username"], time() + 60 * 60 * 24 * 365, "/");
        setcookie("token", $result, time() + 60 * 60 * 24 * 365, "/");

        header("location: /index.php");
    }
?>
