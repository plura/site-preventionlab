<?php
// Copy this file to config.php and fill in the values below.
// config.php is gitignored and must be created manually on the server.
return [
    'smtp' => [
        'host'   => '',           // e.g. mail.preventionlab.pt
        'user'   => '',           // e.g. info@preventionlab.pt
        'pass'   => '',
        'port'   => 587,
        'secure' => 'tls',        // 'tls' (STARTTLS/587) or 'ssl' (SMTPS/465)
    ],

    'contact' => [
        'from_email' => '',                    // sending address (usually same as smtp.user)
        'from_name'  => 'Prevention Lab',

        'to_email'   => '',                     // where contact notifications go
        'to_name'    => 'Dra. Cristina Ferreira Leite',

        'site_name'  => 'Prevention Lab', // used in email subject lines
    ],
    // Mailing-list signup: the standalone field on the page and the contact form's opt-in
    // checkbox both go through here. The kit only adds addresses; campaigns are run in the
    // provider's own tools.
    'newsletter' => [
        // Brevo, the starter's default and what the other Plura installations use.
        'provider' => 'brevo',

        // Brevo: Profile -> SMTP & API -> API Keys (v3); the key starts "xkeysib-". List
        // ID is the number in the URL when the list is open, or the ID column under
        // Contacts -> Lists; Brevo requires the list to sit in a folder. Convention:
        // folder "Website", list "Signups".
        //
        // NOTE: Brevo does NOT double opt-in on its own - see lib/newsletter/brevo.php.
        // Until a DOI template is configured in the account, subscribe_confirm in
        // strings.php must not tell the visitor to check their inbox, and currently does not.
        'api_key' => '',
        'list_id' => '',
    ],
];
