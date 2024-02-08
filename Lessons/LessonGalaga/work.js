//lesson Asteroids
//Objective: Create player, move player, shoot, create enemies, destroy enemies
//           display health & score

// Global Vars
///////////////////////////////////////////////////////////

//ship
let ship, shipSprite;
let shipSize = 25;

let health = 100;
let score = 0;

//bullets
let bulletSprite, bulletSpeed = 10;

//enemies
let enemies = [], enemySprite;
let maxEnemies = 5;

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

  //bullets
  bulletSprite = loadImage('bullet.png');

  //enemies
  enemySprite = loadImage('enemy.png');
  //enemy = new Sprite(width / 2, height / 10, 32, 32);
  //enemy.img = enemySprite;

  var offset = width * 0.3;

  for (var i = 0; i < maxEnemies; i++) { //++i
    var xPosition = i * 100 + offset;
    var enemy = new Sprite(xPosition, height / 10, 32, 32);
    enemy.img = enemySprite;

    enemies.push(enemy); //store the enemy in the array
  }
}

//single line comment
/*multi line comment
so i can talk about whatever here


and keep on going
*/
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

  //register when the bullet hits the enemy
  //overlaps(target : any, callback : function);
  for (var i = 0; i < maxEnemies; ++i) {
    var enemy = enemies[i]; //[0, 1, 2, 3, 4]

    bullet.overlaps(enemy, onBulletHit);
  }
}

/*(0,0)
  |--------
  | s
  |
*/
//logical operators
// || or
// && and
// ! not
// ~ xor

// comparison operators
// > greater than
// < less than
// == equal to
// >= greater than or equal to
// <= less than or equal to


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
  enemy.remove();

  //score = score + 10;
  score += 10;
}