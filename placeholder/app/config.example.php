<?php
// Copy this file to config.php and fill in the values below.
// config.php is gitignored and must be created manually on the server.
return [
    'smtp_host'   => '',           // e.g. mail.preventionlab.pt
    'smtp_user'   => '',           // e.g. info@preventionlab.pt
    'smtp_pass'   => '',
    'smtp_port'   => 587,
    'smtp_secure' => 'tls',        // 'tls' (STARTTLS/587) or 'ssl' (SMTPS/465)

    'from_email'  => '',           // sending address (usually same as smtp_user)
    'from_name'   => 'Prevention Lab',

    'to_email'    => '',           // where contact notifications go
    'to_name'     => 'Dra. Cristina Ferreira Leite',
];
