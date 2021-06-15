<?php

if (isset($_POST)) {
    error_reporting(0);

    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $asunto = $_POST["asunto"];
    $comentarios = $_POST["comentarios"];

    $dominio = $_SERVER["HTTP_HOST"];
    $to = "alexlds26@gmail.com";
    $asunto_envio = "Contacto desde el formulario del sitio $dominio: $asunto";
    $mensaje = "
      <p>Datos enviados desde el formulario del sitio <b>$dominio</b></p>
      <ul>
        <li>Nombre: <b>$nombre</b></li>
        <li>Correo: <b>$correo</b></li>
        <li>Asunto: <b>$asunto</b></li>
        <li>Mensaje: <b>$comentarios</b></li>
      </ul>
    ";
    $headers = "MIME-Version: 1.0\r\n" . "Content-type: text/html; charset=utf-8\r\n" . "From: Envio Automatico No Responder <no-reply@$dominio>";

    $send = mail($to, $asunto_envio, $mensaje, $headers);

    if ($send) {
        $res = [
            "success" => true,
            "message" => "Tus datos se han enviado",
        ];
    } else {
        $res = [
            "success" => false,
            "message" => "Ha ocurrido un error",
        ];
    }

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-type: application/json");

    echo json_encode($res);

}