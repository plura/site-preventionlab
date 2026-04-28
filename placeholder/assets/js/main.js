import { createIcons, Leaf, Phone, Mail, X } from 'https://unpkg.com/lucide@latest/dist/esm/lucide.js';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';

// ── Lucide icons ──
createIcons({ icons: { Leaf, Phone, Mail, X } });

// ── Ambient particle canvas ──
(function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function Particle() {
        this.reset(true);
    }

    Particle.prototype.reset = function (initial) {
        this.x  = Math.random() * (W || window.innerWidth);
        this.y  = initial ? Math.random() * (H || window.innerHeight) : (H || window.innerHeight) + 10;
        this.r  = Math.random() * 2.5 + .5;
        this.vy = -(Math.random() * .4 + .15);
        this.vx = (Math.random() - .5) * .2;
        this.o  = Math.random() * .25 + .05;
    };

    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y < -10) this.reset(false);
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(82,183,136,${this.o})`;
        ctx.fill();
    };

    function init() {
        resize();
        particles = Array.from({ length: 55 }, () => new Particle());
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    init();
    loop();
})();

// ── GSAP entrance animations ──
gsap.to('.brand',    { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: .3 });
gsap.to('#divider',  { width: 80,        duration: .8,   ease: 'power2.inOut', delay: .9 });
gsap.to('.headline', { opacity: 1,       duration: .9,   ease: 'power2.out', delay: 1.1 });
gsap.fromTo('.contact', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8, ease: 'power2.out', delay: 1.4 });
gsap.to('.cta-wrap', { opacity: 1,       duration: .7,   ease: 'power2.out', delay: 1.7 });
gsap.to('.footer',   { opacity: 1,       duration: .7,   ease: 'power2.out', delay: 2 });

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
