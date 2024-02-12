//ship
let ship, shipSprite;
let shipSize = 25;

let health = 100;
let score = 0;

//bullets
let bullets = [];
let bulletSprite, bulletSpeed = 10;
let bulletSFX;

//enemies
let enemies = [], enemySprite;
let maxEnemies = 5;
let enemyHeight = 50;
var enemySpeed = 2;

let stage = 1;
let showStageDisplay = true;
let stageTimer = 0;
let maxStageTime = 180;

// Setup & draw
///////////////////////////////////////////////////////////
function preload() {
  //soundFormats('mp3');

  bulletSFX = loadSound('lazer.mp3');
}

function setup() {
  new Canvas("16:9");
  frameRate(60);

  //Create the player
  //place the ship towards the middle, bottom of the screen
  //Sprite(x, y, w, h)
  ship = new Sprite(width / 2, height - height * 0.25, shipSize, shipSize);
  shipSprite = loadImage('ship.jpeg'); //replace this with that long url
  ship.img = shipSprite;
  ship.layer = 1;
  ship.rotationLock = true;

  //bullets
  //soundFormats('mp3');

  bulletSprite = loadImage('bullet.png');

  //enemies
  enemySprite = loadImage('enemy.png');

  spawnEnemies();
}

function draw() {
  clear();
  background('#000000');
  _internalSpawnStars();

  fill('limegreen');                  //Change the color text
  textSize(32);                       //Change the size of the text
  text("Health: " + health, 60, 30);  //Displaying the health at (x=60, y=30)
  text("Score: " + score, 60, 64);

  if (kb.pressed('space')) {
    spawnBullet(ship.x, ship.y - 25);
  }

  if (enemies.length <= 0) {
    stage++;
    showStageDisplay = true;

    spawnEnemies();
  }

  if (showStageDisplay) {
    stageTimer += deltaTime;

    textSize(72);
    text("Stage: " + stage, width / 2, height / 2);

    if (stageTimer >= maxStageTime) {
      showStageDisplay = false;
      stageTimer = 0;
    }
  }

  for (var i = 0; i < enemies.length; ++i) {
    var enemy = enemies[i];

    if (enemy.y >= height / 2) {
      enemy.vel.y = 0;
    }
  }

  for (var enemyIter = enemies.length - 1; enemyIter >= 0; --enemyIter) {
    var enemy = enemies[enemyIter];

    for (var bulletIter = bullets.length - 1; bulletIter >= 0; --bulletIter) {
      var bullet = bullets[bulletIter];

      if (bullet.collided(enemy)) {
        onBulletHit(bullet, enemy);
        break;
      }
    }
  }

  teleport();

  //dont use movement method
  movement(ship, shipSize);
}

// Methods == function
///////////////////////////////////////////////////////////
function spawnEnemies() {
  var offset = width * 0.3;
  var totalEnemies = maxEnemies * stage;

  for (var i = 0; i < totalEnemies; i++) {
    var xPosition = (i % maxEnemies) * 100 + offset;

    var rowIndex = Math.floor(i / maxEnemies);
    var yPosition = (rowIndex * -enemyHeight);

    var enemy = new Sprite(xPosition, yPosition, 32, 32);
    enemy.img = enemySprite;
    enemy.vel.y = enemySpeed;
    enemy.rotationLock = true;

    enemies.push(enemy); //store the enemy in the array
  }
}

//this function will spawn a bullet at a location (x,y)
function spawnBullet(x, y) {
  var bullet = new Sprite(x, y, 10, 10);

  bullet.img = bulletSprite;
  //scale the bullets up
  bullet.scale = 0.1;
  bullet.vel.y = -bulletSpeed;

  bullets.push(bullet);
  bulletSFX.play();
  //register when the bullet hits the enemy
  //overlaps(target : any, callback : function);
  // for (var i = 0; i < enemies.length; ++i) {
  //   var enemy = enemies[i]; //[0, 1, 2, 3, 4]

  //   bullet.overlaps(enemy, onBulletHit);
  // }
}

//this will wrap the player around the screen in the x-axis
function teleport() {
  //too far left
  //shipSize == 25
  //halfShipSize == shipSize / 2
  //halfShipSize == 25 /2
  var halfShipSize = shipSize * 0.5;

  if (ship.x < halfShipSize) {
    ship.x = width - halfShipSize;
  }

  if (ship.x + halfShipSize > width) {
    ship.x = halfShipSize;
  }
}

//This occurs when the bullet hits an enemy
function onBulletHit(bullet, enemy) {
  bullet.remove();

  for (var i = enemies.length - 1; i >= 0; --i) {
    if (enemies[i] == enemy) {
      enemies.splice(i, 1);   //removes n elements out of the array
      enemy.remove();

      break;
    }
  }
  //score = score + 10;
  score += 10;
}