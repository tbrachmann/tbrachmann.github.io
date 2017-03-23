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
moves when people are standing on top of it. It must be a square with length
and witdh of pxSize. */
function Tile(img, pxSize) {
    this.img = img;
    this.movementCost = 1;
    this.traversable = true;
    this.pxSize = pxSize || 8;
    this.standingEffect = function () {},
    this.draw = function(canvas, coords) {
        canvas.drawImage(this.img, coords.x*this.pxSize, coords.y*this.pxSize, this.pxSize, this.pxSize);
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

/*@arg sizeX and sizeY are the sizes of a sizeX by sizeY tilemap (tileMap
  must be a rectangle but does not have to be a square)
  @arg indexOffset is the offset of each index, for when you want
  to make a smaller tile map that does not start at 0 (such as for
  finding the optimal path in the player's allowed move space: a smaller
  part of the larger main tilemap.) It should be the top left and right
  coordinate of your sliced tilemap in the larger space.
  @arg value is the value to initialize all tile values to.*/
function TileMap(sizeX, sizeY, value, indexOffsetX, indexOffsetY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.indexOffsetX = indexOffsetX || 0;
    this.indexOffsetY = indexOffsetY || 0;
    this.backingArray = (function(sizeX, sizeY, value) {
        var arr = new Array(sizeX);
        var x = 0;
        var y;
        while(x < sizeX) {
            arr[x] = new Array(sizeY);
            y = 0;
            while(y < sizeY) {
                arr[x][y] = value;
                y++;
            }
            x++;
        }
        return arr;
    })(this.sizeX, this.sizeY, value);
    this.add = function(x, y, value) {
        x = x - this.indexOffsetX;
        y = y - this.indexOffsetY;
        if(value == undefined) {
            value = null;
        }
        if(x < 0 || x >= this.sizeX) {
            return null;
        } else if(y < 0 || y >= this.sizeY) {
            return null;
        }

        this.backingArray[x][y] = value;
    }
    this.get = function(x, y) {
        x = x - this.indexOffsetX;
        y = y - this.indexOffsetY;
        if(x < 0 || x >= this.size_x) {
            return null;
        } else if(y < 0 || y >= this.size_y) {
            return null;
        }
        return this.backingArray[x][y];
    }
    this.contains = function(x, y) {
        x = x - this.indexOffsetX;
        y = y - this.indexOffsetY;
        //Check out of bounds.
        if(x < 0 || x >= this.sizeX) {
            return false;
        } else if(y < 0 || y >= this.sizeY) {
            return false;
        //Check un-initialized.
        } else {
            return this.backingArray[x][y] != false;
        }
    }
}
