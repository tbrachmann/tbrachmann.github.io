/* The player state is a level above the player character. */

function PlayerState() {
    this.Enter = function() {
        /* Called when entering the state. */
    }
    this.Update = function() {
        /* The update function called by GameManager.update */
    }
    this.HandleInput = function() {
        /* Called by GameManager when input is detected. */
    }
    this.Exit = function() {
        /* Called when exiting the state. */
    }
    
}

function Ready(character) {
    this.playerChar = character;
    this.currentTileFocus;
    this.Enter = function() {
        /* Play selection animation for player character. */
    }
    this.HandleInput = function(e) {
        /* Handle mouse movement. */
        /* Go to ready to move. */
        /* Go to targeting. */
    }
}

Ready.prototype = new PlayerState();

function ReadyToMove(character) {
    this.playerChar = character;
    this.availableMoves;
    this.currentTileFocus = {x: null, y: null};
    this.path;
    this.Enter = function() {
        /* Get, assign, and draw the available moves. */
        this.availableMoves = new TileMap(2*playerChar.moveLimit+1, 2*playerChar.moveLimit+1, null, player.x-playerChar.moveLimit, player.y-playerChar.moveLimit);
        PossibleMovesHelper(player.x, player.y, this.availableMoves, GameManager.tileMap, 
            playerChar.moveLimit);
    }
    this.HandleInput = function(e) {
        /* Switch based on input type. Or is it better to have different handlers for each kind of input? */
        /* Draw the mouse cursor: red if can't move, green if you can. */
        if((e.x != currentTileFocus.x || e.y != currentTileFocus.y) || (e.x != playerChar.x || e.y != playerChar.y)) {
            e_ctx.clearRect(currentTileFocus.x * 8 - 1, currentTileFocus.y * 8 - 1, 9, 9);
            currentTileFocus.x = x;
            currentTileFocus.y = y;
            if(this.availableMoves.contains(e.x, e.y)) {
                drawRect(e.x * 8, e.y * 8, "green");
            } else {
                drawRect(e.x * 8, e.y * 8, "red");
            }
        }
    }
        /* Click: move to position. */
        /* Start the movement, and then the Moving State will handle the rest of it?*/
    }
    this.Exit = function() {
        /* Erase the available moves. */        
    }
}

ReadyToMove.prototype = new PlayerState();

function Moving(character) {
    this.playerChar = character;
    this.Enter = function() {
        /* Start moving animation. */
    }
    this.Update = function() {
        this.playerChar.moveAlongPath();
        /* When done, go back to Ready. */
    }
    this.Exit = function() {
        /* Stop the animation. */
    }
}

ReadyToMove.prototype = new PlayerState();