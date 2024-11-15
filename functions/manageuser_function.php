<?php
session_start();
include(__DIR__ . '/../db_connect/db.php');

// Function to insert a new user
function insertUser($username, $email, $password, $role) {
    global $conn;
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, :role)";
    $stmt = $conn->prepare($sql);

    $stmt->execute([
        ':username' => $username,
        ':email' => $email,
        ':password' => $hashedPassword,
        ':role' => $role
    ]);
}

// Function to update an existing user's information (including password if provided)
function updateUser($userId, $username, $email, $role, $password = null) {
    global $conn;

    // If a new password is provided, update it
    if ($password) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE users SET username = :username, email = :email, role = :role, password = :password, updated_at = current_timestamp() WHERE user_id = :user_id";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':role' => $role,
            ':password' => $hashedPassword,
            ':user_id' => $userId
        ]);
    } else {
        // If no password is provided, update other fields
        $sql = "UPDATE users SET username = :username, email = :email, role = :role, updated_at = current_timestamp() WHERE user_id = :user_id";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':role' => $role,
            ':user_id' => $userId
        ]);
    }
}


// Function to delete a user
function deleteUser($userId) {
    global $conn;

    $sql = "DELETE FROM users WHERE user_id = :user_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':user_id' => $userId]);
}


?>
