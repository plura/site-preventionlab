import { initParticles }  from './particles.js';
import { initLogo }       from './logo.js';
import { initAnimations } from './animations.js';
import './modal.js';

const { lucide } = window;

lucide.createIcons();
initParticles('bg-canvas');
initLogo();
initAnimations();  // comment out to disable entrance animations while working on layout
