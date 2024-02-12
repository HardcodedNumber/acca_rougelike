//lesson 02
//Objective: Movement, Scale, Rotation, Camera

// Global Vars
///////////////////////////////////////////////////////////
var entities = [];
var time = 0;

// Setup & draw
///////////////////////////////////////////////////////////
function setup() {
  new Canvas("16:9");

  for (var i = 0; i < 10; i++) {
    entities[i] = new Sprite(width / 3 + (i * 32), height / 2, 32, 32);
    entities[i].color = 'red';
  }
}

function draw() {
  clear();
  background('#4361ee');

  time += deltaTime;

  for (var i = 0; i < entities.length; ++i) {
    entities[i].pos.x = (sin(time) * 10) + 300;
    entities[i].pos.y = (cos(time) * 10) + 300;
  }

  if (kb.pressed('space')) {
    var randomIndex = _random(0, entities.length);

    for (var i = 0; i < entities.length; ++i) {
      if (i == randomIndex) {
        entities[i].color = 'green';
      }
      else {
        entities[i].color = 'red';
      }
    }
  }
}

// Methods
///////////////////////////////////////////////////////////
function moveTo(pos) {
  console.log(pos);
  entity.newPos = pos;
  entity.moveTo(entity.newPos, entitySpeed);
}

function _random(min, max) {
  var temp = Math.floor(Math.random() * (max - min + 1) + min);

  return temp;
}