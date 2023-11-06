let platformLeft, platformLefSprite;
let platformMiddle, platformMiddleSprite;
let platformRight, platformRightSprite;

let platformLeftWall, platformLeftWallSprite;
let platformRightWall, platformRightWallSprite;

let mushroom, mushroomIdleSprite;
let playerSpawn;
let goal, goalSprite;

let flower, flowerSprite;
let doubleFlower, doubleFlowerSprite;

let treeBase, treeBaseSprite;
let treeBaseLeft, treeBaseLeftSprite;
let treeBaseRight, treeBaseRightSprite;
let treeTrunk, treeTrunkSprite;
let treeTrunkLeft, treeTrunkLeftSprite;
let treeTrunkRight, treeTrunkRightSprite;
let treeTrunkDouble, treeTrunkDoubleSprite;
let treetop, treeTopSprite;

let clouds, cloudSprite;

function LoadLevelAssets() {
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
	treeBaseRightSprite = loadImage('Assets/Art/tiles/tile_0059.png');
	treeTrunkLeftSprite = loadImage('Assets/Art/Tiles/tile_0047.png');
	treeTrunkSprite = loadImage('Assets/Art/Tiles/tile_0048.png');
	treeTrunkRightSprite = loadImage('Assets/Art/Tiles/tile_0049.png');
	treeTrunkDoubleSprite = loadImage('Assets/Art/Tiles/tile_0039.png');
	treeTopSprite = loadImage('Assets/Art/Tiles/tile_0038.png');

	cloudSprite = loadImage('Assets/Art/Tiles/tile_0011.png');
}

function CreateLevel() {
	platformLeft = Entity.CreatePlatform(platformLefSprite, TileCharacters.PlatformLeft);
	platformMiddle = Entity.CreatePlatform(platformMiddleSprite, TileCharacters.Platform);
	platformRight = Entity.CreatePlatform(platformRightSprite, TileCharacters.PlatformRight);

	platformLeftWall = Entity.CreatePlatform(platformLeftWallSprite, TileCharacters.PlatformWallLeft);
	platformRightWall = Entity.CreatePlatform(platformRightWallSprite, TileCharacters.PlatformWallRight);

	mushroom = Entity.CreatePlatform(mushroomIdleSprite, TileCharacters.Mushroom);

	playerSpawn = Entity.CreateEnvironment('', TileCharacters.PlayerSpawn);
	playerSpawn.visible = false;

	flower = Entity.CreateEnvironment(flowerSprite, TileCharacters.Flower);
	doubleFlower = Entity.CreateEnvironment(doubleFlowerSprite, TileCharacters.DoubleFlower);

	goal = Entity.CreateEnvironment(goalSprite, TileCharacters.Goal);

	treeBaseLeft = Entity.CreateEnvironment(treeBaseLeftSprite, TileCharacters.TreeBaseLeft);
	treeBase = Entity.CreateEnvironment(treeBaseSprite, TileCharacters.TreeBase);
	treeBaseRight = Entity.CreateEnvironment(treeBaseRightSprite, TileCharacters.TreeBaseRight);
	treeTrunkLeft = Entity.CreateEnvironment(treeTrunkLeftSprite, TileCharacters.TreeTrunkLeft);
	treeTrunk = Entity.CreateEnvironment(treeTrunkSprite, TileCharacters.TreeTrunk);
	treeTrunkRight = Entity.CreateEnvironment(treeTrunkRightSprite, TileCharacters.TreeTrunkRight);
	treeTrunkDouble = Entity.CreateEnvironment(treeTrunkDoubleSprite, TileCharacters.TreeTrunkDouble);
	treetop = Entity.CreateEnvironment(treeTopSprite, TileCharacters.TreeTop);

	clouds = Entity.CreateEnvironment(cloudSprite, TileCharacters.Clouds);

	new Tiles(
		[
			'                                                                                                                                                                                                                                                                          ',
			'                                                                c                                                                                                                                c               8                                                        ',
			'                                c                                                             c             c                                c                         c               c                         4                              c                         ',
			'                         c                                                                                                                                                                                       4                                                        ',
			'                                                                                                                                         c                                              f                        1                                                        ',
			'           c                                                          c                            c                                                            dd      f              lpppppppppppppr    lpppppppppppppr                                                 ',
			'                                 c                                             8                                        8                                 lpppppppppppppr              [             ]    [             ]                            c                    ',
			'                                                                               4                      d                 7                      c          [             ]              [             ]    [             ]                                                 ',
			'    8                                                                          4            lppppppppppppppppr          4                                 [             ]              [             ]    [           8 ]                                      c          ',
			'    5          8                                                               4            [                ]          4                                 [             ]              [             ]    [           4 ]         c                                       ',
			'    4          4                                                               3         m  [                ]          2                 f             m [             ]            m [             ]    [           6 ]                                                 ',
			'    1 x        4                                                          lpppppppppr  lppppr                ]   lppppppppppr    lpppppppppppr    lpppppppppppr         ]      lpppppppppppr         ]    [       d   3 ]                     8                           ',
			'lpppppppppr    6          f                                  lppppppppr   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     lpppppppppppppr               4                           ',
			'[         ]    6   lpppppppr  8                      c       [        ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [             ]               5                      88   ',
			'[         ]    2   [       ]  7                             m[        ]   [         ]  [    ]                ]   [          ]    [           ]    [           ]         ]      [           ]         ]    [     [             ]               4                      44   ',
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

function HandleLevelCollision(player) {
	if (player.colliding(mushroom) > 60) {
		player.vel.y = -6;
	}

	if (goal.overlapping(player)) {
		text("Level Cleared!", width / 2, height / 4);
		textAlign(CENTER);
	}
}

function RandomizeClouds() {
	for (var i = 0; i < clouds.length; ++i) {
		var scale = random(1, 10);

		clouds[i].scale.x = scale;
		clouds[i].scale.y = scale;
	}
}
