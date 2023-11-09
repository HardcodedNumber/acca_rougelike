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

let bulletSprite;
let gunEffectSprite;
let bullets = [];
let bulletOffset = 25;
let score = 0;

let backgroundMusic;
let bgMusicVolume = 0.2;

let pistolSFX;
let pistolSFXVolume = 0.5;

let playerFallSFX, playerHurtSFX, playerWalkSFX;
let playerSFXVolume = 0.5;

// Setup & draw
///////////////////////////////////////////////////////////
function preload() {
  player = new Sprite(0, 0, 16, 16, 'dynamic');

  player.addAni(PlayerState.Idle,
    'Assets/Art/Tiles/tile_0042.png'
  );

  player.addAni(PlayerState.Run,
    'Assets/Art/Tiles/tile_0041.png',
    'Assets/Art/Tiles/tile_0042.png'
  );

  player.anis.frameDelay = 30;

  heartFilledSprite = loadImage('Assets/Art/HeartFilled.png');
  heartEmptySprite = loadImage('Assets/Art/HeartEmpty.png');

  bulletSprite = loadImage('Assets/Art/Tiles/tile_0044.png');
  gunEffectSprite = loadImage('Assets/Art/Tiles/tile_0043.png');

  loadLevelAssets();

  soundFormats('mp3');

  backgroundMusic = loadSound('Assets/Sounds/backgroundMusic');
  pistolSFX = loadSound('Assets/Sounds/pistolSFX');
  playerFallSFX = loadSound('Assets/Sounds/playerFallSFX');
  playerHurtSFX = loadSound('Assets/Sounds/playerHurtSFX');
  playerWalkSFX = loadSound('Assets/Sounds/playerWalkSFX');
}

function setup() {
  // Setup world
  new Canvas(600, 300, "pixelated");
  world.gravity.y = 10;
  allSprites.pixelPerfect = true;

  createLevel();
  createPlayer();

  randomizeClouds();

  for (var i = 0; i < maxLives; ++i) {
    var heart = new Sprite(0, 32, 32, 32, 'none');

    heart.img = heartFilledSprite;
    heart.layer = 2;

    playerLives.push(heart);
  }

  backgroundMusic.play();
  backgroundMusic.amp(bgMusicVolume);

  playerFallSFX.amp(playerSFXVolume);
  playerHurtSFX.amp(playerSFXVolume);
  playerWalkSFX.amp(playerSFXVolume);
}

function draw() {
  clear();
  background('#fcdfcd');

  //audio
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
  }

  //input handling
  handleInput();

  updateEnemies();

  //collision
  handleLevelCollision(player);
  handleEnemyCollision(player, playerHurtSFX);

  if (player.y >= playerFallDeath) {
    player.x = playerSpawn[0].x;
    player.y = playerSpawn[0].y;

    playerFallSFX.play();

    player.lives--;
  }

  for (var i = bullets.length - 1; i >= 0; --i) {
    var bullet = bullets[i];

    if (bullet.x > camera.x + width / 2 || bullet.x <= camera.x - width / 2) {
      bullet.remove();
    }
  }

  //update camera 
  if (player.x + goalOffset <= goal[0].x) {
    camera.x = player.x;
    camera.y = player.y - cameraVerticalOffset;
  }

  //update UI
  updateLives();

  text(`Score ${score}`, width / 2, height / 6);

  if (player.lives <= 0) {
    text("Game Over! Reload window.", width / 2, height / 4);
    textAlign(CENTER);
  }
}

function mousePressed() {
  //As chrome and browsers don't like it when you spam
  //audio and other assets, this is a workaround
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

// Other Methods
///////////////////////////////////////////////////////////

function handleInput() {
  if (player.lives > 0) {

    //jumping
    if (isGrounded() &&
      (kb.presses('up') || kb.presses('space'))) {
      player.vel.y = -4;
    }

    // movement
    if (kb.pressing('A')) {
      player.vel.x = -playerSpeed;
      player.mirror.x = true;
      player.changeAni(PlayerState.Run);

      if (!playerWalkSFX.isPlaying()) {
        playerWalkSFX.play();
      }
    }
    else if (kb.pressing('D')) {
      player.vel.x = playerSpeed;
      player.mirror.x = false;
      player.changeAni(PlayerState.Run);

      if (!playerWalkSFX.isPlaying()) {
        a
        playerWalkSFX.play();
      }
    }
    else {
      player.vel.x = 0;
      player.changeAni(PlayerState.Idle);
      playerWalkSFX.stop();
    }

    // shooting
    if (kb.presses('F')) {
      createBullet();
    }
  }
}

function isGrounded() {
  return groundSensor.overlapping(platformLefts) ||
    groundSensor.overlapping(platformMiddles) ||
    groundSensor.overlapping(platformRights);
}

function createPlayer() {
  player.layer = 1;
  player.rotationLock = true;
  player.friction = 0;
  player.ani.play();
  player.lives = maxLives;
  player.lastHit = frameCount;

  groundSensor = new Sprite(0, 6, 8, 16);
  groundSensor.visible = false;
  groundSensor.mass = 0.01;
  groundSensor.overlaps(allSprites);

  new GlueJoint(player, groundSensor);

  player.x = playerSpawn[0].x;
  player.y = playerSpawn[0].y;
}

function createBullet() {
  var bulletSpawnPoint = player.mirror.x ? -bulletOffset : bulletOffset;
  var bullet = new Sprite(player.x + bulletSpawnPoint, player.y, 16, 16, 'kf');

  bullet.img = bulletSprite;
  bullet.vel.x = player.mirror.x ? -10 : 10;
  bullet.vel.y = 0;
  bullet.mirror.x = player.mirror.x;

  bullet.overlaps(slugs, onBulletHitSlug);
  bullet.overlaps(bees, onBulletHitBees);

  bullets.push(bullet);

  pistolSFX.amp(pistolSFXVolume);
  pistolSFX.play();
}

function updateLives() {
  for (var i = 0; i < maxLives; ++i) {
    playerLives[i].x = i * 32 + camera.x;
    playerLives[i].y = camera.y - (height * 0.4);
    playerLives[i].img = i < player.lives ? heartFilledSprite : heartEmptySprite;
  }
}

// Events
///////////////////////////////////////////////////////////

function onBulletHitSlug(bullet, slug) {
  bullets.unshift(bullet);

  slug.remove();
  bullet.remove();

  score += 100;
}

function onBulletHitBees(bullet, bee) {
  bullets.unshift(bullet);

  bee.remove();
  bullet.remove();

  score += 150;
}