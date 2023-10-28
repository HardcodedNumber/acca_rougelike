//lesson 01
//Objective: Create a world, player, simple movement, camera

// Global Vars
///////////////////////////////////////////////////////////

let player, ground, groundSensor;

// Setup & draw
///////////////////////////////////////////////////////////

function setup() {
  // Create the canvas
  new Canvas("16:9");

  // Create the ground sprite
  ground = new Sprite();
  ground.height = 10;
  ground.width = width;
  ground.y = height - ground.height / 2;
  ground.color = '#FFFFFF';
  ground.collider = 'static';

  // Create the player
  player = new Sprite(width / 2 - 5, 300, 30, 30, 'dynamic');
  player.color = '#00FF00';
  player.rotationLock = true;

  //Create the ground sensor
  groundSensor = new Sprite(player.x, player.y + 5, 30, 25);
  groundSensor.visible = false;
  groundSensor.mass = 0.01;
  groundSensor.overlaps(allSprites);

  new GlueJoint(player, groundSensor);
}

function draw() {
  clear();
  background('#4361ee');

  // input handling
  if (groundSensor.overlapping(ground) &&
    (kb.presses('up') || kb.presses('space'))) {
    player.vel.y = -4.5;
  }

  let direction = createVector(0, 0);

  if (kb.pressing('W')) {
    direction.y = -1;
  }
  else if (kb.pressing('S')) {
    direction.y = 1;
  }

  if (kb.pressing('A')) {
    direction.x = -1;
  }
  else if (kb.pressing('D')) {
    direction.x = 1;
  }

  player.vel = direction.mult(5);

  //update camera 
  camera.x = player.x;
  camera.y = player.y;
}