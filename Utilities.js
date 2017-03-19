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
