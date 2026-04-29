<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

// Config
if (!file_exists(__DIR__ . '/config.php')) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro de configuração do servidor.']);
    exit;
}
$config = require __DIR__ . '/config.php';

// PHPMailer
require_once __DIR__ . '/lib/phpmailer/Exception.php';
require_once __DIR__ . '/lib/phpmailer/PHPMailer.php';
require_once __DIR__ . '/lib/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// —— Honeypot ————————————————————————————————————————————————————————————————
if (!empty($_POST['botcheck'])) {
    echo json_encode(['success' => true]);
    exit;
}

// —— Sanitize ————————————————————————————————————————————————————————————————
$name     = strip_tags(trim($_POST['name']     ?? ''));
$email    = trim($_POST['email']    ?? '');
$phone    = strip_tags(trim($_POST['phone']    ?? ''));
$interest = strip_tags(trim($_POST['interest'] ?? ''));
$message  = strip_tags(trim($_POST['message']  ?? ''));

// —— Validate ————————————————————————————————————————————————————————————————
if (!$name || !$email) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Por favor preencha os campos obrigatórios.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Por favor introduza um endereço de email válido.']);
    exit;
}

$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// —— Interest label ——————————————————————————————————————————————————————————
$interest_labels = [
    'stress'    => 'Gestão de Stress',
    'sleep'     => 'Qualidade do Sono',
    'longevity' => 'Longevidade',
    'corporate' => 'Programa Corporativo',
    'other'     => 'Outro',
];
$interest_label = $interest_labels[$interest] ?? '';

// —— Build fields rows ———————————————————————————————————————————————————————
$fields = array_filter([
    ['label' => 'Nome',      'value' => $name],
    ['label' => 'Email',     'value' => $email],
    ['label' => 'Telefone',  'value' => $phone],
    ['label' => 'Interesse', 'value' => $interest_label],
    ['label' => 'Mensagem',  'value' => $message],
], fn($f) => $f['value'] !== '');

function build_fields_html(array $fields): string {
    $html = '';
    foreach ($fields as $field) {
        $label  = htmlspecialchars($field['label'], ENT_QUOTES, 'UTF-8');
        $value  = nl2br(htmlspecialchars($field['value'], ENT_QUOTES, 'UTF-8'));
        $html  .= "
            <tr>
                <td class=\"label-cell\">{$label}</td>
                <td class=\"value-cell\">{$value}</td>
            </tr>";
    }
    return $html;
}

function build_email(string $form_name, array $fields, string $intro = ''): string {
    $template = __DIR__ . '/templates/email-contact.html';
    $html     = file_get_contents($template);

    return str_replace(
        ['%FORM_NAME%', '%INTRO%', '%FIELDS%', '%YEAR%'],
        [
            htmlspecialchars($form_name, ENT_QUOTES, 'UTF-8'),
            $intro,
            build_fields_html($fields),
            gmdate('Y'),
        ],
        $html
    );
}

function send_mail(array $cfg, string $to_email, string $to_name, string $subject, string $body, string $reply_email = '', string $reply_name = ''): bool {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = $cfg['smtp_host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $cfg['smtp_user'];
        $mail->Password   = $cfg['smtp_pass'];
        $mail->SMTPSecure = $cfg['smtp_secure'] === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = (int) $cfg['smtp_port'];
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom($cfg['from_email'], $cfg['from_name']);
        $mail->addAddress($to_email, $to_name);

        if ($reply_email) {
            $mail->addReplyTo($reply_email, $reply_name);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;

        $mail->send();
        return true;
    } catch (Exception) {
        error_log('PHPMailer: ' . $mail->ErrorInfo);
        return false;
    }
}

// —— Notification to clinic ——————————————————————————————————————————————————
$sent = send_mail(
    $config,
    $config['to_email'],
    $config['to_name'],
    'Prevention Lab — novo contacto do site',
    build_email('Novo Contacto', $fields),
    $email,
    $name
);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar. Por favor tente novamente ou contacte-nos por email.']);
    exit;
}

// —— Auto-reply to submitter —————————————————————————————————————————————————
$intro = '<p class="email-intro">Olá ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ', obrigado pelo seu contacto com a Prevention Lab.'
       . ' Recebemos a sua mensagem e entraremos em contacto brevemente.'
       . ' Em baixo encontra uma cópia da sua mensagem para os seus registos.</p>';

send_mail(
    $config,
    $email,
    $name,
    'Prevention Lab — recebemos o seu contacto',
    build_email('Cópia da sua mensagem', $fields, $intro),
    $config['to_email'],
    $config['to_name']
);

// —— Done ————————————————————————————————————————————————————————————————————
echo json_encode(['success' => true]);
