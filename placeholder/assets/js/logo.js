export function initLogo() {
    const { gsap } = window;
    const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--pl-color-accent').trim();

    gsap.set('.pl-logo__mark',    { opacity: 0, y: 20 });
    gsap.set('.pl-logo__name',    { opacity: 0 });
    gsap.set('.pl-logo__lab',     { opacity: 0 });
    gsap.set('.pl-logo__tagline', { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.4 });

    // 1 — O rises slowly and settles
    tl.to('.pl-logo__mark', {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'sine.out',
    });

    // 2 — PREVENTION
    tl.to('.pl-logo__name', {
        opacity: 1,
        duration: 0.7,
        ease: 'sine.out',
    }, '-=0.3');

    // 3 — LAB
    tl.to('.pl-logo__lab', {
        opacity: 1,
        duration: 0.6,
        ease: 'sine.out',
    }, '-=0.2');

    // 4 — held breath: logo fully assembled, let it sit
    // 5 — halves displace + mark colourises — sine.inOut: smooth, unhurried, no snap
    tl.to('.pl-logo__o--left', {
        x: '-0.03em', y: '0.05em',
        duration: 1.0,
        ease: 'sine.inOut',
    }, '+=0.65');

    tl.to('.pl-logo__o--right', {
        x: '0.03em', y: '-0.05em',
        duration: 1.0,
        ease: 'sine.inOut',
    }, '<');

    tl.to('.pl-logo__name-o--l', {
        y: '0.05em',
        duration: 1.0,
        ease: 'sine.inOut',
    }, '<');

    tl.to('.pl-logo__name-o--r', {
        y: '-0.05em',
        duration: 1.0,
        ease: 'sine.inOut',
    }, '<');

    tl.to('.pl-logo__mark', {
        color: accent,
        duration: 1.0,
        ease: 'sine.inOut',
    }, '<');

    // 6 — tagline fades in cleanly
    tl.to('.pl-logo__tagline', {
        opacity: 1,
        duration: 0.7,
        ease: 'sine.out',
    });

    return tl;
}
