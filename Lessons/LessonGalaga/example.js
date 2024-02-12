//ship
let ship, shipSprite;
let shipSize = 25;

let health = 100;
let score = 0;

//bullets
let bulletSprite, bulletSpeed = 10;
let bullets = [];

//enemies
let enemies = [], enemySprite;
let maxEnemies = 5;
var enemyRowHeight = 50; // Adjust this value based on the height of each row

var stage = 1;
var stageTimer = 0, startStageTimer = false;

// Setup & draw
///////////////////////////////////////////////////////////
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

  var halfScreen = height / 2.5;

  for (var i = 0; i < enemies.length; ++i) {
    var enemy = enemies[i];
    var rowIndex = Math.floor(i / maxEnemies);
    var yThreshold = (rowIndex * enemyRowHeight) + halfScreen;

    if (enemy.y >= yThreshold && enemy.vel.y != 0) {
      console.log(enemy.vel);
      enemy.vel.y = 0;
      enemy.y = yThreshold;
    }
  }

  if (enemies.length == 0 && !startStageTimer) {
    stage += 1;
    startStageTimer = true;
    stageTimer = 0;
  }

  if (startStageTimer) {
    stageTimer += 1 / deltaTime;

    textSize(64);                       //Change the size of the text
    text("Stage: " + stage, width / 2, height / 2);

    if (stageTimer >= 3) {
      startStageTimer = false;

      spawnEnemies();
    }
  }

  if (kb.pressed('space')) {
    spawnBullet(ship.x, ship.y - 25);
  }

  bulletCollision();
  teleport();

  //dont use movement method
  movement(ship, shipSize);
}

// Methods
///////////////////////////////////////////////////////////
//this function will spawn a bullet at a location (x,y)
function spawnBullet(x, y) {
  var bullet = new Sprite(x, y, 10, 10);

  bullet.img = bulletSprite;
  //scale the bullets up
  bullet.scale = 0.1;
  bullet.vel.y = -bulletSpeed;
  bullet.rotationLock = true;

  bullets.push(bullet);
  //register when the bullet hits the enemy
  //overlaps(target : any, callback : function);
  // for (var i = 0; i < enemies.length; ++i) {
  //   var enemy = enemies[i]; //[0, 1, 2, 3, 4]

  //   bullet.overlaps(enemy, onBulletHit);
  // }
}

function bulletCollision() {
  for (var i = bullets.length - 1; i >= 0; --i) {
    var bullet = bullets[i];

    for (var j = enemies.length - 1; j >= 0; --j) {
      var enemy = enemies[j];

      if (bullet.collided(enemy)) {
        onBulletHit(bullet, enemy);
        break;
      }
    }
  }
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
      enemies.splice(i, 1);
      enemy.remove();
      break;
    }
  }

  score += 10;
}

function spawnEnemies() {
  var offset = width * 0.3;
  var numEnemies = stage * maxEnemies;

  for (var i = 0; i < numEnemies; i++) { //++i
    var xPosition = (i % maxEnemies) * 100 + offset;

    var rowIndex = Math.floor(i / maxEnemies);
    var yThreshold = (rowIndex * enemyRowHeight);

    var enemy = new Sprite(xPosition, yThreshold, 32, 32);
    enemy.img = enemySprite;
    enemy.vel.y = 2;
    enemy.rotationLock = true;

    enemies.push(enemy); //store the enemy in the array
  }
}