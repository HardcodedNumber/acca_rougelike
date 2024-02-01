//lesson 01
//Objective: Create a world, player, simple movement

// Global Vars
///////////////////////////////////////////////////////////

let player, ground, groundSensor;

function setup() {
  // Create the canvas
  new Canvas("16:9");
  world.gravity.y = 10;

  // Create the ground sprite
  ground = new Sprite();
  ground.height = 10;
  ground.width = width;
  ground.y = height - ground.height / 2;
  ground.color = '#FFFFFF';
  ground.collider = 'static';

  // Create the player
  player = new Sprite(width / 2 - 5, height - ground.height / 2 - 5, 30, 30, 'dynamic');
  player.color = '#00FF00';
  player.rotationLock = true;
  player.friction = 0;

  //Create the ground sensor
  groundSensor = new Sprite(player.x, player.y + 5, 30, 22);
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

  if (kb.pressing('A')) {
    player.vel.x = -5;
  }
  else if (kb.pressing('D')) {
    player.vel.x = 5;
  }
  else {
    player.vel.x = 0;
  }

  //update camera 
  camera.x = player.x + 20;
}