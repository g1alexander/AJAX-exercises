<?php

if (isset($_FILES["file"])) {
    $tmp_name = $_FILES["file"]["tmp_name"];
    $name = $_FILES["file"]["name"];
    $destination = "uploads/$name";
    if (file_exists("uploads")) {
        $res = move_uploaded_file($tmp_name, $destination);
    } else {
        mkdir("uploads", 0777);
        $res = move_uploaded_file($tmp_name, $destination);
    }

    if ($res) {
        $json = array(
            "error" => false,
            "status" => http_response_code(200),
            "message" => "El archivo $name se ha subido con exito",
            "file" => $_FILES["file"],
        );
    } else {
        $json = array(
            "error" => true,
            "status" => http_response_code(400),
            "message" => "El archivo $name se ha f con error",
            "file" => $_FILES["file"],
        );
    }

    echo json_encode($json);
}