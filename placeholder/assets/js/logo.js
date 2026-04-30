export function initLogo() {
    const { gsap } = window;
    const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--pl-color-accent').trim();

    gsap.set('.pl-logo__mark',    { opacity: 0 });
    gsap.set('.pl-logo__name',    { opacity: 0 });
    gsap.set('.pl-logo__lab',     { opacity: 0 });
    gsap.set('.pl-logo__tagline', { opacity: 0, y: 4 });

    const tl = gsap.timeline({ delay: 0.3 });

    // 1 — big O fades in (no slide — let the form speak)
    tl.to('.pl-logo__mark', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
    });

    // 2 — PREVENTION appears
    tl.to('.pl-logo__name', {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
    }, '-=0.2');

    // 3 — LAB appears
    tl.to('.pl-logo__lab', {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
    }, '-=0.15');

    // 4 — deliberate pause before the logo comes alive
    // 5 — halves displace + mark colourises — power3.out snaps with intent
    tl.to('.pl-logo__o--left', {
        x: '-0.03em', y: '0.05em',
        duration: 0.7,
        ease: 'power3.out',
    }, '+=0.35');

    tl.to('.pl-logo__o--right', {
        x: '0.03em', y: '-0.05em',
        duration: 0.7,
        ease: 'power3.out',
    }, '<');

    tl.to('.pl-logo__name-o--l', {
        y: '0.05em',
        duration: 0.7,
        ease: 'power3.out',
    }, '<');

    tl.to('.pl-logo__name-o--r', {
        y: '-0.05em',
        duration: 0.7,
        ease: 'power3.out',
    }, '<');

    tl.to('.pl-logo__mark', {
        color: accent,
        duration: 0.7,
        ease: 'power3.out',
    }, '<');

    // 6 — tagline drifts in after displacement settles
    tl.to('.pl-logo__tagline', {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
    });

    return tl;
}
