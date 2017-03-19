function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawBorders() {
    for(x = 0; x*8 < background.width; x++) {
        for(y = 0; y*8 < background.height; y++)    {
            //println("getting here but not drawing");
            b_ctx.beginPath();
            b_ctx.strokeStyle = "black";
            b_ctx.moveTo(x * 8 - 0.5, y * 8 - 0.5);
            b_ctx.lineTo(background.width - 0.5, y * 8 - 0.5);
            b_ctx.stroke();
            b_ctx.closePath();
            for(x_i = 0; x_i*8 < background.width; x_i++) {
                b_ctx.beginPath();
                b_ctx.strokeStyle = "black";
                b_ctx.moveTo(x_i * 8 - 0.5, y * 8 - 0.5);
                b_ctx.lineTo(x_i * 8 - 0.5, background.height - 0.5);
                b_ctx.stroke();
                b_ctx.closePath();
            }
        }
    }
}

function drawRect(x, y, color) {
    e_ctx.beginPath();
    e_ctx.fillStyle = color;
    e_ctx.fillRect(x - 0.25, y - 0.25, 8, 8);
    e_ctx.closePath();
}

function mouseDownHandler(e) {
    var mapWidth = e.target.width * zoomLevel;
    var mapHeight = e.target.height * zoomLevel;
    var x = e.clientX - (e.target.getBoundingClientRect().left * zoomLevel); //The game board starts 100 pixels from the top left in the window.
    var y = e.clientY - (e.target.getBoundingClientRect().top * zoomLevel);
    x = Math.floor(x / mapWidth * tileMap.size_x);
    y = Math.floor(y / mapHeight * tileMap.size_y);
    player.move(x, y);
    //To get tile, first subtract clientX and Y by 100 in order to set position to top left
}

function mouseMoveHandler(e) {
    var mapWidth = e.target.width * zoomLevel;
    var mapHeight = e.target.height * zoomLevel;
    var x = e.clientX - (e.target.getBoundingClientRect().left * zoomLevel); //The game board starts 100 pixels from the top left in the window.
    var y = e.clientY - (e.target.getBoundingClientRect().top * zoomLevel);
    x = Math.floor(x / mapWidth * tileMap.size_x);
    y = Math.floor(y / mapHeight * tileMap.size_y);
    //console.log(x + ", " + y);
    //console.log(tileMap.getTile(x, y));
    if((x != currentTileFocus.x || y != currentTileFocus.y) || (x != player.x || y != player.y)) {
        e_ctx.clearRect(currentTileFocus.x * 8 - 1, currentTileFocus.y * 8 - 1, 9, 9);
        currentTileFocus.x = x;
        currentTileFocus.y = y;
        drawRect(x * 8, y * 8, "blue");
    }
}

function imageLoader(src) {
    var img = new Image();
    img.src = String(src);
    return img;
}
