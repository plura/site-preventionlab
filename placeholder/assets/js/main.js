import { initParticles } from './particles.js';

const { gsap, lucide } = window;

lucide.createIcons();
initParticles('bg-canvas');

// ── GSAP entrance animations ──
gsap.to('.brand',    { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: .3 });
gsap.to('#divider',  { width: 80,        duration: .8,   ease: 'power2.inOut', delay: .9 });
gsap.to('.headline', { opacity: 1,       duration: .9,   ease: 'power2.out', delay: 1.1 });
gsap.fromTo('.contact', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8, ease: 'power2.out', delay: 1.4 });
gsap.to('.cta-wrap', { opacity: 1, duration: .7, ease: 'power2.out', delay: 1.7 });
gsap.to('.socials',  { opacity: 1, duration: .7, ease: 'power2.out', delay: 1.9 });
gsap.to('.footer',   { opacity: 1, duration: .7, ease: 'power2.out', delay: 2.1 });

// ── Modal logic ──
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
