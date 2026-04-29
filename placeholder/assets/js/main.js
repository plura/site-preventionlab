import { initParticles }  from './particles.js';
import { initLogo }       from './logo.js';
import { initAnimations } from './animations.js';
import './modal.js';

const ANIMATIONS = true;

const { lucide } = window;

lucide.createIcons();
initParticles('bg-canvas');
initLogo();

if (ANIMATIONS) initAnimations();
