//IDE == Integrated Development Environment


// Global Vars
///////////////////////////////////////////////////////////
let ground;                     //the ground sprite
let player;                     // the player sprite
let groundSensor;               //this is to detect if the player is on the ground

//object == instance of a class

//called once.
// initialize, and create variables
function setup() {
    //new canvas using pixels
    //new Canvas(400, 400);

    //aspect ratio
    //landscape ~ 16:9
    //vertical ~ 4:10
    new Canvas("16:9");

    world.gravity.y = 10;

    //initialize the ground
    ground = new Sprite();
    ground.height = 10;
    ground.width = width; //= width == canvas's width

    //the canvas's height and then moving the ground up by half its height
    ground.y = height - ground.height / 2; 
    ground.color = '#FFFFFF';
    ground.collider = 'static';

    //initialize the player
    let halfScreenWidth = width / 2;
    let halfScreenHeight = height / 2;

    player = new Sprite(halfScreenWidth, halfScreenHeight, 30, 30, 'dynamic');                  // <-- constructor
                                                                                                // new Sprite(x, y, w, h, c);
    player.color = '#00FF00';                                                                   //green
    player.rotationLock = true;                                                                 // we dont want our player rotating around
    player.friction = 0;                                                                        //float, we dont want our player to sick to the ground


    groundSensor = new Sprite(player.x, player.y + 5, 30, 22);
    groundSensor.visible = false;
    groundSensor.mass = 0.01;
    groundSensor.overlaps(allSprites);                                                         //this notifies if we are hitting any sprite
    new GlueJoint(player, groundSensor);                                                       //this connects the player to the groundSensor
}

//updates every frame
//displays pictures to the canvas
function draw() {
   clear();
   background('#0000aa');

   //input handling
   
   //jumping in the air
   if (groundSensor.overlapping(ground) &&
        (kb.pressing('space') || kb.pressing('W'))) {
        player.vel.y = -4.5;
    }

   //WASD input, A == left, D == right

   //conditional statement
   // if (something) 
   // else if (something)
   // else

   // move left
   if (kb.pressing('A')) {
        player.vel.x = -5;
   }
   else if (kb.pressing('D')) {
        player.vel.x = 5;
   }
   //if we are not touching the keyboard, i dont want the player to move
   else {
    player.vel.x = 0;
   }
}