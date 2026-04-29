export function initLogo() {
    const { gsap } = window;
    const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--pl-color-accent').trim();

    gsap.set('.pl-logo__mark',    { opacity: 0, y: 24 });
    gsap.set('.pl-logo__name',    { opacity: 0 });
    gsap.set('.pl-logo__lab',     { opacity: 0 });
    gsap.set('.pl-logo__tagline', { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    // 1 — big O fades in and slides up
    tl.to('.pl-logo__mark', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
    });

    // 2 — PREVENTION appears
    tl.to('.pl-logo__name', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
    }, '-=0.2');

    // 3 — LAB appears
    tl.to('.pl-logo__lab', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
    }, '-=0.1');

    // 4 — halves displace + mark colourises
    //   one tween per element (x+y combined) avoids GSAP transform conflicts
    //   same em value = proportional displacement relative to each element's font-size
    tl.to('.pl-logo__o--left', {
        x: '-0.03em', y: '0.05em',
        duration: 0.85,
        ease: 'power2.inOut',
    }, '+=0.15');

    tl.to('.pl-logo__o--right', {
        x: '0.03em', y: '-0.05em',
        duration: 0.85,
        ease: 'power2.inOut',
    }, '<');

    tl.to('.pl-logo__name-o--l', {
        y: '0.05em',
        duration: 0.85,
        ease: 'power2.inOut',
    }, '<');

    tl.to('.pl-logo__name-o--r', {
        y: '-0.05em',
        duration: 0.85,
        ease: 'power2.inOut',
    }, '<');

    tl.to('.pl-logo__mark', {
        color: accent,
        duration: 0.85,
        ease: 'power2.inOut',
    }, '<');

    // 5 — tagline appears after displacement completes
    tl.to('.pl-logo__tagline', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
    });

    return tl;
}
