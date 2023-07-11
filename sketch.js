function w(val) {
  if (val == null) return width;
  return width * val;
}

function h(val) {
  if (val == null) return height;
  return height * val;
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 1.0);
}

function makeCircle(numSides, radius) {
  const points = [];
  const radiansPerStep = (Math.PI * 2) / numSides;
  for (let theta = 0; theta < Math.PI * 2; theta += radiansPerStep) {
    const x = 0.5 + radius * Math.cos(theta);
    const y = 0.5 + radius * Math.sin(theta);
    
    points.push([x, y]);
  }
  return points;
}

function draw() {
  background(0, 0, 255);
  noFill();
  stroke(0, 0, 0);
  strokeWeight(w(0.001));

  // radius += 0.02;
  for (let radius = 0.05; radius < 0.7; radius += 0.01) {
    // const points = makeCircle(20, radius);
    const points = makeCircle(20, radius).map(point => {
      const x = point[0];
      const y = point[1];
      const theta = noise(x, y) * Math.PI * 2;
      
      const amountToNudge = 0.1;
      const newX = x + (amountToNudge * Math.cos(theta));
      const newY = y + (amountToNudge * Math.sin(theta));
      
      return [newX, newY];
    });
    
    beginShape();
    points.forEach(point => {
      vertex(w(point[0]), h(point[1]));
    });
    endShape(CLOSE);
  }


}
