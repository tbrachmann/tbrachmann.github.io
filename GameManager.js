/* This is the top level entity that creates the game world, handles player input, and enemy movement. On the player's turn, it will intercept input and delegate to the player state. */


/* The main update function for the game. */


//We need to deal with different player characters though!
//Yes: their input will always be the same, and player state will intercept and then delegate to the correct player character. The state will also handle switching between characters.
//On player turn:
//Game Manager -> Player State -> Player Character

//On enemy turn:
//Game Manager -> Enemy
function Update() {
    /* This top level responsible for clearing the canvases? */
    e_ctx.clearRect(player.x*8 - 1, player.y*8 - 1, 9, 9);
    playerState.Update();
}

function TransitionActionState(nextState) {
    playerState.Exit();
    playerState = nextState;
    playerState.Enter();
}

function SwitchPlayerCharacter(character) {
    myState = new Ready(character);
}

function MousePosToTile(x, y) {
    var mapWidth = e.target.width * zoomLevel;
    var mapHeight = e.target.height * zoomLevel;
    x -= (e.target.getBoundingClientRect().left * zoomLevel); //The game board starts 100 pixels from the top left in the window.
    y -= (e.target.getBoundingClientRect().top * zoomLevel);
    x = Math.floor(x / mapWidth * tileMap.sizeX);
    y = Math.floor(y / mapHeight * tileMap.sizeY);
    return {x: x, y: y};
}

/* Set up the level. */
/* Instantiate game vars. */
var background = document.getElementById("background");
var b_ctx = background.getContext("2d");
var entities = document.getElementById("entities");
var e_ctx = entities.getContext("2d")
var container = document.getElementById("container");
var zoomLevel = 2.5;
//Is this necessary here?
var currentTileFocus = {
        x: 0,
        y: 0
    }
var playerTurn = true;
var playerCharacters = new Array(4);
var playerState = null;
var tileMap = new TileMap(30, 30, null);
var x;
var y;
for(x = 0; x < tileMap.sizeX; x++) {
    for(y = 0; y < tileMap.sizeY; y++) {
        //var generator = getRandomInt(0, 7);
        //var tile = terrain[Object.keys(terrain)[generator]];
        var tile = terrain.grass;
        if (x == 2 && y == 0) {
            tile = terrain.mountain;
        }
        if (x == 2 && y == 1) {
            tile = terrain.mountain;
        }
        if (x == 2 && y == 2) {
            tile = terrain.mountain;
        }
        if (x == 1 && y == 2) {
            tile = terrain.mountain;
        }
        tileMap.add(x, y, tile);
        tile.draw(b_ctx, new TileCoordinates(x, y));
        //console.log(terrain[generator]);
        //b_ctx.drawImage(terrain[Object.keys(terrain)[generator]], x*8, y*8, 8, 8);
    }
}
var player = new Agent(0, 0);

/* Add the event listeners. */
function mouseDownHandler(e) {
    /* Get the correct tile and then pass it into the handleInput function? */
    var input = MousePosToTile(e.clientX, e.clientY);
    /* Have it somehow also carry through its type - from the event. */
    input.type = e.type;
    /* If its a click on another player character... then switch player character. */
    playerState.HandleInput(input);
}

function mouseMoveHandler(e) {
    
    var tile = MousePosToTile(e.clientX, e.clientY);
    /* If its tab, then switch player character. */
    playerState.HandleInput(tile);

}
       
function keyDownHandler(e) {
    console.log(e.key);
    playerState.HandleInput(e);
}

entities.addEventListener("mousedown", mouseDownHandler, false);
entities.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

/* Start the gameLoop. */
DrawBorders();
setInterval(update, 20);
