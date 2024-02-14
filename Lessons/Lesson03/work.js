//Objective: Math and arrays

// Global Vars
///////////////////////////////////////////////////////////
var circle, square;
var time = 0;

var firstArray = [], secondArray = [];
var initialColor;

// Main
///////////////////////////////////////////////////////////
function setup() {
    new Canvas(600, 400);
    frameRate(60);

    circle = new Sprite(100, 200, 'none');
    circle.diameter = 40;
    circle.color = 'white';

    square = new Sprite(200, 200, 40, 40, 'none');
    square.color = 'blue';

    initialColor = color('purple');
    createArrays(10);
}

function draw() {
    clear();
    background('#000000');

    time += deltaTime * 0.25; //deltaTime == number of milliseconds since the last frame
    var radius = 50;
    var xPosOffset = 100;
    var yPosOffset = 200;

    circle.x = cos(time) * radius + xPosOffset;
    circle.y = sin(time) * radius + yPosOffset;

    square.x = cos(-time) * radius + (xPosOffset * 2);
    square.y = sin(-time) * radius + yPosOffset;

    if (kb.pressed('A')) {
        var randomIndex = _random(0, firstArray.length - 1);
        console.log(randomIndex);

        for (var i = 0; i <= firstArray.length; ++i) {
            if (i == randomIndex && firstArray[i].color == initialColor) {
                firstArray[i].color = 'yellow';
            }
        }
    }

    if (kb.pressed('space')) {
        var randomIndex = _random(0, secondArray.length - 1);

        for (var i = 0; i < secondArray.length; ++i) {
            if (i == randomIndex) {
                secondArray[i].color = 'blue';
            }
            else {
                secondArray[i].color = 'red';
            }
        }
    }
}

// Methods
///////////////////////////////////////////////////////////
function createArrays(numElements) {
    //iterate the first array
    for (var i = 0; i <= numElements; ++i) {
        firstArray[i] = new Sprite(width / 3 + (i * 32), 100, 32, 32, 'none');
        firstArray[i].color = initialColor;
    }

    //second array
    for (var i = 0; i <= numElements; ++i) {
        secondArray[i] = new Sprite(width / 3 + (i * 32), 200, 32, 32, 'none');
        secondArray[i].color = 'red';
    }
}

function _random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}