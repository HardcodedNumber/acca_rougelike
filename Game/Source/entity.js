/**
 * Enum of all the tiles in the game
 */
const TileCharacters = {
    None: ' ',

    //platform
    PlatformLeft: 'l',
    Platform: 'p',
    PlatformRight: 'r',

    PlatformWallLeft: '[',
    PlatformWallRight: ']',

    //interactable
    Mushroom: 'm',
    PlayerSpawn: 'x',
    Goal: 'g',

    //env
    Flower: 'f',
    DoubleFlower: 'd',

    TreeBase: '1',
    TreeBaseLeft: "2",
    TreeBaseRight: "3",

    TreeTrunk: '4',
    TreeTrunkLeft: '5',
    TreeTrunkRight: '6',
    TreeTrunkDouble: '7',

    TreeTop: '8',

    Clouds: 'c',

    //enemies
    Slug: 's',
    Bees: 'b'
};

class Entity {
    /** Helper method to create a group
    * @param {image} spriteImage    image asset to display
    * @param {string} collider      type of collider to apply to sprite
    * @param {TileCharacter} tile   type of tile to display as  
    */
    static CreateEntity(spriteImage, collider, tile = TileCharacters.None) {
        let group = new Group();
        group.collider = collider;
        group.img = spriteImage;
        group.tile = tile;
        group.layer = 0;

        return group;
    }

    /**
     * Creates an environmental entity
     * @param {image} spriteImage 
     * @param {TileCharacters} tile 
     * @returns {Group} object
     */
    static CreateEnvironment(spriteImage, tile) {
        return this.CreateEntity(spriteImage, 'none', tile);
    }

    /**
     * 
     * @param {image} spriteImage 
     * @param {TileCharacters} tile 
     * @returns {Group} object
     */
    static CreatePlatform(spriteImage, tile) {
        return this.CreateEntity(spriteImage, 'static', tile);
    }
}