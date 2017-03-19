/* An actor is an entity that has a location, and moves. Either the player characters, enemies,
or destructible terrain. */
function Actor(x, y) {
    if(x != undefined) {
        this.x = x;
    }
    if(y != undefined) {
        this.y = y;
    }
    this.targetX = 0;
    this.targetY = 0;
    this.speed = 2;
    this.moving = false;
    /* I imagine this will work for all ancestors.*/
    this.move = function(targetX, targetY) {
        this.targetX = targetX;
        this.targetY = targetY;
        if(this.x != this.targetX) {
            this.x += Math.sign(this.targetX - this.x) * this.speed;
        }
        if(this.y != this.targetY) {
            this.y += Math.sign(this.targetY - this.y) * this.speed;
        }
        if(this.x == this.targetX && this.y == this.targetY){
            this.moving = false;
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
