const { gsap } = window;

const dialog   = document.getElementById('contact-dialog');
const openBtn  = document.getElementById('open-modal');
const closeBtn = document.getElementById('close-modal');
const form     = document.getElementById('contact-form');

function openModal() {
    dialog.showModal();
    gsap.fromTo(dialog,
        { opacity: 0, y: 24, scale: .97 },
        { opacity: 1, y: 0,  scale: 1, duration: .35, ease: 'power2.out' }
    );
}

function closeModal() {
    gsap.to(dialog, {
        opacity: 0, y: 16, scale: .97, duration: .25, ease: 'power2.in',
        onComplete() { dialog.close(); }
    });
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Intercept native ESC to use animated close instead
dialog.addEventListener('cancel', e => {
    e.preventDefault();
    closeModal();
});

// Close on backdrop click
dialog.addEventListener('click', e => {
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom) {
        closeModal();
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Form processing will be added later
    console.log('Form submitted', Object.fromEntries(new FormData(form)));
    closeModal();
});
