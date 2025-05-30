
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

const blobs = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 100 + Math.random() * 80,
    vx: 0,
    vy: 0,
    opacity: 0.05 + Math.random() * 0.08
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let b of blobs) {
        // Calculate attraction to mouse
        let dx = mouse.x - b.x;
        let dy = mouse.y - b.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let force = Math.min(100 / dist, 0.05); // Cap force

        b.vx += dx * force * 0.01;
        b.vy += dy * force * 0.01;

        // Damping for smoothness
        b.vx *= 0.96;
        b.vy *= 0.96;

        b.x += b.vx;
        b.y += b.vy;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(0,255,255,${b.opacity})`);
        grad.addColorStop(0.5, `rgba(0,100,255,${b.opacity * 0.7})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
