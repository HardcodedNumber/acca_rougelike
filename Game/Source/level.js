
// Level Entities
///////////////////////////////////////////////////////////

let platformLefts, platformLefSprite;
let platformMiddles, platformMiddleSprite;
let platformRights, platformRightSprite;

let platformLeftWalls, platformLeftWallSprite;
let platformRightWalls, platformRightWallSprite;

let mushrooms, mushroomIdleSprite;
let playerSpawn;
let goal, goalSprite;

let flowers, flowerSprite;
let doubleFlowers, doubleFlowerSprite;

let treeBases, treeBaseSprite;
let treeBaseLefts, treeBaseLeftSprite;
let treeBaseRights, treeBaseRightSprite;
let treeTrunks, treeTrunkSprite;
let treeTrunkLefts, treeTrunkLeftSprite;
let treeTrunkRights, treeTrunkRightSprite;
let treeTrunkDoubles, treeTrunkDoubleSprite;
let treeTops, treeTopSprite;

let clouds, cloudSprite;

let slugs;
let bees;

// Level Methods
///////////////////////////////////////////////////////////

/**
 * Load all the level assets
 */
function loadLevelAssets() {
	platformLefSprite = loadImage('Assets/Art/Tiles/tile_0003.png');
	platformMiddleSprite = loadImage('Assets/Art/Tiles/tile_0004.png');
	platformRightSprite = loadImage('Assets/Art/Tiles/tile_0005.png');

	platformLeftWallSprite = loadImage('Assets/Art/Tiles/tile_0013.png');
	platformRightWallSprite = loadImage('Assets/Art/Tiles/tile_0015.png');

	mushroomIdleSprite = loadImage('Assets/Art/Tiles/tile_0031.png');

	flowerSprite = loadImage('Assets/Art/Tiles/tile_0033.png');
	doubleFlowerSprite = loadImage('Assets/Art/Tiles/tile_0032.png');

	goalSprite = loadImage('Assets/Art/Tiles/tile_0036.png');

	treeBaseLeftSprite = loadImage('Assets/Art/Tiles/tile_0057.png');
	treeBaseSprite = loadImage('Assets/Art/Tiles/tile_0058.png');
	treeBaseRightSprite = loadImage('Assets/Art/Tiles/tile_0059.png');
	treeTrunkLeftSprite = loadImage('Assets/Art/Tiles/tile_0047.png');
	treeTrunkSprite = loadImage('Assets/Art/Tiles/tile_0048.png');
	treeTrunkRightSprite = loadImage('Assets/Art/Tiles/tile_0049.png');
	treeTrunkDoubleSprite = loadImage('Assets/Art/Tiles/tile_0039.png');
	treeTopSprite = loadImage('Assets/Art/Tiles/tile_0038.png');

	cloudSprite = loadImage('Assets/Art/Tiles/tile_0011.png');
}

/**
 * Creates the sprites and enemies used in the level
 */
function createLevel() {
	platformLefts = Entity.CreatePlatform(platformLefSprite, TileCharacters.PlatformLeft);
	platformMiddles = Entity.CreatePlatform(platformMiddleSprite, TileCharacters.Platform);
	platformRights = Entity.CreatePlatform(platformRightSprite, TileCharacters.PlatformRight);

	platformLeftWalls = Entity.CreatePlatform(platformLeftWallSprite, TileCharacters.PlatformWallLeft);
	platformRightWalls = Entity.CreatePlatform(platformRightWallSprite, TileCharacters.PlatformWallRight);

	mushrooms = Entity.CreatePlatform(mushroomIdleSprite, TileCharacters.Mushroom);

	playerSpawn = Entity.CreateEnvironment('', TileCharacters.PlayerSpawn);
	playerSpawn.visible = false;

	flowers = Entity.CreateEnvironment(flowerSprite, TileCharacters.Flower);
	doubleFlowers = Entity.CreateEnvironment(doubleFlowerSprite, TileCharacters.DoubleFlower);

	goal = Entity.CreateEnvironment(goalSprite, TileCharacters.Goal);

	treeBaseLefts = Entity.CreateEnvironment(treeBaseLeftSprite, TileCharacters.TreeBaseLeft);
	treeBases = Entity.CreateEnvironment(treeBaseSprite, TileCharacters.TreeBase);
	treeBaseRights = Entity.CreateEnvironment(treeBaseRightSprite, TileCharacters.TreeBaseRight);
	treeTrunkLefts = Entity.CreateEnvironment(treeTrunkLeftSprite, TileCharacters.TreeTrunkLeft);
	treeTrunks = Entity.CreateEnvironment(treeTrunkSprite, TileCharacters.TreeTrunk);
	treeTrunkRights = Entity.CreateEnvironment(treeTrunkRightSprite, TileCharacters.TreeTrunkRight);
	treeTrunkDoubles = Entity.CreateEnvironment(treeTrunkDoubleSprite, TileCharacters.TreeTrunkDouble);
	treeTops = Entity.CreateEnvironment(treeTopSprite, TileCharacters.TreeTop);

	clouds = Entity.CreateEnvironment(cloudSprite, TileCharacters.Clouds);

	slugs = new Group();
	slugs.collider = 'd';
	slugs.addAni('walk',
		'Assets/Art/Tiles/tile_0055.png',
		'Assets/Art/Tiles/tile_0056.png'
	);
	slugs.tile = TileCharacters.Slug;
	slugs.anis.frameDelay = 30;
	slugs.w = 16;
	slugs.h = 16;
	slugs.rotationLock = true;
	slugs.dir = 1;
	slugs.mirror.x = true;

	bees = new Group();
	bees.collider = 'n';
	bees.addAni('fly',
		'Assets/Art/Tiles/tile_0051.png',
		'Assets/Art/Tiles/tile_0052.png'
	);
	bees.tile = TileCharacters.Bees;
	bees.w = 16;
	bees.h = 16;
	bees.rotationLock = true;
	bees.mirror.x = true;

	new Tiles(
		[
			'                                                                                                                                                                                                                                                                          ',
			'                                                                c                                                                                                                                c               8                                                        ',
			'                                c                                                             c             c                                c                         c               c                         4                              c                         ',
			'                         c                                                                                                                                        b                                     b        4    b                                                   ',
			'                                                                                                                                         c                                              f      s              s  1                                                        ',
			'           c                                                          c                            c                                                            dd s    f              lpppppppppppppr    lpppppppppppppr                                                 ',
			'                                 c                                             8            b                           8                                 lpppppppppppppr              [             ]    [             ]                            c                    ',
			'                                                                               4           b          d                 7                      c          [             ]              [             ]    [             ]                                                 ',
			'    8                                                                          4            lppppppppppppppppr      b   4                                 [             ]              [             ]    [           8 ]                                      c          ',
			'    5          8                                                            b  4            [                ]          4           b                     [             ]         b    [             ]    [           4 ]         c                                       ',
			'    4          4                                                               3         m  [                ]       s  2                 f             m [             ]            m [             ]    [           6 ]                                                 ',
			'    1 x        4                                                  s       lpppppppppr  lppppr                ]   lppppppppppr    lpppppppppppr    lpppppppppppr         ]      lpppppppppppr         ]    [       d   3 ]  s                  8                           ',
			'lpppppppppr    6    s     f               b                  lppppppppr   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     lpppppppppppppr               4                           ',
			'[         ]    6   lpppppppr  8    b                 c       [        ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [             ]               5                      88   ',
			'[         ]    2   [       ]  7              s              m[        ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [             ]               4                      44   ',
			'[         ]ppppppppr       ]  5   d      lppppppppr    lppppppppr     ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [             ]               4                      64   ',
			'[         ]        ]       ]  4 lppppppppr        ]    [        ]     ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [             ]               4                      44   ',
			'[         ]        ]       ]  4 [        ]        ]    [        ]     ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [             ]               4                      44   ',
			'[         ]        ]       ]  4 [        ]        ]    [        ]     ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [             ]               1          fg    d d   21   ',
			'[         ]        ]       ]  4 [        ]        ]  8 [        ]     ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [              ppppppppppppppppppppppppppppppppppppppppr  ',
			'[         ]        ]       ]  4 [        ]        ]  4 [        ]     ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [                                                         ',
			'[         ]        ]       ]  4 [        ]        ]  4 [        ]     ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [                                                         ',
			'[         ]        ]       ]  3 [        ]        ]  3 [        ]     ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [                                                         ',
		],
		0,
		0,
		16,
		16
	);
}

/**
 *  Handles the collision interaction between the level assets and the player
 * @param {Sprite} player The player sprite
 */
function handleLevelCollision(player) {
	if (player.colliding(mushrooms) > 60) {
		player.vel.y = -6;
	}

	if (goal.overlapping(player)) {
		text("Level Cleared!", width / 2, height / 4);
		textAlign(CENTER);
	}
}

/**
 * Handles the interaction when the player hits an enemy
 * @param {Sprite} player The player sprite
 */
function handleEnemyCollision(player) {
	if ((player.collided(slugs) ||
		player.collided(bees)) &&
		frameCount - player.lastHit > 120) {
		player.lastHit = frameCount;
		player.lives--;
	}
}

/**
 * Randomize the clouds in the sky
 */
function randomizeClouds() {
	for (var i = 0; i < clouds.length; ++i) {
		var scale = random(1, 10);

		clouds[i].scale.x = scale;
		clouds[i].scale.y = scale;
	}
}

/**
 * Updates all the bees and slugs movement
 */
function updateEnemies() {
	for (var i = 0; i < slugs.length; ++i) {
		var slug = slugs[i];

		slug.vel.x = slug.dir;

		if (slug.colliding(platformLeftWalls) || slug.colliding(platformRights)) {
			slug.dir = -1;
			slug.mirror.x = true;
		}
		else if (slug.colliding(platformRightWalls) || slug.colliding(platformLefts)) {
			slug.dir = 1;
			slug.mirror.x = false;
		}
	}

	for (var i = 0; i < bees.length; ++i) {
		var bee = bees[i];

		if (dist(player.x, player.y, bee.x, bee.y) < 100) {
			bee.collider = 'd';
			bee.moveTo(player.x, player.y, 2);
		}
	}
}