//Assignment 01
//Name:

// Global Vars
///////////////////////////////////////////////////////////

// 1. Create global variables for:
//  a. player
//  b. maxHealth, set it to 100
//  c. textColor, set it to green
//  d. ground

// Setup & draw
///////////////////////////////////////////////////////////
function setup() {
    new Canvas(500, 400, 'pixelated');
    frameRate(60);

    //2. Set the gravity to 10

    //3. Create player sprite
    //  a. Create a sprite at (half width, and half height) width and height should be 40
    //  b. Set the color to white
    //  c. call SetHealth and pass health higher than max health

    ground = new Sprite(width / 2, height * 0.8, width, height * .4, 'static');
    ground.color = 'limegreen';
}

function draw() {
    clear();
    //5. Set the background to sky blue

    //6. Health text
    //  a. fill the text color with textColor
    //  b. set the text size to 20
    //  c. print the text at (5, 30)
    //   example: Health: 23

    //7. If the 'd' button is pressed, Damage the player by 10% of their max health

    //8. If the 'k' button is pressed, Damage the player by 9999

    //9. if the 'h' button is pressed heal the player with negative damage

    //10. if the damage is set on the player
    // a. update the player's damageTime with delta time
    // b. set the player's color to hurtColor
    if (player.damage) {

        var hurtColor = player.damageAmount < 0 ? 'crimson' : 'green';

        //11. damage text
        // a. fill the text with hurtColor
        // b. set the text size to 16
        // c. display the player's damage amount at the player's x,y position, the text should move up using player.damageTime

        //stop the damage time
        if (player.damageTime >= 120) {
            player.damage = false;
            player.color = 'white';
        }
    }
}

// Methods
///////////////////////////////////////////////////////////
//12. DamagePlayer: Create a function called DamagePlayer, pass in the damage
//  a. set the player's damage to true
//  b. set the player's damageTime to zero
//  c. set the player's damageAmount to the damage parameter negated
//  d. Call SetHealth passing in the player's health - damage

//13. SetHealth: Create a function called Set Health, passing in the newHealth
//  a. clamp the health between [0, maxHealth]
//  b. create a new variable called healthPercentage, assign it based on the max health
//  c. update the text color:
//      80% or more == green
//      75% or more == yellow
//      55% or more == orange
//      25% and less == red

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}