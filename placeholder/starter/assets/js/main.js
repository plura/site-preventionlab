import { initAnimations } from './animations.js';
import './modal.js';

// Bespoke components — see starter/custom/README.md
import { initLogo, LOGO_SELECTOR } from '../../custom/components/logo/logo.js';
import { initParticles, CANVAS_SELECTOR } from '../../custom/components/particles/particles.js';

const ANIMATIONS = true;

const { lucide } = window;

lucide.createIcons();

if (ANIMATIONS) {
    initAnimations({
        hero:     LOGO_SELECTOR,
        intro:    initLogo,
        backdrop: CANVAS_SELECTOR,
        onReveal: initParticles,
    });
} else {
    initParticles();
}
