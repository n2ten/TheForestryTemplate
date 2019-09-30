<?php

/**
 * This example shows settings to use when sending via Google's Gmail servers.
 * The IMAP section shows how to save this message to the 'Sent Mail' folder using IMAP commands.
 */
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
// require 'PHPMailer/vendor/autoload.php';
require 'PHPMailer/PHPMailerAutoload.php';
if( !empty($_POST['contactName']) && !empty($_POST['contactEmail']) ){
//Create a new PHPMailer instance
$mail = new PHPMailer(TRUE);
// $mail->isSMTP();
// $mail->SMTPDebug = 1;
// $mail->Debugoutput = 'html';
$mail->Host = 'mail.n2ten.com';
$mail->Port = 465;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
// $mail->SMTPAutoTLS = false;
// $mail->SMTPOptions = array(
//     'ssl' => array(
//         'verify_peer' => false,
//         'verify_peer_name' => false,
//         'allow_self_signed' => true
//     )
// );
// Dont use the code above tis but you can use everything below:
$mail->Username = "info@n2ten.com";
$mail->Password = "vv34aF3#";
$mail->setFrom('info@n2ten.com', 'Info N2TEN');
$mail->addReplyTo($_POST['contactEmail'], $_POST['contactName']);
$mail->addAddress('info@n2ten.com', 'Website mailing');
$mail->AddCC('dhwang@n2ten.com');
$mail->AddCC('aattef@n2ten.com');
$mail->AddCC('ejoseph@n2ten.com');
$mail->Subject = 'New '. $_POST['whichpage'] .' page form submission from '.$_POST['contactName'] . ' (' . $_POST['contactEmail'] . ')';

$mail->Body = $_POST['contactMessage'];
// Added an empty array
$response = [
    "error" => 0
];
//send the message, check for errors
if (!$mail->send()) {
    // echo "Mailer Error: " . $mail->ErrorInfo;
    $response['error']  = 1;
    echo json_encode($response);
} else {
    
    $getContent = file_get_contents('thankYouMail.html');
    $mail->clearAddresses();
    // $mail->SMTPDebug = 1;
    $mail->setFrom('info@n2ten.com', 'Info N2TEN');
    $mail->addReplyTo('info@n2ten.com', 'Info N2TEN');
    $mail->addAddress($_POST['contactEmail'], 'Website mailing');
    $mail->Subject = 'You sent us an email. Talk to you soon!';
    $mail->isHTML(true);
    $mail->Body = $getContent;
    // $mail->Body = 'Thank you for contacting us! We received your email and will get back to you soon';
    $mail->send();
    $response['error']  = 0;
    echo json_encode($response);
    ?>
<?php
}

}else{
    $response['error']  = 1;
}
?>
    