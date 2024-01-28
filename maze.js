// Define the maze structure using a 2D array
var maze = [
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];

// Define the SDG information
var sdgInfo = [
    "SDG 1: No Poverty - End poverty in all its forms everywhere.",
    "SDG 2: Zero Hunger - End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.",
    "SDG 3: Good Health and Well-being - Ensure healthy lives and promote well-being for all at all ages.",
    // Add information for other SDGs
];

var playerPosition = { x: 0, y: 0 };

// Function to generate the maze
function generateMaze() {
    var mazeElement = document.getElementById("maze");
    
    for (var i = 0; i < maze.length; i++) {
        for (var j = 0; j < maze[i].length; j++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            
            if (maze[i][j] === 1) {
                cell.classList.add("obstacle");
            }
            
            cell.style.top = i * 40 + "px";
            cell.style.left = j * 40 + "px";
            
            mazeElement.appendChild(cell);
        }
    }
    
    // Add the player to the maze
    var player = document.createElement("div");
    player.className = "player";
    player.style.top = playerPosition.y * 40 + "px";
    player.style.left = playerPosition.x * 40 + "px";
    mazeElement.appendChild(player);
}

// Function to handle player movement
function movePlayer(event) {
    var keyCode = event.keyCode;
    var newX = playerPosition.x;
    var newY = playerPosition.y;
    
    if (keyCode === 37) { // Left arrow key
        newX--;
    } else if (keyCode === 38) { // Up arrow key
        newY--;
    } else if (keyCode === 39) { // Right arrow key
        newX++;
    } else if (keyCode === 40) { // Down arrow key
        newY++;
    }
    
    // Check if the new position is valid
    if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length && maze[newY][newX] !== 1) {
        // Move the player
        playerPosition.x = newX;
        playerPosition.y = newY;
        
        var playerElement = document.querySelector(".player");
        playerElement.style.left = playerPosition.x * 40 + "px";
        playerElement.style.top = playerPosition.y * 40 + "px";
        
        // Check if the player collected an SDG item
        var item = document.elementFromPoint(playerElement.offsetLeft + 20, playerElementoffsetTop + 20);
        if (item.classList.contains("item")) {
            item.parentNode.removeChild(item);
            showSDGInfo();
        }
    }
    
    event.preventDefault();
}

// Function to display SDG information
function showSDGInfo() {
    var sdgInfoElement = document.getElementById("sdg-info");
    var sdgIndex = playerPosition.y * maze[0].length + playerPosition.x;
    
    if (sdgIndex < sdgInfo.length) {
        sdgInfoElement.textContent = sdgInfo[sdgIndex];
    } else {
        sdgInfoElement.textContent = "No SDG information available.";
    }
}

// Generate the maze on page load
window.addEventListener("load", function() {
    generateMaze();
    showSDGInfo();
});

// Handle player movement on key press
window.addEventListener("keydown", movePlayer);