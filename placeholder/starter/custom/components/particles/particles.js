/** The full-bleed canvas this component draws on — also the page's animated backdrop. */
export const CANVAS_SELECTOR = '#bg-canvas';

/**
 * Drifting accent-coloured motes rising over the page background. Runs unconditionally once
 * started; the reveal is handled by fading the canvas, so it's already mid-flight when seen.
 *
 * @returns {void}
 */
export function initParticles() {
    const canvas = document.querySelector(CANVAS_SELECTOR);
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(true); }

        reset(initial) {
            this.x  = Math.random() * (W || window.innerWidth);
            this.y  = initial ? Math.random() * (H || window.innerHeight) : (H || window.innerHeight) + 10;
            this.r  = Math.random() * 2.5 + .5;
            this.vy = -(Math.random() * .4 + .15);
            this.vx = (Math.random() - .5) * .2;
            this.o  = Math.random() * .25 + .05;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -10) this.reset(false);
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212,240,0,${this.o})`;
            ctx.fill();
        }
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    particles = Array.from({ length: 55 }, () => new Particle());
    loop();
}
