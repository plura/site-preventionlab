import { initParticles }  from './particles.js';
import { initLogo }       from './logo.js';
import { initAnimations } from './animations.js';
import './modal.js';

const ANIMATIONS = true;

const { gsap, lucide } = window;

lucide.createIcons();
initParticles('bg-canvas');
initLogo();

if (ANIMATIONS) {
    initAnimations();
} else {
    gsap.set(['.pl-logo', '.contact', '.cta-wrap', '.socials', '.footer'], { opacity: 1 });
    gsap.set('#divider', { width: 80 });
}
