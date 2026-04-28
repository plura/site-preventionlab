const { gsap } = window;

const overlay  = document.getElementById('modal-overlay');
const openBtn  = document.getElementById('open-modal');
const closeBtn = document.getElementById('close-modal');
const form     = document.getElementById('contact-form');

function openModal() {
    overlay.classList.add('open');
    gsap.fromTo('.modal',
        { opacity: 0, y: 24, scale: .97 },
        { opacity: 1, y: 0,  scale: 1, duration: .35, ease: 'power2.out' }
    );
}

function closeModal() {
    gsap.to('.modal', {
        opacity: 0, y: 16, scale: .97, duration: .25, ease: 'power2.in',
        onComplete() { overlay.classList.remove('open'); }
    });
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Form processing will be added later
    console.log('Form submitted', Object.fromEntries(new FormData(form)));
    closeModal();
});
