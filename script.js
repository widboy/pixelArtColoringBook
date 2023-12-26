
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pixel-grid');
    const ctx = canvas.getContext('2d');
    const colorPalette = document.getElementById('color-palette');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'];
    let currentColor = colors[0]; // Set the default color to the first one in the palette
    const pixelSize = 30; // The size of each cell in the grid

    // Function to draw a grid
    function drawGrid() {
        for (let x = 0; x < canvas.width; x += pixelSize) {
            for (let y = 0; y < canvas.height; y += pixelSize) {
                ctx.strokeRect(x, y, pixelSize, pixelSize);
            }
        }
    }

    // Function to create the color palette
    function createColorPalette() {
        colors.forEach(color => {
            let colorSquare = document.createElement('div');
            colorSquare.className = 'color-square';
            colorSquare.style.backgroundColor = color;
            colorSquare.addEventListener('click', function() {
                document.querySelectorAll('.color-square').forEach(sq => sq.classList.remove('selected'));
                colorSquare.classList.add('selected');
                currentColor = color;
            });
            colorPalette.appendChild(colorSquare);
        });
        colorPalette.children[0].classList.add('selected');
    }

    // Function to paint a pixel with the current color
    function paintPixel(x, y) {
        ctx.fillStyle = currentColor;
        ctx.fillRect(x - (x % pixelSize), y - (y % pixelSize), pixelSize, pixelSize);
    }

    // Event listener for canvas clicks
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; // Relationship bitmap vs. element for X
        const scaleY = canvas.height / rect.height; // Relationship bitmap vs. element for Y

        const x = (e.clientX - rect.left) * scaleX; // Adjust mouse X coordinate to canvas scale
        const y = (e.clientY - rect.top) * scaleY; // Adjust mouse Y coordinate to canvas scale
        paintPixel(x, y);
        drawGrid(); // Redraw the grid to maintain grid lines over colored pixels
    });

    // Initialize the color palette and the grid
    createColorPalette();
    drawGrid();
});
