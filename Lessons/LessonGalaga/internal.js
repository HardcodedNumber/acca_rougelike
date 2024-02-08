let directionX = 0, directionY = 0, speed = 6;
let stars = [], star01Sprite, star02Sprite, starTimer = 0;

function movement(ship, shipSize) {
    if (kb.pressing('a') || kb.pressing('arrowLeft')) {
        directionX = -1;
    }
    else if (kb.pressing('d') || kb.pressing('arrowRight')) {
        directionX = 1;
    }
    else {
        directionX = 0;
    }

    var canMoveUp = ship.y - shipSize >= height - height * 0.25;
    var canMoveDown = ship.y + shipSize <= height;

    if (canMoveUp && (kb.pressing('w') || kb.pressing('arrowUp'))) {
        directionY = -1;
    }
    else if (canMoveDown && (kb.pressing('s') || kb.pressing('arrowDown'))) {
        directionY = 1;
    }
    else {
        directionY = 0;
    }

    ship.vel.x = directionX * speed;
    ship.vel.y = directionY * speed;
}

function _internalSpawnStars() {
    starTimer += 1 / deltaTime;

    if (starTimer >= 2) {
        starTimer = 0;

        var randStar = random(0, 1);
        var star;

        star01Sprite = loadImage('star01.png');
        star02Sprite = loadImage('star02.png');

        var randX = random(0, width);
        var randY = random(0, -64);

        if (randStar == 0) {
            star = new Sprite(randX, randY, 16, 16, 'none');
            star.img = star01Sprite;
        }
        else {
            star = new Sprite(randX, randY, 18, 18, 'none');
            star.img = star02Sprite;
        }

        var rand = random(0, 2);

        star.vel.y = rand;
        star.scale.x = rand;
        star.scale.y = rand;
        star.layer = 0;
    }
}