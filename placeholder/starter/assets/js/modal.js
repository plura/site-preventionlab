import { initForm } from './form.js';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const dialog   = document.getElementById('contact-dialog');
const openBtn  = document.getElementById('open-modal');
const closeBtn = document.getElementById('close-modal');
const form     = document.getElementById('contact-form');

let opener = null;

function trapFocus() {
    const els   = [...dialog.querySelectorAll(FOCUSABLE)];
    if (!els.length) return;
    const first = els[0];
    const last  = els[els.length - 1];

    const onKeyDown = (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
        }
    };

    dialog.addEventListener('keydown', onKeyDown);
    dialog.addEventListener('close', () => dialog.removeEventListener('keydown', onKeyDown), { once: true });
}

function openModal() {
    opener = document.activeElement;
    dialog.showModal();
    trapFocus();
}

function closeModal() {
    dialog.close();
    opener?.focus();
}

// The interest <select> posts a slug ("stress"), so the notification email would show the slug
// instead of "Gestão de Stress". Rewriting the chosen option's value to its own visible text
// makes FormData pick up the readable form, with no change to form.js.
//
// capture: true is load-bearing — this has to run before the listener initForm() adds below,
// which is where FormData is built. This is the exact case the starter's modal.js documents.
//
// Mutating the option rather than the FormData is what keeps this out of form.js. It is
// idempotent: once rewritten the value already IS the text, so a second submit is a no-op.
form.addEventListener('submit', () => {
    const option = form.elements.interest?.selectedOptions[0];
    if (option?.value) option.value = option.text;
}, { capture: true });

// labels: the notification email renders them as its field names — see %label_FIELD% in
// mail-templates/contact/_partials/_fields.mjml.
const contactForm = initForm({
    form,
    endpoint: 'submit.php',
    labels: true,
    onSuccess: () => setTimeout(closeModal, 2800),
});

dialog.addEventListener('close', () => contactForm.reset());

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Close on backdrop click (click lands on the dialog element itself, not .dialog__inner)
dialog.addEventListener('click', e => {
    if (e.target === dialog) closeModal();
});
