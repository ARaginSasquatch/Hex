// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Wait for the SVG to load
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.addEventListener('load', function() {
        const svgDoc = gameBoard.contentDocument; // Get the SVG document inside the Object tag
        const hexagons = svgDoc.querySelectorAll('polygon, path'); // Assuming you use either <polygon> or <path> for hexagons

        hexagons.forEach(hex => {
            hex.addEventListener('click', function() {
                alert('Hexagon clicked!'); // Replace with your game logic
            });

            // Optional: Add hover effect
            hex.addEventListener('mouseenter', function() {
                hex.style.fill = "#abcdef"; // Change color on hover
            });
            hex.addEventListener('mouseleave', function() {
                hex.style.fill = ""; // Reset to original color
            });
        });
    });
});

