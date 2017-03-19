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
    //this could take up to O(n) so I might have to optimize this later.
    this.add = function(value, fScore) {
        var node = new PriorityQueueNode(value);
        if(this.head == null) {
            this.head = node;
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
                return node;
            }
            if(nextNode.next == null) {
                nextNode.next = node;
                node.prev = nextNode;
                return node;
            }
            nextNode = nextNode.next;
        }
    }
    this.remove = function() {
        var nodeToRemove = this.head;
        this.head = head.next;
        return nodeToRemove;
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
    this.backingArray = (function() {
        var arr = new Array(tileMap.size_x);
        for(i = 0; i < arr.length; i++) {
            arr[i] = new Array(tileMap.size_y);
        }
        return arr;
    })();
    this.insert = function(tileCoordinates, value) {
        this.backingArray[tileCoordinates.x][tileCoordinates.y] = value;
        return this.backingArray[tileCoordinates.x][tileCoordinates.y];
    }
    this.contains = function(tileCoordinates) {
        return this.backingArray[tileCoordinates.x][tileCoordinates.y] != null;
    }
    this.get = function(tileCoordinates) {
        return this.backingArray[tileCoordinates.x][tileCoordinates.y];
    }
}


/*var distances = {
    new TileCoordinates(0, 1): 1,
    new TileCoordinates(0, 2): 2,
    new TileCoordinates(0, 3): 3,
    new TileCoordinates(0, 4): 4
}*/

console.log("starting here!");
var canvas = document.getElementById("background");
var testQueue = new PriorityQueue();
var testTileMap = new TileMap(4, canvas);
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
console.log(testQueue);
