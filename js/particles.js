class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * 1,
            y: (Math.random() - 0.5) * 1
        };
        this.radius = Math.random() * 1.5;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            '#4facfe',  // bright blue
            '#00f2fe',  // cyan
            '#7f00ff',  // purple
            '#e100ff',  // pink
            '#ffffff'   // white
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {
        if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > this.canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Connect particles within 100px radius
        particles.forEach(particle => {
            const distance = Math.sqrt(
                Math.pow(this.x - particle.x, 2) + 
                Math.pow(this.y - particle.y, 2)
            );
            if (distance < 100) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance/500})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.moveTo(this.x, this.y);
                this.ctx.lineTo(particle.x, particle.y);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        });

        this.draw();
    }
}

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.background = 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)';
}

function createParticles() {
    const particleCount = Math.min(window.innerWidth * window.innerHeight / 9000, 200);
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, ctx));
    }
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
    });
}

function handleResize() {
    cancelAnimationFrame(animationFrameId);
    initCanvas();
    createParticles();
    animate();
}

// Initialize
window.addEventListener('load', () => {
    initCanvas();
    createParticles();
    animate();
});

window.addEventListener('resize', handleResize);
