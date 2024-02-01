//lesson Asteroids
//Objective: Create player, move player, shoot

// Global Vars
///////////////////////////////////////////////////////////

//ship
let ship, shipSprite;
let shipSize = 25;
let health = 100;
let score = 0;

//bullets
let bulletSprite, bulletSpeed = 10;

//enemy
let enemySprite;

// Setup & draw
///////////////////////////////////////////////////////////
function setup() {
  new Canvas("16:9");
  frameRate(60);

  //place the ship towards the middle, bottom of the screen
  ship = new Sprite(width / 2, height - height * 0.25, shipSize, shipSize);
  shipSprite = loadImage('ship.jpeg'); //replace this with that long url
  ship.img = shipSprite;
  ship.rotationLock = true;

  bulletSprite = loadImage('bullet.png');
  enemySprite = loadImage('enemy.png');
  spawnEnemy_internal(enemySprite);
}

function draw() {
  clear();
  background('#000000');

  fill('limegreen');
  textSize(32);
  text('Health: ' + health, 6, 30);
  text('Score: ' + score, 6, 62);

  if (kb.pressed('space')) {
    spawnBullet(ship.x, ship.y - 25);
  }

  teleport_internal(shipSize);
  movement(ship, speed, shipSize);

  for (var i = enemies.length - 1; i >= 0; --i) {
    if (ship.collides(enemies[i])) {
      enemies[i].remove();
      health -= 20;
    }
  }

  if (health <= 0) {
    health = 100;
    score = 0;

    console.log(enemies.length);

    while (enemies.length > 0) {
      var e = enemies.pop();

      e.remove();
    }

    spawnEnemy_internal(enemySprite);

    ship.x = width / 2;
    ship.y = height - health * 0.25;
  }
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

  for (var i = 0; i < enemies.length; ++i) {
    bullet.overlaps(enemies[i], onBulletHit);
  }
}

function onBulletHit(bullet, enemy) {
  enemies.unshift(enemy);

  bullet.remove();
  enemy.remove();

  score += 10;
}
