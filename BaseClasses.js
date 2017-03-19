/* An actor is an entity that has a location, and moves. Either the player characters, enemies,
or destructible terrain. */
function Actor(x, y) {
    if(x != undefined) {
        this.x = x;
    }
    if(y != undefined) {
        this.y = y;
    }
    this.px = 0;
    this.py = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.speed = 2;
    this.moving = false;
    this.path = null;
    this.path_index = 0;
    /* I imagine this will work for all ancestors.*/
    this.move = function(targetX, targetY) {
        this.targetX = targetX;
        this.targetY = targetY;
        if(this.px != this.targetX * 8) {
            this.px += Math.sign(this.targetX*8 - this.px) * this.speed;
        }
        if(this.py != this.targetY * 8) {
            this.py += Math.sign(this.targetY*8 - this.py) * this.speed;
        }
        this.draw(this.px, this.py);
        if(this.px == this.targetX*8 && this.py == this.targetY*8){
            this.x = this.targetX;
            this.y = this.targetY;
            this.path_index += 1;
        }
    }
    this.moveAlongPath = function(path) {
        if(arguments.length == 0) {
            var path = this.path;
        } else {
            this.path = path;
        }
        this.moving = true;
        if(path[this.path_index]) {
            console.log("Move to: " + path[this.path_index].x + " " + path[this.path_index].y)
            this.move(path[this.path_index].x, path[this.path_index].y);
        } else {
            this.moving = false;
            this.path_index = 0;
        }
    }
    this.draw = function(px, py) {
        if(arguments.length == 0) {
            e_ctx.beginPath();
            e_ctx.fillStyle = "green";
            e_ctx.fillRect(this.x*8 - 0.25, this.y*8 - 0.25, 8, 8);
            e_ctx.closePath();
        } else {
            e_ctx.beginPath();
            e_ctx.fillStyle = "green";
            e_ctx.fillRect(px - 0.25, py - 0.25, 8, 8);
            e_ctx.closePath();
        }
    }
}

/* An agent is an actor that can attack. The player characters or enemies. */
function Agent(x, y) {
    if(x != undefined) {
        this.x = x;
    }
    if(y != undefined) {
        this.y = y;
    }
    this.attack = function(target) {

    }
}

Agent.prototype = new Actor();
