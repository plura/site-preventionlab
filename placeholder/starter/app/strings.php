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
// This site is Portuguese-only, so there is no $OVERRIDES block and no _lang-driven reply
// template - the starter's Tier 2. Add a language by reinstating both from the starter.
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

// Owner-facing copy, outside any language resolution: the notification goes to the clinic, which
// reads one language regardless. Applied last so nothing can override it.
$OWNER = [
    'subject_notify' => '%s — novo contacto do site',
];

// The form posts the language it was rendered in (see form.js). Inert while there is only one
// language, but submit.php's kicker reads it, so it is resolved rather than assumed.
$lang = strtolower(substr((string) ($_POST['lang'] ?? ''), 0, 2));

return array_merge($BASE, $OWNER, ['_lang' => $lang]);
