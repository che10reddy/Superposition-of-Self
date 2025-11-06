let particles = [];
let t = 0;

function setup() {
  createCanvas(800, 800);
  pixelDensity(2);
  colorMode(HSB, 360, 100, 100, 255);
  noStroke();

  // Initialize quantum field particles
  for (let i = 0; i < 500; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      a: random(TWO_PI),
      r: random(1, 2),
      hue: random(210, 270) // indigo–violet base
    });
  }
}

function draw() {
 
   // With this softer gradient for more depth:
   for (let y = 0; y < height; y++) {
    let c = map(y, 0, height, 240, 220);
    stroke(c, 40, 10, 10);
    line(0, y, width, y);
}
noStroke();

  // Smooth field evolution
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let angle = noise(p.x * 0.002, p.y * 0.002, t) * TWO_PI * 2;
    p.x += cos(angle) * 0.4 + sin(t + p.a) * 0.2;
    p.y += sin(angle) * 0.4 + cos(t + p.a) * 0.2;



    // Wrap edges
    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
    if (p.y > height) p.y = 0;
    if (p.y < 0) p.y = height;

    // Distance from observer
    let d = dist(mouseX, mouseY, p.x, p.y);
    let collapse = constrain(1 - d / 250, 0, 1);

    // Interference glow: violet → gold near cursor
    let base = color(240, 50, 90);  // indigo
    let observed = color(45, 80, 100); // gold-white
    let col = lerpColor(base, observed, collapse);
    let alpha = 150 + collapse * 100;

    fill(hue(col), saturation(col), brightness(col), alpha);
    ellipse(p.x, p.y, p.r * (1 + collapse * 3));
  }

  // Observation glow (perceptual collapse)
  if (mouseX > 0 && mouseY > 0) {
    blendMode(ADD);
    let pulse = 35 + 10 * sin(frameCount * 0.05);
    for (let i = 0; i < 3; i++) {
      fill(45, 30, 100, 60);
      ellipse(mouseX, mouseY, pulse * (1 + i * 0.5));
    }
    blendMode(BLEND);
  }

  // Subtle vignette
  fill(0, 0, 0, 120);
  rect(0, 0, width, height);

  t += 0.005;
}
