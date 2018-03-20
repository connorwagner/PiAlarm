<html>
<head>
    <title>Create a User</title>
</head>
<body>
<?php
    include $_SERVER["DOCUMENT_ROOT"] . "/helpers/auth.php";
?>
    <h1>Create a User</h1>
    <form action="/helpers/createUser.php" method="post">
        <label for="username">Username: </label>
        <input type="text" name="username">
        <label for="password">Password: </label>
        <input type="text" name="password">
        <input type="submit">
    </form>
<?php
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $urlPrefix = "http://localhost:3000/";

        // Configure curl object
        $curl = curl_init();
        curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "user", CURLOPT_POST => 2, CURLOPT_POSTFIELDS => [username => $_POST["username"], password => $_POST["password"]], CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));

        echo curl_exec($curl);
    }
?>
</body>
</html>
