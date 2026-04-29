import { initParticles }  from './particles.js';
import { initAnimations } from './animations.js';
import './modal.js';

const ANIMATIONS = true;

const { lucide } = window;

lucide.createIcons();
initParticles('bg-canvas');

if (ANIMATIONS) initAnimations();
