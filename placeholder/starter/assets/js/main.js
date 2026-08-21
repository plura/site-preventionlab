import { initAnimations } from '../../custom/js/animations.js';
import './modal.js';

// Bespoke code — see starter/custom/README.md. animations.js moved here from assets/js/:
// it is this project's GSAP entrance sequence, not anything the starter ships.
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
