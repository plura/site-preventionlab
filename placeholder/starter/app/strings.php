<?php
declare(strict_types=1);

// Every user-facing string the endpoints return, in one place. Previously these were scattered:
// the error copy inline in submit.php, the success copy hardcoded in modal.js. The server owns
// all of it now, so the page supplies only data-network-error - the one case where there is no
// response to read.
//
// Keys are semantic, not the English source text. This copy gets rewritten per project, and
// source-string keys go stale the moment one is reworded.
//
// Portuguese is $BASE, not a translation: this is a Portuguese site and English is the delta
// below. That is the inverse of the starter's shipped arrangement, so check which direction
// its examples mean before following them.
//
// Portuguese must stay gender-neutral: nothing here knows who is writing in. That rules out
// "Obrigado"/"Obrigada" and any past participle agreeing with the reader.
$BASE = [
    'method_not_allowed' => 'Método não permitido.',
    'config_error'       => 'Erro de configuração do servidor.',
    'required_fields'    => 'Por favor preencha os campos obrigatórios.',
    'invalid_email'      => 'Por favor introduza um endereço de email válido.',
    'send_error'         => 'Erro ao enviar. Por favor tente novamente ou contacte-nos por email.',
    'sent'               => 'Mensagem enviada. Entraremos em contacto em breve.',

    // %s is contact.site_name from config.php. Visitor-facing - the auto-reply's subject.
    'subject_reply' => '%s — recebemos o seu contacto',
];


// Translations, as a delta against $BASE. Every key is listed because $BASE is Portuguese and
// nothing carries over. Remove this block along with en/ to go back to a single language.
$OVERRIDES = [
    'en' => [
        'method_not_allowed' => 'Method not allowed.',
        'config_error'       => 'Server configuration error.',
        'required_fields'    => 'Please fill in the required fields.',
        'invalid_email'      => 'Please enter a valid email address.',
        'send_error'         => 'Could not send your message. Please try again, or get in touch by email.',
        'sent'               => 'Message sent. You will hear back shortly.',

        'subject_reply' => '%s — message received',
    ],
];

// Owner-facing copy, outside any language resolution: the notification goes to the clinic, which
// reads one language regardless. Applied last so nothing can override it.
$OWNER = [
    'subject_notify' => '%s — novo contacto do site',
];

// The form posts the language it was rendered in (see form.js). Trimmed to a bare two-letter
// code so 'en-GB' matches 'en'; anything unknown or absent falls through to $BASE.
$lang = strtolower(substr((string) ($_POST['lang'] ?? ''), 0, 2));

return array_merge($BASE, $OVERRIDES[$lang] ?? [], $OWNER, ['_lang' => $lang]);
