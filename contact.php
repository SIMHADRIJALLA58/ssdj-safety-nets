<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/mail/Exception.php';
require __DIR__ . '/mail/PHPMailer.php';
require __DIR__ . '/mail/SMTP.php';


// === CONFIG ===
$to_email = "ssdjsafetynets@gmail.com";  // Gmail where emails will be sent
$site_name = "SSDJ Safety Nets";
$whatsapp_number = "+919515571083";    // include +countrycode
// =============

// Helper sanitize
function safe($v) {
    return htmlspecialchars(trim($v), ENT_QUOTES, 'UTF-8');
}

// Input
$name    = safe($_POST['name'] ?? '');
$phone   = safe($_POST['phone'] ?? '');
$address = safe($_POST['address'] ?? '');
$comment = safe($_POST['comment'] ?? '');

$redirect = isset($_POST['redirect_to_whatsapp']) && $_POST['redirect_to_whatsapp'] == '1';

// Build mail body (plain text)
$subject = "Contact Form - {$site_name}";
$body = "
Name: {$name}
Phone: {$phone}
Service: {$address}

Message:
{$comment}
";

// === SEND USING GMAIL SMTP ===
$mail = new PHPMailer(true);

try {
    // Enable verbose debug output
    $mail->SMTPDebug = 0; // Change to 0 in production
    $mail->Debugoutput = 'html';

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    // LOGIN WITH APP PASSWORD (must be a Gmail App Password)
    $mail->Username = "ssdjsafetynets@gmail.com";
    $mail->Password = "wlqowyfwggyfgria"; // Replace with your actual App Password

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom($mail->Username, $site_name);
    $mail->addAddress($to_email);

    // Optional: reply-to
    if(!empty($phone)) {
        $mail->addReplyTo($mail->Username, "User: $name, Phone: $phone");
    }

    // Use HTML email
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = "<strong>Name:</strong> $name<br>
                      <strong>Phone:</strong> $phone<br>
                      <strong>Address:</strong> $address<br>
                      <strong>Comment:</strong><br>$comment";
    $mail->AltBody = $body; // fallback for plain text

    $mail->send();

    // Redirect to WhatsApp if requested
    if ($redirect) {
        $wa = urlencode("Hello Simhadri Enterprises,\nI submitted a form.\n\nName: $name\nPhone: $phone\nService: $product\nMessage: $message");
        header("Location: https://api.whatsapp.com/send?phone={$whatsapp_number}&text={$wa}");
        exit;
    }

    // Otherwise, redirect to thank-you page
    header("Location: ../ssdjsafetynets/index.html");
    exit;

} catch (Exception $e) {
    // Show detailed error
    echo "<h2>Mailer Error:</h2>";
    echo $mail->ErrorInfo;
    echo "<pre>".$e->getMessage()."</pre>";
}

