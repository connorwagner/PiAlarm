<?php
    setcookie("username", "", time() - 3600, "/");
    unset($_COOKIE["username"]);
    setcookie("token", "", time() - 3600, "/");
    unset($_COOKIE["token"]);
    header("location: /helpers/login.php");
?>
