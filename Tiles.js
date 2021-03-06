/* Rest of the structure:
Game Manager -> delegates to whoevers turn it is, updates UI (as an observer)
Player Turn: deals with player input, switches between player characters, moves the players around
* Delegates to the Player States
Enemy Turn: calculates best move for the AIs and moves them*/

function TileCoordinates(x, y) {
    this.x = x;
    this.y = y;
    this.equals = function(other) {
        return (this.x == other.x) && (this.y == other.y);
    }
}

/* Flyweight Pattern: TileMap stores a pointer to an object,
and that object can draw itself but it doesn't have a set position. */
var terrainSprites = {
    grass: imageLoader("https://s-media-cache-ak0.pinimg.com/originals/d6/c5/ad/d6c5ad469011e4b1ea38e0af687a53f2.jpg"),
    fire: imageLoader("https://scutanddestroy.files.wordpress.com/2010/11/salvage-lava-4-tiles.png"),
    water: imageLoader("https://s-media-cache-ak0.pinimg.com/564x/50/f8/6e/50f86e2d06e0ecae600724d2ef766383.jpg"),
    sand: imageLoader("https://s-media-cache-ak0.pinimg.com/564x/52/ae/1d/52ae1d1a17f72c634f8b15549ed3959c.jpg"),
    boulder: imageLoader("https://s-media-cache-ak0.pinimg.com/originals/a2/69/6a/a2696a38e19a9f79b7890c0aa3de1d7e.jpg"),
    tree: imageLoader("http://orig05.deviantart.net/d957/f/2012/171/3/7/37774bfd28fb3a1814046b2b37b18144-d546b3v.png"),
    mountain: imageLoader("http://t14.deviantart.net/khk4Dfri6sxNOwUA2CWfvzDXL00=/300x200/filters:fixed_height(100,100):origin()/pre00/b47e/th/pre/f/2012/042/0/0/mountain_practice_by_cmagister-d4pcr58.png")
}

/* A tile is an entity that can be traversed, or not. It also has special
moves when people are standing on top of it. */
function Tile(img) {
    this.img = img;
    this.movementCost = 1;
    this.traversable = true;
    this.standingEffect = function () {},
    this.draw = function(canvas, coords) {
        canvas.drawImage(this.img, coords.x*8, coords.y*8, 8, 8);
    }
}

/* A grass tile doesn't really do anything special. */
var GrassTile = new Tile(terrainSprites.grass);
var WaterTile = new Tile(terrainSprites.water);
WaterTile.standingEffect = function(player) {
    /* Heal the player. */
}
var FireTile = new Tile(terrainSprites.fire);
FireTile.standingEffect = function(player) {
    /* Hurt the player. */
}
var SandTile = new Tile(terrainSprites.sand);
this.movementCost = 3;

/* These two have actions: they can roll across tiles
or fall on tiles. Where to implement this? */
var BoulderTile = new Tile(terrainSprites.boulder);
BoulderTile.traversable = false;
var TreeTile = new Tile(terrainSprites.tree);
TreeTile.traversable = false;

var MountainTile = new Tile(terrainSprites.mountain);
MountainTile.traversable = false;

var terrain = {
    grass: GrassTile,
    fire: FireTile,
    water: WaterTile,
    sand: SandTile,
    boulder: BoulderTile,
    tree: TreeTile,
    mountain: MountainTile
}

function TileMap(tileSize, background) {
    this.size_x = background.width / tileSize;
    this.size_y = background.height / tileSize;
    this.tileSize = tileSize;
    var arr = new Array(this.size_x);
    for(i = 0; i < arr.length; i++) {
        arr[i] = new Array(this.size_y);
    }
    this.backingArray = arr;
    this.add = function(x, y, type) {
        this.backingArray[x][y] = type;
    }
    this.getTile = function(x, y) {
        if(arguments.length == 1) {
            var tileCoordinates = x;
            x = tileCoordinates.x;
            y = tileCoordinates.y;
        }
        if(x < 0 || x >= this.size_x) {
            return null;
        } else if(y < 0 || y >= this.size_y) {
            return null;
        }
        return this.backingArray[x][y];
    }
}
