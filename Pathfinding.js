//1. Highlight available paths.
//2. Get best path for any destination. <- and memoize it
//3. Move along path to destination

//List with a head -> node
//Nodes that point to prev and next.
//Back with a set so that you don't have to take care of this?
//Yeah - then you just sort when you remove instead of when you add
//For the map, just check if it contains it already in order to make it a set
//Then you can use the object as a key
//But then it would just be better to write a wrapper for double arrays. O(1) time.
function PriorityQueue() {
    this.head = null;
    this.length = 0;
    //this could take up to O(n) so I might have to optimize this later.
    this.add = function(value, fScore) {
        var node = new PriorityQueueNode(value);
        if(this.head == null) {
            this.head = node;
            this.length += 1;
            return node;
        }
        var nextNode = this.head;
        while(nextNode != null) {
            if(fScore.get(value) < fScore.get(nextNode.value)) {
                //When you add to the very front of the queue.
                if(nextNode.prev == null) {
                    nextNode.prev = node;
                    node.next = nextNode;
                    this.head = node;
                } else {
                    nextNode.prev.next = node;
                    node.prev = nextNode.prev;
                    node.next = nextNode;
                    nextNode.prev = node;
                }
                this.length += 1;
                return node;
            }
            if(nextNode.next == null) {
                nextNode.next = node;
                node.prev = nextNode;
                this.length += 1;
                return node;
            }
            nextNode = nextNode.next;
        }
    }
    this.remove = function(value) {
        if(arguments.length == 0) {
            var nodeToRemove = this.head;
            this.head = this.head.next;
            if(this.head != null) {
                this.head.prev = null;
            }
            this.length -= 1;
            return nodeToRemove.value;
        }
        var nextNode = this.head;
        while(nextNode.next != null) {
            if(nextNode.value.equals(value)) {
                //Removing from the front
                if(nextNode.prev == null) {
                    this.head = nextNode.next;
                    this.head.prev = null;
                //Removing from the end
                } else if (nextNode.next == null) {
                    nextNode.prev.next = null;
                } else {
                    nextNode.prev.next = nextNode.next;
                    nextNode.next.prev = nextNode.prev;
                }
                this.length -= 1;
                return nextNode.value;
            }
        }
        return null;
    }
    this.contains = function(value) {
        /* Whats the best way to implement this one?*/
        var nextNode = this.head;
        while(nextNode != null) {
            if(nextNode.value.equals(value)) {
                return true;
            }
            nextNode = nextNode.next;
        }
        return false;
    }
}

function PriorityQueueNode(value) {
    this.prev = null;
    this.next = null;
    this.value = value;
}

function TileValueMap(tileMap) {
    this.backingArray = (function(tileMap) {
        var arr = new Array(tileMap.size_x);
        for(i = 0; i < arr.length; i++) {
            arr[i] = new Array(tileMap.size_y);
        }
        return arr;
    })(tileMap);
    this.insert = function(tileCoordinates, value) {
        if(tileCoordinates.x < 0 || tileCoordinates.x >= this.size_x) {
            return null;
        } else if(tileCoordinates.y < 0 || tileCoordinates.y >= this.size_y) {
            return null;
        }
        this.backingArray[tileCoordinates.x][tileCoordinates.y] = value;
        return this.backingArray[tileCoordinates.x][tileCoordinates.y];
    }
    this.contains = function(tileCoordinates) {
        if(tileCoordinates.x < 0 || tileCoordinates.x >= this.size_x) {
            return null;
        } else if(tileCoordinates.y < 0 || tileCoordinates.y >= this.size_y) {
            return null;
        }
        return this.backingArray[tileCoordinates.x][tileCoordinates.y] != null;
    }
    this.get = function(tileCoordinates) {
        if(tileCoordinates.x < 0 || tileCoordinates.x >= this.size_x) {
            return null;
        } else if(tileCoordinates.y < 0 || tileCoordinates.y >= this.size_y) {
            return null;
        }
        return this.backingArray[tileCoordinates.x] && this.backingArray[tileCoordinates.x][tileCoordinates.y];
    }
}

/*function SetWrapper() {}
SetWrapper.prototype = new Set();
SetWrapper.add = function(tileCoordinates) {
    var element = [tileCoordinates.x, tileCoordinates.y];
    this.prototype.add(element);
}
SetWrapper.has = function(tileCoordinates) {
    var element = [tileCoordinates.x, tileCoordinates.y];
    this.prototype.has(element);
}*/

//get max and min, and then return a square made out of those?
function PossibleMovesHelper(x, y, visited, tileMap, moveLimit) {
    /*traversable will be checked one level up...*/
    if(!tileMap.contains(x, y) || !tileMap.get(x, y).traversable) {
        return null;
    }
    if(moveLimit == 0) {
        return {x: x, y: y};
    }
    visited.push({x: x, y: y});
    visited.push.apply([
        PossibleMovesHelper(x + 1, y, visited, tileMap, moveLimit-1), 
        PossibleMovesHelper(x - 1, y, visited, tileMap, moveLimit-1), 
        PossibleMovesHelper(x, y + 1, visited, tileMap, moveLimit-1), 
        PossibleMovesHelper(x, y - 1, visited, tileMap, moveLimit-1)
    ]);
}

/* Takes in the main tileMap and returns a smaller tileMap
  of possible moves for the actor to make. */
function GetPossibleMoves(x, y, visited, moveLimit, tileMap) {
    var x = actor.x;
    var y = actoy.y;
    var visited = [{x: x, y: y}];
    visited.push.apply([
        PossibleMovesHelper(x + 1, y, visited, tileMap, moveLimit), 
        PossibleMovesHelper(x - 1, y, visited, tileMap, moveLimit), 
        PossibleMovesHelper(x, y + 1, visited, tileMap, moveLimit), 
        PossibleMovesHelper(x, y - 1, visited, tileMap, moveLimit)
    ]);
    visited.filter(null);
    //make the tilemap here. 
    //initialize the tileMap with everything to null
    //then go through the list and add stuff
    var finalTileMap = new TileMap(2*moveLimit+1, 2*moveLimit+1, null, x-moveLimit, y-moveLimit);
    var i;
    while(i = 0; i < visited.length; i++) {
        
    }
}

function ManhattanHeuristic(start, goal) {
    var dx = Math.abs(start.x - goal.x);
    var dy = Math.abs(start.y - goal.y);
    return 1 * (dx + dy);
}

function FindShortestPath(start, goal, tileMap) {
    /* Optimizations that can be made here:
    only investigate the zone that can be moved in. */
    var closedSet = new TileValueMap(tileMap);
    var openSet = new PriorityQueue();
    openSet.add(start);
    var neighbors = [
        new TileCoordinates(1, 0),
        new TileCoordinates(-1, 0),
        new TileCoordinates(0, 1),
        new TileCoordinates(0, -1)
    ];
    var cameFrom = new TileValueMap(tileMap);
    var gScore = new TileValueMap(tileMap);
    gScore.insert(start, 0);
    var fScore = new TileValueMap(tileMap);
    fScore.insert(start, ManhattanHeuristic(start, goal));
    //console.log(goal);
    //console.log(ManhattanHeuristic(start, goal));
    while(openSet.length != 0) {
        /*console.log("Open set:");
        console.log(openSet);
        console.log("Closed set:")
        console.log(closedSet);*/
        var current = openSet.remove();
        //console.log("Current node with fScore of " + fScore.get(current) + " and gScore of " + gScore.get(current));
        //console.log(current);
        var nextNode = openSet.head;
        while(nextNode != null) {
            //console.log(fScore.get(nextNode.value));
            nextNode = nextNode.next;
        }
        if(current.equals(goal)) {
            return ReconstructPath(cameFrom, current);
        }
        //tileMap.getTile(current).draw(e_ctx, current);
        closedSet.insert(current, true);
        var currentNeighbors = [
            new TileCoordinates(current.x + neighbors[0].x, current.y + neighbors[0].y),
            new TileCoordinates(current.x + neighbors[1].x, current.y + neighbors[1].y),
            new TileCoordinates(current.x + neighbors[2].x, current.y + neighbors[2].y),
            new TileCoordinates(current.x + neighbors[3].x, current.y + neighbors[3].y)
        ];
        for(i = 0; i < currentNeighbors.length; i++) {
            //The tile object that has functions.
            //console.log("Neighbor tile: ");
            var neighborTile = tileMap.getTile(currentNeighbors[i]);
            //The coordinates
            var neighbor = currentNeighbors[i];
            //console.log(neighbor);
            if(closedSet.get(neighbor)) {
                //console.log("Neighbor tile skipped");
                continue;
            } else if(neighborTile == null) {
                //console.log("Neighbor tile skipped");
                continue;
            } else if(!neighborTile.traversable) {
                //console.log("Neighbor tile skipped");
                continue;
            }
            var neighborGScore = gScore.get(neighbor);
            if(!neighborGScore) {
                gScore.insert(neighbor, 10000);
            }
            var tentativeGScore = gScore.get(current) + 1;
            if(!(openSet.contains(neighbor))) {
                var neighborFScore = fScore.get(neighbor);
                if(!neighborFScore) {
                    fScore.insert(neighbor, 10000);
                }
            } else if (tentativeGScore >= gScore.get(neighbor)){
                continue;
            }
            cameFrom.insert(neighbor, current);
            gScore.insert(neighbor, tentativeGScore);
            fScore.insert(neighbor, gScore.get(neighbor) + ManhattanHeuristic(neighbor, goal));
            openSet.add(neighbor, fScore);
        }
    }
    return null;
}

function ReconstructPath(cameFrom, current) {
    var totalPath = new Array(cameFrom.backingArray.length * 2);
    var i = 0;
    totalPath.unshift(current);
    i += 1;
    while(cameFrom.contains(current)) {
        current = cameFrom.get(current);
        totalPath.unshift(current);
        i += 1;
    }
    return totalPath;
}

/*console.log("starting here!");
var canvas = document.getElementById("background");
var testTileMap = new TileMap(4, canvas);
for(x = 0; x < testTileMap.size_x; x++) {
    for(y = 0; y < testTileMap.size_y; y++) {
        testTileMap.add(x, y, terrain.grass);
    }
}
var shortestPath = FindShortestPath(new TileCoordinates(0, 0), new TileCoordinates(3, 3), testTileMap);
console.log(shortestPath);
var testFScore = new TileValueMap(testTileMap);
testFScore.insert(new TileCoordinates(0, 1), 1);
testFScore.insert(new TileCoordinates(0, 2), 2);
testFScore.insert(new TileCoordinates(0, 3), 3);
testFScore.insert(new TileCoordinates(0, 4), 4);
//console.log(testFScore.get(new TileCoordinates(0, 1)));
testQueue.add(new TileCoordinates(0, 1), testFScore);
testQueue.add(new TileCoordinates(0, 2), testFScore);
testQueue.add(new TileCoordinates(0, 3), testFScore);
testQueue.add(new TileCoordinates(0, 4), testFScore);
console.log(testQueue.contains(new TileCoordinates(0, 1)));
console.log(testQueue.contains({x: 0, y: 1}));
console.log(testQueue);*/
