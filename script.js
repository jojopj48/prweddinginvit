// Celebration Effect Class
class CelebrationEffect {
    constructor() {
        this.canvas = document.getElementById('celebrationCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle(x, y) {
        // Only hearts in red/pink colors
        const colors = ['#ff0066', '#ff1493', '#ff69b4', '#ff3366', '#ff0044', '#ff5588'];
        
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 20,
            vy: Math.random() * -25 - 10,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            size: Math.random() * 25 + 15, // Nice sized hearts
            color: colors[Math.floor(Math.random() * colors.length)],
            type: 'heart', // Only hearts
            gravity: 0.3,
            life: 1,
            decay: Math.random() * 0.006 + 0.003
        };
    }

    drawHeart(ctx, x, y, size, color, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillStyle = color;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
        ctx.bezierCurveTo(-size / 2, (topCurveHeight + size) / 2, 0, (topCurveHeight + size) / 1.5, 0, size);
        ctx.bezierCurveTo(0, (topCurveHeight + size) / 1.5, size / 2, (topCurveHeight + size) / 2, size / 2, topCurveHeight);
        ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.fill();
        ctx.restore();
    }

    drawStar(ctx, x, y, size, color, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    drawFlower(ctx, x, y, size, color, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillStyle = color;
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.arc(Math.cos(i * Math.PI / 3) * size / 3, Math.sin(i * Math.PI / 3) * size / 3, size / 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(0, 0, size / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    drawSparkle(ctx, x, y, size, color, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.moveTo(-size * 0.7, -size * 0.7);
        ctx.lineTo(size * 0.7, size * 0.7);
        ctx.moveTo(-size * 0.7, size * 0.7);
        ctx.lineTo(size * 0.7, -size * 0.7);
        ctx.stroke();
        ctx.restore();
    }

    drawConfetti(ctx, x, y, size, color, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillStyle = color;
        ctx.fillRect(-size / 2, -size / 2, size, size / 3);
        ctx.restore();
    }

    drawCircle(ctx, x, y, size, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    drawParticle(particle) {
        this.ctx.globalAlpha = particle.life;
        this.drawHeart(this.ctx, particle.x, particle.y, particle.size, particle.color, particle.rotation);
        this.ctx.globalAlpha = 1;
    }

    updateParticle(particle) {
        particle.vy += particle.gravity;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.life -= particle.decay;
        
        return particle.life > 0 && particle.y < this.canvas.height + 100;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles = this.particles.filter(particle => {
            const alive = this.updateParticle(particle);
            if (alive) this.drawParticle(particle);
            return alive;
        });

        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }

    burst() {
        // Beautiful heart burst from bottom
        const burstPoints = 10;
        const width = this.canvas.width;
        const particlesPerBurst = 50;

        for (let i = 0; i < burstPoints; i++) {
            const x = (width / (burstPoints + 1)) * (i + 1);
            const y = this.canvas.height;
            
            setTimeout(() => {
                for (let j = 0; j < particlesPerBurst; j++) {
                    this.particles.push(this.createParticle(x, y));
                }
            }, i * 80);
        }

        // Center burst for extra impact
        setTimeout(() => {
            for (let i = 0; i < 100; i++) {
                this.particles.push(this.createParticle(width / 2, this.canvas.height));
            }
        }, 300);

        if (!this.animationId) {
            this.animate();
        }
    }
}

// Initialize celebration effect
const celebration = new CelebrationEffect();

// Create Tulsi/Aalila Leaves
function createTulsiLeaves(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tulsiSVG = `
        <svg viewBox="0 0 50 70" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#66BB6A;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#388E3C;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Main leaf shape -->
            <ellipse cx="25" cy="35" rx="12" ry="25" fill="url(#leafGradient)"/>
            <!-- Center vein -->
            <line x1="25" y1="10" x2="25" y2="60" stroke="#2E7D32" stroke-width="1.5"/>
            <!-- Side veins -->
            <line x1="25" y1="20" x2="18" y2="28" stroke="#2E7D32" stroke-width="0.8" opacity="0.7"/>
            <line x1="25" y1="20" x2="32" y2="28" stroke="#2E7D32" stroke-width="0.8" opacity="0.7"/>
            <line x1="25" y1="30" x2="17" y2="38" stroke="#2E7D32" stroke-width="0.8" opacity="0.7"/>
            <line x1="25" y1="30" x2="33" y2="38" stroke="#2E7D32" stroke-width="0.8" opacity="0.7"/>
            <line x1="25" y1="40" x2="18" y2="48" stroke="#2E7D32" stroke-width="0.8" opacity="0.7"/>
            <line x1="25" y1="40" x2="32" y2="48" stroke="#2E7D32" stroke-width="0.8" opacity="0.7"/>
            <!-- Stem -->
            <line x1="25" y1="60" x2="25" y2="68" stroke="#795548" stroke-width="2"/>
        </svg>
    `;
    
    for (let i = 0; i < count; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'tulsi-leaf';
        leaf.innerHTML = tulsiSVG;
        
        // Random positioning
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.top = Math.random() * 100 + '%';
        leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
        leaf.style.opacity = Math.random() * 0.3 + 0.2;
        
        // Random size variation
        const size = Math.random() * 40 + 40;
        leaf.style.width = size + 'px';
        leaf.style.height = (size * 1.3) + 'px';
        
        container.appendChild(leaf);
    }
}

// Add leaves to sections
document.addEventListener('DOMContentLoaded', () => {
    createTulsiLeaves('welcomeTulsi', 15);
    createTulsiLeaves('tulsiContainer', 20);
});

// Loader and Welcome Screen Logic
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const revealBtn = document.getElementById('revealBtn');

    // Show loader for 3 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
    }, 3000);

    // Reveal button click with celebration
    revealBtn.addEventListener('click', () => {
        // Disable button to prevent multiple clicks
        revealBtn.disabled = true;
        revealBtn.style.opacity = '0.7';
        
        // Start heart celebration effect
        celebration.burst();
        
        // Add one more burst for good measure
        setTimeout(() => {
            celebration.burst();
        }, 600);
        
        // Fade out welcome screen
        setTimeout(() => {
            welcomeScreen.style.animation = 'fadeOut 1s forwards';
        }, 1200);
        
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            startCountdown();
        }, 2200);
    });
});

// Countdown Timer
function startCountdown() {
    // Wedding date: May 13, 2026 at 9:30 AM
    const weddingDate = new Date('2026-05-13T09:30:00').getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<p style="font-size: 2rem; color: var(--dark-pink);">The Wedding Day is Here! 💕</p>';
        }
    }, 1000);
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-out animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);
