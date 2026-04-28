import { initParticles } from './particles.js';
import './modal.js';

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
