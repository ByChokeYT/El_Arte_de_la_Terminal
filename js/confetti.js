// ============================================
// CONFETTI.JS - Motor de animación de confeti
// ============================================

let canvas, ctx, particles = [];
const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export function initConfetti() {
    canvas = document.getElementById("confetti-canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

export function triggerConfetti(count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x:             canvas.width  / 2 + (Math.random() - 0.5) * 50,
            y:             canvas.height / 2 + (Math.random() - 0.5) * 50,
            vx:            (Math.random() - 0.5) * 15,
            vy:            (Math.random() - 1)   * 15 - 5,
            color:         COLORS[Math.floor(Math.random() * COLORS.length)],
            size:          Math.random() * 8 + 4,
            rotation:      Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            alpha:         1
        });
    }

    // Iniciar el loop solo si no está corriendo ya
    if (particles.length === count) {
        requestAnimationFrame(updateConfetti);
    }
}

function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.35;   // gravedad
        p.vx *= 0.98;   // fricción
        p.rotation += p.rotationSpeed;
        p.alpha    -= 0.015; // desvanecer

        if (p.alpha <= 0 || p.y > canvas.height) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
    }

    if (particles.length > 0) {
        requestAnimationFrame(updateConfetti);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
