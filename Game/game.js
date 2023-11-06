//Rouge like game

// Defines
///////////////////////////////////////////////////////////

const PlayerState = {
  Idle: 'idle',
  Run: 'run'
};

// Global Vars
///////////////////////////////////////////////////////////
var tileSize = 16;
var playerSpeed = 3;
var goalOffset = 100;
var cameraVerticalOffset = 25;
var playerFallDeath = 300;

let player, playerSprite, groundSensor;
let playerIdle, playerRun;

let playerLives = [], heartFilledSprite, heartEmptySprite;
let maxLives = 3;

// Setup & draw
///////////////////////////////////////////////////////////
function preload() {
  player = new Sprite(0, 0, 16, 16, 'dynamic');

  player.addAni(PlayerState.Idle,
    'Assets/Art/tiles/tile_0042.png'
  );

  player.addAni(PlayerState.Run,
    'Assets/Art/tiles/tile_0041.png',
    'Assets/Art/tiles/tile_0042.png'
  );

  player.anis.frameDelay = 30;

  heartFilledSprite = loadImage('Assets/Art/HeartFilled.png');
  heartEmptySprite = loadImage('Assets/Art/HeartEmpty.png');

  LoadLevelAssets();
}

function setup() {
  // Setup world
  new Canvas(600, 300, "pixelated");
  world.gravity.y = 10;
  allSprites.pixelPerfect = true;

  CreateLevel();

  player.layer = 1;
  player.rotationLock = true;
  player.friction = 0;
  player.ani.play();
  player.lives = maxLives;

  groundSensor = new Sprite(0, 6, 8, 16);
  groundSensor.visible = false;
  groundSensor.mass = 0.01;
  groundSensor.overlaps(allSprites);

  new GlueJoint(player, groundSensor);

  player.x = playerSpawn[0].x;
  player.y = playerSpawn[0].y;

  RandomizeClouds();

  for (var i = 0; i < maxLives; ++i) {
    var heart = new Sprite(0, 32, 32, 32, 'none');

    heart.img = heartFilledSprite;
    heart.layer = 2;

    playerLives.push(heart);
  }
}

function draw() {
  clear();
  background('#fcdfcd');

  // input handling
  if (player.lives > 0) {
    if (isGrounded() &&
      (kb.presses('up') || kb.presses('space'))) {
      player.vel.y = -4;
    }

    if (kb.pressing('A')) {
      player.vel.x = -playerSpeed;
      player.mirror.x = true;
      player.changeAni(PlayerState.Run);
    }
    else if (kb.pressing('D')) {
      player.vel.x = playerSpeed;
      player.mirror.x = false;
      player.changeAni(PlayerState.Run);
    }
    else {
      player.vel.x = 0;
      player.changeAni(PlayerState.Idle);
    }
  }

  //collision
  HandleLevelCollision(player);

  if (player.y >= playerFallDeath) {
    player.x = playerSpawn[0].x;
    player.y = playerSpawn[0].y;

    player.lives--;
  }

  //update camera 
  if (player.x + goalOffset <= goal[0].x) {
    camera.x = player.x;
    camera.y = player.y - cameraVerticalOffset;
  }

  //update player lives
  updateLives();

  if (player.lives <= 0) {
    text("Game Over! Reload window.a", width / 2, height / 4);
    textAlign(CENTER);
  }
}

function isGrounded() {
  return groundSensor.overlapping(platformLeft) ||
    groundSensor.overlapping(platformMiddle) ||
    groundSensor.overlapping(platformRight);
}

// Other Methods
///////////////////////////////////////////////////////////

function updateLives() {
  for (var i = 0; i < maxLives; ++i) {
    playerLives[i].x = i * 32 + camera.x;
    playerLives[i].y = camera.y - (height * 0.4);
    playerLives[i].img = i < player.lives ? heartFilledSprite : heartEmptySprite;
  }
}