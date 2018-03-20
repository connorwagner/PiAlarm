<html>
<head>
    <title>Reset Password</title>
</head>
<body>
<?php
    include $_SERVER["DOCUMENT_ROOT"] . "/helpers/auth.php";
?>
    <h1>Reset Password</h1>
    <form action="/helpers/resetPassword.php" method="post">
        <label for="oldPassword">Old Password: </label>
        <input type="text" name="oldPassword">
        <label for="newPassword">New Password: </label>
        <input type="text" name="newPassword">
        <input type="submit">
    </form>
<?php
    if (isset($_POST["oldPassword"]) && isset($_POST["newPassword"])) {
        $urlPrefix = "http://localhost:3000/";

        // Configure curl object
        $curl = curl_init();
        curl_setopt_array($curl, array(CURLOPT_URL => $urlPrefix . "user/" . $_COOKIE["username"], CURLOPT_CUSTOMREQUEST => "PUT", CURLOPT_POSTFIELDS => array(oldPassword => $_POST["oldPassword"], newPassword => $_POST["newPassword"]), CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true));

        echo curl_exec($curl);
    }
?>
</body>
</html>
