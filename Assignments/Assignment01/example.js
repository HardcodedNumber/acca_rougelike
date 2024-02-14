//Assignment 01
//Name:

// Global Vars
///////////////////////////////////////////////////////////
var player;
var maxHealth = 100;
var textColor = 'green';
var ground;

// Setup & draw
///////////////////////////////////////////////////////////
function setup() {
  new Canvas(500, 400, 'pixelated');
  frameRate(60);

  world.gravity.y = 10;

  player = new Sprite(width / 2, height / 2, 40, 40);
  player.color = 'white';
  SetHealth(150);

  ground = new Sprite(width / 2, height * 0.8, width, height * .4, 'static');
  ground.color = 'limegreen';
}

function draw() {
  clear();
  background('skyblue');

  fill(textColor);
  textSize(20);
  text("Health: " + player.health, 5, 32);

  if (kb.pressed('d')) {
    DamagePlayer(maxHealth * 0.1);
  }

  if (kb.pressed('k')) {
    DamagePlayer(9999);
  }

  if (kb.pressed('h')) {
    DamagePlayer(-10);
  }

  if (player.damage) {
    player.damageTime += deltaTime;

    var randomX = random(-20, 20);
    var hurtColor = player.damageAmount < 0 ? 'crimson' : 'green';

    player.color = hurtColor;
    fill(hurtColor);
    textSize(16);
    text(player.damageAmount, player.x + randomX, player.y - player.damageTime);

    if (player.damageTime >= 120) {
      player.damage = false;
      player.color = 'white';
    }
  }
}

// Methods
///////////////////////////////////////////////////////////
function DamagePlayer(damage) {
  player.damage = true;
  player.damageTime = 0;
  player.damageAmount = damage * -1;

  SetHealth(player.health - damage);
}

function SetHealth(newHealth) {
  player.health = clamp(newHealth, 0, maxHealth);

  var healthPercentage = player.health / maxHealth;

  if (healthPercentage >= 0.8) {
    textColor = 'green';
  }
  else if (healthPercentage >= 0.75) {
    textColor = 'orange';
  }
  else if (healthPercentage >= 0.55) {
    textColor = 'yellow';
  }
  else if (healthPercentage <= 0.25) {
    textColor = 'red';
  }
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}