//lesson 03
//Objective: Math and conditions

// Global Vars
///////////////////////////////////////////////////////////
var randomArr = [], singleArray = [];
var time = 0;
var circle, box;
let initialSingleColor;

// Setup & draw
///////////////////////////////////////////////////////////
function setup() {
  new Canvas("16:9");

  initialSingleColor = color('purple');

  for (var i = 0; i < 10; i++) {
    randomArr[i] = new Sprite(width / 3 + (i * 32), height / 2, 32, 32, 'none');
    randomArr[i].color = 'red';
  }

  for (var i = 0; i < 10; i++) {
    singleArray[i] = new Sprite(width / 3 + (i * 32), height / 3, 32, 32, 'none');
    singleArray[i].color = initialSingleColor;
  }

  circle = new Sprite(200, 400, 'none');
  circle.diameter = 40;

  box = new Sprite(200, 400, 40, 40, 'none');

  console.log("Round: " + Math.round(0.9));
  console.log("Max: " + Math.max(8, 9, 0, 5));
  console.log("Min: " + Math.min(8, 9, 0, 5));
  console.log("Abs: " + Math.abs(5.45));
  console.log("floor: " + Math.floor(5.45));
  console.log("pow (2^3): " + Math.pow(2, 3));
  console.log("sqrt: " + Math.sqrt(9));
}

function draw() {
  clear();
  background('#000000');

  time += deltaTime * 0.5;

  let xPos = 200;
  let yPos = 200;
  let circleOffset = 50;

  circle.x = cos(time) * circleOffset + xPos;
  circle.y = sin(time) * circleOffset + yPos;

  box.x = cos(-time) * circleOffset + (xPos * 2);
  box.y = sin(-time) * circleOffset + yPos;

  if (kb.pressed('space')) {
    var randomIndex = _random(0, randomArr.length - 1);

    for (var i = 0; i < randomArr.length; ++i) {
      if (i == randomIndex) {
        randomArr[i].color = 'green';
      }
      else {
        randomArr[i].color = 'red';
      }
    }
  }

  if (kb.pressed('A')) {
    var randomIndex = _random(0, singleArray.length - 1);

    for (var i = 0; i < singleArray.length; ++i) {
      var element = singleArray[i];
      console.log(element.color);

      if (i == randomIndex && element.color == initialSingleColor) {
        singleArray[i].color = 'yellow';
      }
    }
  }
}

// Methods
///////////////////////////////////////////////////////////
function _random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}