/**
 * Page entrance. The hero holds the stage alone and centred while its own intro runs, then
 * FLIPs down into its natural flex position as the rest of the layout cascades in around it.
 *
 * Nothing here knows what the hero *is* — the logo intro and the canvas backdrop are custom
 * (see starter/custom/), passed in from main.js so this file stays comparable to the starter.
 *
 * @param {object}   options
 * @param {string}   options.hero        Selector for the element that stays put while its siblings are pulled out of flow.
 * @param {Function} options.intro       Runs the hero's own animation; returns a thenable that settles when it's done.
 * @param {string}   [options.backdrop]  Selector for a full-bleed background layer, held hidden until the reveal.
 * @param {Function} [options.onReveal]  Fires as the reveal starts — for anything that must already be mid-flight by the time it's visible.
 * @returns {void}
 */
export function initAnimations({ hero, intro, backdrop, onReveal = () => {} }) {
    const { gsap } = window;

    // .footer is a semantic <footer> wrapper around .contact/.cta-wrap/.socials/.legal (see
    // index.html) rather than its own text node — animating it directly would gate the
    // visibility of everything nested inside via CSS opacity compounding, collapsing the
    // stagger. .legal (holding what .footer used to contain) takes its place in the sequence.
    const layoutEls = ['#divider', '.contact', '.cta-wrap', '.socials', '.legal'];

    if (backdrop) gsap.set(backdrop, { opacity: 0 });

    // Remove non-hero elements from the flex layout so the hero starts visually centred
    gsap.set(layoutEls, { display: 'none' });

    Promise.resolve(intro()).then(() => {
        const el = document.querySelector(hero);

        // Capture the hero's centred position before restoring siblings
        const centredTop = el.getBoundingClientRect().top;

        // Restore siblings into layout (invisible, divider still collapsed)
        gsap.set(layoutEls, { clearProps: 'display' });
        gsap.set(layoutEls, { opacity: 0 });
        gsap.set('#divider', { width: 0 });

        // Capture the hero's final flex position now that siblings take up space
        const finalTop = el.getBoundingClientRect().top;

        // FLIP: push the hero back to its centred visual position, then animate to natural position
        gsap.set(hero, { y: centredTop - finalTop });

        onReveal();

        const tl = gsap.timeline();

        if (backdrop) tl.to(backdrop, { opacity: 1, duration: 1.5, ease: 'sine.out' }, 0);
        tl.to(hero,        { y: 0, duration: 1.2, ease: 'sine.inOut' }, 0);
        tl.to('#divider',  { width: 80, duration: 1.0, ease: 'sine.inOut' }, '-=0.4');
        tl.fromTo('.contact', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: 'sine.out' }, '-=0.3');
        tl.to('.cta-wrap', { opacity: 1, duration: 0.7, ease: 'sine.out' }, '-=0.2');
        tl.to('.socials',  { opacity: 1, duration: 0.7, ease: 'sine.out' }, '-=0.2');
        tl.to('.legal',    { opacity: 1, duration: 0.7, ease: 'sine.out' }, '-=0.2');
    });
}
