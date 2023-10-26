//lesson 02
//Objective: Collisions and platforms

// Global Vars
///////////////////////////////////////////////////////////
const States = {
  Static: 0,
  Stomp: 1,
  Bounce: 2,
  BreakFloor: 3
}

let player, floor, state

// Setup & draw
///////////////////////////////////////////////////////////
function setup() {
  new Canvas(150, 342);
  world.gravity.y = 10;

  player = new Sprite(60, 30);
  floor = new Sprite(60, 300, 60, 5, 'static');

  floor.color = 'red';
  player.color = 'blue';

  state = States.Static;
}

function draw() {
  clear();
  background('#4361ee');

  text('State: ' + state, 32, 20);

  // input handling
  if (mouse.pressed()) {
    state = (state + 1) % 4;

    reset();
  }

  switch (state) {
    //stomp
    case States.Stomp: {
      if (player.collides(floor)) {
        player.vel.y = -5;
        floor.h -= 52;
      }
      break;
    }

    //bounce
    case States.Bounce: {
      if (player.colliding(floor)) {
        player.color = 'red';
      } else player.color = 'blue';

      if (player.colliding(floor) > 60) {
        player.vel.y = -9;
      }
      break;
    }

    //break floor
    case States.BreakFloor: {
      if (player.collided(floor)) {
        floor.collider = 'dynamic';
      }
      break;
    }

    default:
      break;
  }
}

// Other
///////////////////////////////////////////////////////////
function reset() {
  floor.remove();
  player.remove();

  player = new Sprite(60, 30);

  if (state == States.Stomp) {
    floor = new Sprite(60, 362, 30, 500, 'static')
  }
  else {
    floor = new Sprite(60, 300, 60, 5, 'static');
  }

  floor.color = 'red';
  player.color = 'blue';
}