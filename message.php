<?php
header('Content-Type: application/json');

// Initialize response
$response = ['success' => false, 'message' => ''];

// Sanitize inputs
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validate required fields
if (empty($name)) {
    $response['message'] = 'Name is required';
    echo json_encode($response);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['message'] = 'Valid email is required';
    echo json_encode($response);
    exit;
}

if (empty($message)) {
    $response['message'] = 'Message is required';
    echo json_encode($response);
    exit;
}

// Prepare email
$to = 'faizur982@gmail.com';
$subject = 'New Contact Form Submission from ' . $name;
$email_body = "
Name: $name\n
Email: $email\n
Phone: " . ($phone ? $phone : 'Not provided') . "\n\n
Message:\n$message
";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    $response['success'] = true;
    $response['message'] = 'Thank you! Your message has been sent successfully.';
} else {
    $response['message'] = 'Failed to send message. Network issue? Call 7379906479 or email faizur982@gmail.com.';
}

echo json_encode($response);
?>