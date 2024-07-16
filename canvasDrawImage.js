const CANVAS = document.getElementById("cv-draw-img");

const CONTEXT = CANVAS.getContext("2d");
const IMAGE_PATH = "images/Pictures";

function tileSize(unitSize) {
    let tile = {original : 16,scale : 2}
    return unitSize * (tile.scale * tile.original)
}

CANVAS.width = tileSize(18)
CANVAS.height = tileSize(18)
const unitSizeX = 4
const unitSizeY = 3
var sizeX = CANVAS.width / unitSizeX
var sizeY = CANVAS.height / unitSizeY
class Ctx {
    rect(c, x, y, w, h){
        CONTEXT.fillStyle = c
        CONTEXT.fillRect(x, y, w, h)
    }
}
let ctx = new Ctx()
class PackImage {
    constructor(imageName = "p0.jpg", x = 0, y = 0, width = 64, height = 64) {
        this.imageName = imageName
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw() {
        let classImage = new Image()
        classImage.src = IMAGE_PATH + "/" + this.imageName
        CONTEXT.drawImage(classImage, this.x, this.y, this.width, this.height)
    }

    move(maxHeight) {
        if (this.y <= maxHeight) {
            this.y = this.y + 2
        }
        if (this.y >= maxHeight) {
            this.y = sizeY * -1
        }
    }
}

var images = []
const original = {position : {x : 0, y : -1}}
function createImage(number){
    let group = []
    let location = {x : 0, y : -1, unitsize : {dow : 1, up : -1}}
    let position = {x : location.x, y : location.y}

    for (let i = 0; i <= number; i++) {
        if (position.x >= unitSizeX) {
            position.x = location.x
            position.y = position.y + location.unitsize.dow
        }
        group.push(new PackImage(`p${i}.jpg`, sizeX * position.x, sizeY * position.y, sizeX, sizeY))
        position.x = position.x + location.unitsize.dow
        images.push(group[i])
    }
    return group
}

drawimg = createImage(15)

function canvasUpdate() {
    ctx.rect("black", 0, 0, CANVAS.width, CANVAS.height);
    for (let l = 0; l <= images.length; l++) {
        let img = images[l]
        img.draw()
        img.move(CANVAS.height)
    }
}

window.onload = function() {
    setInterval(canvasUpdate, 1000 / 60)
}