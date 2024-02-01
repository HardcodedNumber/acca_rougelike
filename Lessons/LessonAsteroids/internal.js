let directionX = 0, directionY = 0, speed = 4;
let enemies = [];

function movement(ship, speed, shipSize) {
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

function teleport_internal(shipSize) {
    var halfShipSize = shipSize * 0.5;

    if (ship.x < halfShipSize) {
        ship.x = width - halfShipSize;
    }

    if (ship.x + halfShipSize > width) {
        ship.x = halfShipSize;
    }
}

function spawnEnemy_internal(sprite) {
    var xOffset = width / 2 - (6 * 64 / 2);
    var yOffset = -height / 4;

    for (var x = 0; x <= 5; ++x) {
        for (var y = 0; y <= 3; ++y) {
            var xPos = xOffset + x * 64;
            var yPos = yOffset - y * 128;

            var enemy = new Sprite(xPos, yPos, 32, 32);
            enemy.img = sprite;
            enemy.rotation = 180;
            enemy.vel.y = 1;
            enemy.rotationLock = true;

            enemies.push(enemy);
        }
    }
}