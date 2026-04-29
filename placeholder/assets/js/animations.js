export function initAnimations() {
    const { gsap } = window;

    gsap.set(['.pl-logo', '.contact', '.cta-wrap', '.socials', '.footer'], { opacity: 0 });
    gsap.set('#divider', { width: 0 });

    gsap.to('.pl-logo',   { opacity: 1, duration: 1.2, ease: 'power3.out',   delay: .3 });
    gsap.to('#divider',   { width: 80,  duration: .8,  ease: 'power2.inOut', delay: 1  });
    gsap.fromTo('.contact',  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8, ease: 'power2.out', delay: 1.3 });
    gsap.to('.cta-wrap',  { opacity: 1, duration: .7,  ease: 'power2.out',   delay: 1.6 });
    gsap.to('.socials',   { opacity: 1, duration: .7,  ease: 'power2.out',   delay: 1.8 });
    gsap.to('.footer',    { opacity: 1, duration: .7,  ease: 'power2.out',   delay: 2   });
}
