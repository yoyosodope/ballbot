<?php

$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "ball_bot";

// 建立與資料庫的連線
$conn = new mysqli($servername, $username, $password, $dbname);

// 檢查連線是否成功
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 從 POST 請求中獲取姓名、密碼和電子信箱
$name = $_REQUEST["name"];
$password = $_REQUEST["password"];
$email = $_REQUEST["email"];

// 使用 SQL INSERT 語句插入資料
$sql = "INSERT INTO account (name, password, account) VALUES ('$name', '$password', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "註冊成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 關閉資料庫連線
$conn->close();
?>
