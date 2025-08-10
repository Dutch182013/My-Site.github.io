class Draw_Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawCircle(x, y, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawRectangle(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawText(text, x, y, font = '16px Arial', color = 'black') {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }

  drawImage(image, x, y, width, height) {
    this.ctx.drawImage(image, x, y, width, height);
  }

  setLineWidth(width) {
    this.ctx.lineWidth = width;
  }

  setStrokeStyle(color) {
    this.ctx.strokeStyle = color;
  }

  strokeCircle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  strokeRect(x, y, width, height) {
    this.ctx.strokeRect(x, y, width, height);
  }

  save() {
    this.ctx.save();
  }

  restore() {
    this.ctx.restore();
  }
}

const DRAWS = new Draw_Canvas(document.querySelector('canvas') || document.createElement('canvas'));
DRAWS.canvas.width = window.innerWidth;
DRAWS.canvas.height = window.innerHeight;
document.body.appendChild(DRAWS.canvas);

window.addEventListener('resize', () => {
  DRAWS.canvas.width = window.innerWidth;
  DRAWS.canvas.height = window.innerHeight;
  DRAWS.clear();
});

// DRAWS.clear();
// DRAWS.drawText('Welcome to the Canvas!', 50, 50, '24px Arial', 'blue');

const backgroundColor = () => {
  DRAWS.clear();
  DRAWS.drawRectangle(0, 0, DRAWS.canvas.width, DRAWS.canvas.height, 'rgba(0, 0, 0)');
}

class PartiCle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    DRAWS.drawCircle(this.x, this.y, this.radius, this.color);
  }

  move (targetX, targetY, radius, g) {
    let fx = 0;
    let fy = 0;

    // Calculate the distance to the target
    if (targetX === undefined || targetY === undefined) {
      console.error('Target coordinates are not defined');
      return;
    }
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If the distance is zero, do not apply any force
    if (distance === 0) return;

    // Check for collision with the target particle
    if (distance < radius + this.radius) {
      // Simple collision response: reverse direction
      this.vx *= -1;
      this.vy *= -1;
      // Optionally, you can also reset position to avoid overlap
      this.x -= fx;
      this.y -= fy;
      this.radius -= Math.random() * this.radius; // Randomize radius on collision
      this.color = `rgba(250, 248, 248, 1)`; // Change color on collision
    }else if (distance > radius + this.radius || distance < (radius + this.radius ** 2)) {
      // Calculate the gravitational-like force
      fx = (dx / distance) * g * this.radius;
      fy = (dy / distance) * g * this.radius;

      // Update velocity
      this.vx += fx;
      this.vy += fy;

      // Update position
      this.x += this.vx;
      this.y += this.vy;
    }
  }

}

const particles = [];

function createParticles(number, color) {
  let group = [];
  for (let i = 0; i < number; i++) {
    const x = Math.random() * DRAWS.canvas.width;
    const y = Math.random() * DRAWS.canvas.height;
    const radius = Math.random() * 5 + 1; // Random radius between 1 and 6
    group.push(new PartiCle(x, y, radius, color));
  }
  particles.push(...group);
  updateParticles();
  return group;
}

function updateParticles() {
  particles.forEach(particle => {
    particle.draw();
    if (particle.radius <= 0) {
      const index = particles.indexOf(particle);
      if (index > -1) {
        particles.splice(index, 1); // Remove particle if radius is zero or less
      }
    }
  });
}

function ruleParticles(particle_group1, particle_group2) {
  particle_group1.forEach(particle => {
    particle_group2.forEach(otherParticle => {
      particle.move(otherParticle.x, otherParticle.y, otherParticle.radius, 0.0000001); // Adjust the gravitational-like force as needed
    });
  });
}

let particleGroup1 = createParticles(100, 'rgba(0, 81, 255, 1)');
let particleGroup2 = createParticles(100, 'rgba(200, 50, 50, 1)');

window.onload = () => {
  setInterval(() => {
    // PartiCle animation or any other drawing logic can go here
    DRAWS.clear();
    backgroundColor();

    ruleParticles(particleGroup1, particleGroup2);
    ruleParticles(particleGroup2, particleGroup1);
    updateParticles();

  }, 1000 / 60); // 60 FPS
};