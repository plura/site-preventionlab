import { initLogo } from './logo.js';

export function initAnimations() {
    const { gsap } = window;

    const layoutEls = ['#divider', '.contact', '.cta-wrap', '.socials', '.footer'];

    // Remove non-logo elements from the flex layout so the logo starts visually centred
    gsap.set(layoutEls, { display: 'none' });

    initLogo().then(() => {
        const logo = document.querySelector('.pl-logo');

        // Capture logo's centred position before restoring siblings
        const centredTop = logo.getBoundingClientRect().top;

        // Restore siblings into layout (invisible, divider still collapsed)
        gsap.set(layoutEls, { clearProps: 'display' });
        gsap.set(layoutEls, { opacity: 0 });
        gsap.set('#divider', { width: 0 });

        // Capture logo's final flex position now that siblings take up space
        const finalTop = logo.getBoundingClientRect().top;

        // FLIP: push logo back to its centred visual position, then animate to natural position
        gsap.set('.pl-logo', { y: centredTop - finalTop });

        const tl = gsap.timeline();

        tl.to('.pl-logo',  { y: 0, duration: 1.2, ease: 'sine.inOut' });
        tl.to('#divider',  { width: 80, duration: 1.0, ease: 'sine.inOut' }, '-=0.4');
        tl.fromTo('.contact', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: 'sine.out' }, '-=0.3');
        tl.to('.cta-wrap', { opacity: 1, duration: 0.7, ease: 'sine.out' }, '-=0.2');
        tl.to('.socials',  { opacity: 1, duration: 0.7, ease: 'sine.out' }, '-=0.2');
        tl.to('.footer',   { opacity: 1, duration: 0.7, ease: 'sine.out' }, '-=0.2');
    });
}
