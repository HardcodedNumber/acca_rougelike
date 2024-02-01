//lesson 02
//Objective: Movement, Scale, Rotation, Camera

// Global Vars
///////////////////////////////////////////////////////////
let player, block;
let playerImg;

// Setup & draw
///////////////////////////////////////////////////////////
function setup() {
  new Canvas("16:9");

  player = new Sprite(60, 30);
  block = new Sprite(100, height / 2, 60, 60, 'static');

  block.color = 'red';
  player.color = 'green';

  playerImg = loadImage('tile_0042.png');
  player.img = playerImg;
}

function draw() {
  clear();
  background('#4361ee');

// Movement
///////////////////////////////////////////////////////////

  //velocity
  //generally speaking direction * speed
  //player.vel.x = 1;
  //player.vel.y = 10;

  //moveTo(x, y, speed)
  //moves to a location
  //player.moveTo(mouse.x, mouse.y, 5);

  //moveTowards(x, y, percentage)
  //how many frames to move towards the target position
  //player.moveTowards(mouse.x, mouse.y, .05);

  //teleporting
  //instantly moving to a location
  if (mouse.presses()) {
    player.x = mouse.x;
    player.y = mouse.y;
  }

// Scaling
///////////////////////////////////////////////////////////
  let scaleX = 2;
  let scaleY = 2;

  //x2 in size
  if (kb.pressing('2')) {
    scaleX *= 2;
    scaleY *= 2;
  }

  //quarter of the size
  if (kb.pressing('3')) {
    scaleX *= 0.25;
    scaleY *= 0.25;
  }

  player.scale.x = scaleX;
  player.scale.y = scaleY;

// Rotation
// pivot rotate about based on the angle
///////////////////////////////////////////////////////////
  let rotation = player.rotation;

  if (kb.pressing('4')) {
    rotation += 5;
  }

  if (kb.pressing('5')) {
    rotation -= 5;
  }
  
  player.rotation = rotation;

// Camera
///////////////////////////////////////////////////////////
camera.x = player.x;
camera.y = player.y;
}
// Methods
///////////////////////////////////////////////////////////
