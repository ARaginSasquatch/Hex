const canvas = document.getElementById('hexBoard');
const ctx = canvas.getContext('2d');

const hexSize = 40;
const hexWidth = Math.sqrt(3) * hexSize;
const hexHeight = 2 * hexSize;

// Example hexagonal grid size
const rows = 10;
const cols = 10;

// Store hexagon state (toggleable)
let hexagons = [];

// Hexagon class
class Hexagon {
    constructor(x, y, row, col) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.toggled = false;
    }

    draw() {
        ctx.beginPath();
        for (let i = 0; i < 7; i++) {
            ctx.lineTo(
                this.x + hexSize * Math.cos((i * 60) * Math.PI / 180),
                this.y + hexSize * Math.sin((i * 60) * Math.PI / 180)
            );
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fill hexagon if toggled
        if (this.toggled) {
            ctx.fillStyle = "blue";
            ctx.fill();
        }
    }
}

function createHexagons() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let x = col * 1.5 * hexSize;
            let y = hexHeight * row + ((col % 2) ? -hexSize : 0);
            let hex = new Hexagon(x, y, row, col);
            hexagons.push(hex);
        }
    }
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let hex of hexagons) {
        hex.draw();
    }
}

canvas.addEventListener('click', function(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    for (let hex of hexagons) {
        let dx = mouseX - hex.x;
        let dy = mouseY - hex.y;

        // Check if the click is inside the hexagon using a point-in-hexagon technique
        if (Math.abs(dy) < hexSize && 
            dx > -hexWidth/2 && dx < hexWidth/2 && 
            dy > -hexHeight/2 && dy < hexHeight/2) {
            hex.toggled = !hex.toggled;
            drawBoard();
            break;
        }
    }
});

createHexagons();
drawBoard();
