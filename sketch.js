function w(val) {
  if (val == null) return width;
  return width * val;
}

function h(val) {
  if (val == null) return height;
  return height * val;
}

function setup() {
  createCanvas(800, 800);
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

function distortPolygon(polygon) {
  return polygon.map(point => {
    const x = point[0];
    const y = point[1];
    const distance = dist(0.5, 0.5, x, y);
    
    const noiseFn = (x, y) => {
      const noiseX = (x + 0.31) * distance * 2;
      const noiseY = (y - 1.73) * distance * 2;
      return noise(noiseX, noiseY, frameCount / 500);
    };
        
    const theta = noiseFn(x, y) * Math.PI * 2;
    
    const amountToNudge = 0.1;
    const newX = x + (amountToNudge * Math.cos(theta));
    const newY = y + (amountToNudge * Math.sin(theta));
    
    return [newX, newY];
  });
}

function draw() {
  background(0, 0, 255);
  noFill();
  stroke(0, 0, 0);
  strokeWeight(w(0.001));

  for (let radius = 0.05; radius < 0.7; radius += 0.01) {
    const circle = makeCircle(20, radius);
    const distortedCircle = distortPolygon(circle);
    
    
    beginShape();
    distortedCircle.forEach(point => {
      vertex(w(point[0]), h(point[1]));
    });
    endShape(CLOSE);
  }


}
