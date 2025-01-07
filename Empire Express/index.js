//DATA 
let button_5 = document.querySelector("#button_five");
let button_7 = document.querySelector("#button_seven");
let checkButton = document.querySelector("#checkbtn");
let leadbtn = document.querySelector("#leadbtn");

let leaderBoardPage = document.querySelector("#leaderboard");

let button = document.querySelector("#startbtn");
let rules = document.querySelector("#rulesbtn");
let timeleft = document.querySelector("#timeTaken");

let currentDifficulty = '';  

let win = document.querySelector("#win");

let backbutton = document.querySelector("#backbtn");
let secondbackbtn = document.querySelector("#secondbackbtn");

let page_one = document.querySelector("#page_one");
let page_two = document.querySelector("#page_two");
let page_three = document.querySelector("#page_three");

let boardOne = document.querySelector("#board-five-one");
let board_two = document.querySelector("#board-seven-one");

const fiveXfiveGrids = [
    document.querySelector("#board-five-one"),
    document.querySelector("#board-five-two"),
    document.querySelector("#board-five-three"),
    document.querySelector("#board-five-four"),
    document.querySelector("#board-five-five")
];

const SevenXSevenGrids = [
    board_two,
    document.querySelector("#board-seven-two"),
    document.querySelector("#board-seven-three"),
    document.querySelector("#board-seven-four"),
    document.querySelector("#board-seven-five"),
];

//BOARDS OASIS 7x7
const OasisCoordinates1 = [
    { x: 0, y: 2},
    { x: 0, y: 3},
    { x: 4, y: 6}
]

const OasisCoordinates2 = [
    { x: 0, y: 2},
    { x: 4, y: 1},
    { x: 6, y: 2}
]

const OasisCoordinates3 = [
    { x: 2, y: 0},
    { x: 4, y: 1},
    { x: 6, y: 2}
]

const OasisCoordinates4 = [
    { x: 3, y: 3}
]

const OasisCoordinates5 = [
    { x: 4, y: 4}
]

//BOARDS OASIS 5x5
const oasisCoordinates1 = [
    { x: 0, y: 4 },
    { x: 1, y: 4 },
    { x: 3, y: 3 }
]

const oasisCoordinates2 = [
    { x: 0, y: 0 },
    { x: 2, y: 1 },
    { x: 3, y: 3 }
];

let board_three = document.querySelector("#board-five-three");
const oasisCoordinates3 = [
    { x: 3, y: 1 }
];

let board_four = document.querySelector("#board-five-four");
const oasisCoordinates4 = [
    { x: 4, y: 2 }
];
let board_five = document.querySelector("#board-five-five");
const oasisCoordinates5 = [
    { x: 3, y: 3 }
];

let playersName = document.querySelector("#playersname");
let givenName = document.querySelector("#givenName");
let CountDownEl = document.querySelector("#countdown");

let gameBoard = null;
let gameBoardSeven = null;

let board_fiveXfive = false;
let board_sevenXseven = false;

const tileConfigurations = {
    straightHorizontal: { right: true, left: true, bottom: false, up: false},
    straightVertical: { right: false, left: false, bottom: true, up: true },
    curveLeftUp: { right: false, left: true, bottom: false, up: true},
    curveRightDown: { right: true, left: false, bottom: true, up: false},
    curveLeftDown: {  right: false, left: true, bottom: true, up: false},
    curveRightUp: {  right: true, left: false, bottom: false, up: true},
    bridgeHorizontal: {  right: true, left: true, bottom: false, up: false},
    bridgeVertical: {  right: false, left: false, bottom: true, up: true},
    MountainCurveLeftUp: { right: false, left: true, bottom: false, up: true},
    MountainCurveRightDown: { right: true, left: false, bottom: true, up: false},
    MountainCurveLeftDown: {  right: false, left: true, bottom: true, up: false},
    MountainCurveRightUp: {  right: true, left: false, bottom: false, up: true},
};

const nonRotatableTiles = ["oasis.png", "bridge.png", "bridge_rail.png", "mountain.png", "mountain_rail.png"];

let leaderboard = [];
loadLeaderboard();
// GRID 
const gridSize = 5; 
const gridSeven = 7;
let gameMatrix = [];

function createGrid(num, oasisCordinates){
    for (let x = 0; x < num; x++) {
        let row = [];
        for (let y = 0; y < num; y++) {
            let cell ={
                x: x,
                y: y,
                type: "empty",   
                rotation: 0,
                isConnected: false
            };

            if (oasisCordinates.some(coord => coord.x === x && coord.y === y)) {
                cell.type = "oasis";
                cell.isConnected = true;
            }
            row.push(cell);
        }
        gameMatrix.push(row);
}
}

//createGrid(gridSize, oasisCoordinates2);

//EVENT LISTENERS
button_5.addEventListener("click", () => {
    board_fiveXfive = true;
    board_sevenXseven = false;
    currentDifficulty = "Easy";
    
});

button_7.addEventListener("click", () => {
    board_sevenXseven = true;
    board_fiveXfive = false;
    currentDifficulty = "Hard";
});

checkButton.addEventListener("click", () => {
    updateAllConnections();
})

document.querySelector("#clearLeaderboardBtn").addEventListener('click', () => {
    localStorage.removeItem('leaderboard');
    
    leaderboard = [];

    displayLeaderboard();
});

secondbackbtn.addEventListener("click", () => {
    if (gameBoard) {
        gameBoard.style.display = "grid";
    } else if (gameBoardSeven) {
        gameBoardSeven.style.display = "grid";
    }
    leaderBoardPage.style.display = "none";
    page_two.style.display = "grid";
})

leadbtn.addEventListener("click", () => {
    page_one.style.display = "none";
    page_two.style.display = "none";
    page_three.style.display = "none";
    if (gameBoard) {
        gameBoard.style.display = "none";
    } else if (gameBoardSeven) {
        gameBoardSeven.style.display = "none";
    }
    leaderBoardPage.style.display = "grid";
})

let interval;

button.addEventListener("click", () => {
    
    if(board_fiveXfive){
        const randomGridIndex = Math.floor(Math.random() * fiveXfiveGrids.length);
        let oasisCoordinate = null;
        switch(randomGridIndex){
            case(0):
            oasisCoordinate = oasisCoordinates1
            break;
            case(1):
            oasisCoordinate = oasisCoordinates2
            break;
            case(2):
            oasisCoordinate = oasisCoordinates3
            break;
            case(3):
            oasisCoordinate = oasisCoordinates4
            break;
            case(4):
            oasisCoordinate = oasisCoordinates5
            break;
        }
        createGrid(5, oasisCoordinate); 
        gameBoard = fiveXfiveGrids[randomGridIndex];
        gameBoard.style.display = "grid";
        page_two.style.display = "grid";
        
        addFunctionality(gameBoard);
        addRotateFunctionality(gameBoard);
        console.log(randomGridIndex);
        print(5);
    } 
    else{
        const randomGridIndex = Math.floor(Math.random() * fiveXfiveGrids.length);
        let oasisCoordinate = null;
        switch(randomGridIndex){
            case(0):
            oasisCoordinate = OasisCoordinates1
            break;
            case(1):
            oasisCoordinate =  OasisCoordinates2
            break;
            case(2):
            oasisCoordinate =  OasisCoordinates3
            break;
            case(3):
            oasisCoordinate =  OasisCoordinates4
            break;
            case(4):
            oasisCoordinate =  OasisCoordinates5
            break;
        }
        createGrid(7, oasisCoordinate);
        gameBoardSeven = SevenXSevenGrids[randomGridIndex];
        gameBoardSeven.style.display = "grid";
        page_two.style.display = "grid";

        addFunctionality(gameBoardSeven);
        addRotateFunctionality(gameBoardSeven);
        print(7);
    }
    page_one.style.display = "none";    
    interval = setInterval(updateCountDonw, 1000);
});

rules.addEventListener("click", () => {
    page_one.style.display = "none";
    page_two.style.display = "none";
    page_three.style.display = "grid";
});

backbutton.addEventListener("click", () => {
    console.log("clicked");
    page_three.style.display = "none";
    page_one.style.display = "grid";
});

playersName.addEventListener("input", updateName);

//FUNCTIONS 
let startingMinutes = 20;
let time = startingMinutes * 60;
let initialTime = 20 * 60;
let timeTaken;

function updateName(e){
    givenName.textContent = e.target.value;
}

function updateCountDonw(){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds; 

    CountDownEl.innerHTML = `${minutes}:${seconds}`;
    time--;

    if(win.style.display == "block"){
        clearInterval(interval);
        timeTaken = initialTime - time - 1;
        console.log(timeTaken);
        if(timeTaken < 60){
        timeleft.textContent = `TIME TAKEN ${timeTaken}SEC`
        }else{
            let minutes = Math.floor(timeTaken / 60);
            let seconds = timeTaken % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            timeleft.textContent = `Time Taken: ${minutes} min ${seconds} sec`;
        }

        
        saveScore(givenName.textContent, timeTaken, currentDifficulty);
        displayLeaderboard();
    }
    
}

function print(num){
for(let i = 0; i < num; i++){
    for(let j = 0; j < num; j++){
        console.log(gameMatrix[i][j]);
    }
}
}

function getTileConfiguration(type, rotation) {
    switch (type) {
        case "straight_rail":
            return rotation % 180 === 0 ? tileConfigurations.straightVertical : tileConfigurations.straightHorizontal;
        case "curve_rail":
            switch (rotation) {
                case 0: return tileConfigurations.curveRightDown;
                case 90: return tileConfigurations.curveLeftDown;
                case 180: return tileConfigurations.curveLeftUp;
                case 270: return tileConfigurations.curveRightUp;
                default: return null;
            }
        case "bridge_rail":
            return rotation % 180 === 0 ? tileConfigurations.bridgeVertical : tileConfigurations.bridgeHorizontal;
        case "mountain_rail":
            switch(rotation){
                case 0: return tileConfigurations.MountainCurveRightDown;
                case 90: return tileConfigurations.MountainCurveLeftDown;
                case 180: return tileConfigurations.MountainCurveLeftUp;
                case 270: return tileConfigurations.MountainCurveRightUp;
                default: return null;
            }
        default:
            return null;
    }
}

const changeTile = (tile, x, y) => {
    const currentRotation = tile.getAttribute("curve-straight") || "0";
    const tileType = tile.src;

    if (tileType.endsWith("bridge.png") || tileType.endsWith("bridge_rail.png")) {
        tile.src = "./pictures/tiles/rails/bridge_rail.png"; 
        gameMatrix[x][y].type = "bridge_rail";
        gameMatrix[x][y].connectsBottom = true;
        gameMatrix[x][y].connectsTop = true;
        console.log(gameMatrix[x][y]);
    } else if (tileType.endsWith("mountain.png") || tileType.endsWith("mountain_rail.png")) {
        tile.src = "./pictures/tiles/rails/mountain_rail.png"; 
        gameMatrix[x][y].type = "mountain_rail";
        gameMatrix[x][y].connectsRight = true;
        gameMatrix[x][y].connectsBottom = true;
        console.log(gameMatrix[x][y]);
    } else {
        if (currentRotation == "0") {
            tile.src = "./pictures/tiles/rails/straight_rail.png";
            tile.setAttribute("curve-straight", "1"); 
            gameMatrix[x][y].type = "straight_rail";
            gameMatrix[x][y].connectsBottom = true;
            gameMatrix[x][y].connectsTop = true;
            console.log(gameMatrix[x][y]);
        } else {
            tile.src = "./pictures/tiles/rails/curve_rail.png";
            tile.setAttribute("curve-straight", "0"); 
            gameMatrix[x][y].type = "curve_rail";
            gameMatrix[x][y].connectsRight = true;
            gameMatrix[x][y].connectsBottom = true;
            console.log(gameMatrix[x][y]);
        }
    }
    
    
    isConnected(tile, x, y);
    checkWin();
};


// Checking connectivty
function isConnected(tile, x, y, checkedTiles = new Set()) {
    
    const tileKey = `${x},${y}`;
    if (checkedTiles.has(tileKey)) return; // Avoid re-checking
    checkedTiles.add(tileKey);
    
    if (!tile || !tile.src) {
        console.log(`Tile at x:${x}, y:${y} is invalid or missing src`);
        return; // Exit if the tile or its src is not defined
    }

    console.log(`Checking connection for tile at x:${x}, y:${y}`);
    const type = tile.src.split('/').pop().replace('.png', '');
    let rotation = parseInt(tile.getAttribute("data-rotation")) || 0;
    const config = getTileConfiguration(type, rotation);
    let one = false;
    let two = false;

    let connectedLeft = false;
    let connectedRight = false;
    let connectedTop = false;
    let connectedBottom = false;

    if ((tile.src.endsWith("straight_rail.png") || tile.src.endsWith("bridge_rail.png")) && config) {
        
        if (config.bottom && x < gridSize - 1 && gameMatrix[x + 1] && gameMatrix[x + 1][y] && gameMatrix[x + 1][y].type !== "empty") {
            // let neighborTile = gameMatrix[x + 1][y];
            // if (neighborTile && neighborTile.type !== "empty" && neighborTile.config.top){
            console.log("Connected to the bottom, neighbor has a top connection");
            connectedBottom = true;
            // }else{
            //     connectedBottom = false;
            //     console.log("not connected to bottom");
            // }
        } else {
            console.log("Not connected to the bottom");
            connectedBottom = false;
        }

        if (config.up && x > 0 && gameMatrix[x - 1] && gameMatrix[x - 1][y] && gameMatrix[x - 1][y].type !== "empty") {
            console.log("Connected to the top");
            connectedTop = true;
        } else {
            console.log("Not connected to the top");
            connectedTop = false;
        }

        if (config.left && y > 0 && gameMatrix[x][y-1] && gameMatrix[x][y-1].type !== "empty") {
            console.log("Connected to the left");
            connectedLeft = true;
        } else {
            console.log("Not connected to the left");
            connectedLeft = false;
        }
        
        if (config.right && y < gridSize - 1 && gameMatrix[x][y+1] && gameMatrix[x][y+1].type !== "empty") {
            console.log("Connected to the right");
            connectedRight = true;
        } else {
            console.log("Not connected to the right");
            connectedRight = false;
        }

        if ((connectedLeft && connectedRight) ||
            (connectedTop && connectedBottom)) {
            gameMatrix[x][y].isConnected = true;
            console.log("Tile is properly connected");
        } else {
            gameMatrix[x][y].isConnected = false;
            console.log("Tile is not connected");
        }

    } 
    else if (tile.src.endsWith("curve_rail.png")  && config) {
        const rotation = parseInt(tile.getAttribute("data-rotation")) || 0;
        switch(rotation) {
            case 0:
                if (config.right && y < gridSize - 1 && gameMatrix[x][y + 1] && gameMatrix[x][y + 1].type !== "empty") {
                    console.log("Connected to the right");
                    connectedRight = true;
                } else {
                    console.log("Not connected to the right");
                    connectedRight = false;
                }

                if (config.bottom && x < gridSize - 1 && gameMatrix[x + 1][y] && gameMatrix[x + 1][y].type !== "empty") {
                    console.log("Connected to the bottom");
                    connectedBottom = true;
                } else {
                    console.log("Not connected to the bottom");
                    connectedBottom = false;
                }

                if(connectedRight && connectedBottom){
                    gameMatrix[x][y].isConnected = true;
                    console.log("connected");
                }else{
                    gameMatrix[x][y].isConnected = false;
                }
                break;

            case 90:
                if (config.left && y > 0 && gameMatrix[x][y - 1] && gameMatrix[x][y - 1].type !== "empty") {
                    console.log("Connected to the left");
                    connectedLeft = true;
                } else {
                    console.log("Not connected to the left");
                    connectedLeft = false;
                }

                if (config.bottom && x < gridSize - 1 && gameMatrix[x + 1][y] && gameMatrix[x + 1][y].type !== "empty") {
                    console.log("Connected to the bottom");
                    connectedBottom = true;
                } else {
                    console.log("Not connected to the bottom");
                    connectedBottom = false;
                }  

                if(connectedLeft && connectedBottom){
                    gameMatrix[x][y].isConnected = true;
                    console.log("connected");
                }else{
                    gameMatrix[x][y].isConnected = false;
                }
                break;

            case 180: // Left-up curve
                if (config.left && y > 0 && gameMatrix[x][y - 1] && gameMatrix[x][y - 1].type !== "empty") {
                    console.log("Connected to the left");
                    connectedLeft = true;
                } else {
                    console.log("Not connected to the left");
                    connectedLeft = false;
                }

                if (config.up && x > 0 && gameMatrix[x - 1][y] && gameMatrix[x - 1][y].type !== "empty") {
                    console.log("Connected to the top");
                    connectedTop = true;
                } else {
                    console.log("Not connected to the top");
                    connectedTop = false;
                }
                
                if(connectedLeft && connectedTop){
                    gameMatrix[x][y].isConnected = true;
                    console.log("connected");
                }else{
                    gameMatrix[x][y].isConnected = false;
                }
                break;

            case 270: // Left-down curve
                if (config.right && y < gridSize - 1 && gameMatrix[x][y + 1] && gameMatrix[x][y + 1].type !== "empty") {
                    console.log("Connected to the right");
                    connectedRight = true;
                } else {
                    console.log("Not connected to the right");
                    connectedRight = false;
                }

                if (config.up && x > 0 && gameMatrix[x - 1][y] && gameMatrix[x - 1][y].type !== "empty") {
                    console.log("Connected to the top");
                    connectedTop = true;
                } else {
                    console.log("Not connected to the top");
                    connectedTop = false;
                }
                
                if(connectedRight && connectedTop){
                    gameMatrix[x][y].isConnected = true;
                    console.log("connected");
                }else{
                    gameMatrix[x][y].isConnected = false;
                }
                break;

            default:
                console.log("Unexpected rotation value");
        }
    }else if(tile.src.endsWith("mountain_rail.png") && config){
        const rotation = parseInt(tile.getAttribute("data-rotation")) || 0;
        switch(rotation){
            case 0:
                if (config.right && y < gridSize - 1 && gameMatrix[x][y + 1] && gameMatrix[x][y + 1].type !== "empty") {
                    console.log("Connected to the right");
                    connectedRight = true;
                } else {
                    console.log("Not connected to the right");
                    connectedRight = false;
                }

                if (config.bottom && x < gridSize - 1 && gameMatrix[x + 1][y] && gameMatrix[x + 1][y].type !== "empty") {
                    console.log("Connected to the bottom");
                    connectedBottom = true;
                } else {
                    console.log("Not connected to the bottom");
                    connectedBottom = false;
                }
                
                if(connectedRight && connectedBottom){
                    gameMatrix[x][y].isConnected = true;
                    console.log("connected");
                }else{
                    gameMatrix[x][y].isConnected = false;
                }
                break;

            case 90:
                if (config.left && y > 0 && gameMatrix[x][y - 1] && gameMatrix[x][y - 1].type !== "empty") {
                    console.log("Connected to the left");
                    connectedLeft = true;
                } else {
                    console.log("Not connected to the left");
                    connectedLeft = false;
                }

                if (config.bottom && x < gridSize - 1 && gameMatrix[x + 1][y] && gameMatrix[x + 1][y].type !== "empty") {
                    console.log("Connected to the bottom");
                    connectedBottom = true;
                } else {
                    console.log("Not connected to the bottom");
                    connectedBottom = false;
                }  
                
                if(connectedLeft && connectedBottom){
                    gameMatrix[x][y].isConnected = true;
                    console.log("connected");
                }else{
                    gameMatrix[x][y].isConnected = false;
                }
                break;

            case 180: // Left-up curve
                if (config.left && y > 0 && gameMatrix[x][y - 1] && gameMatrix[x][y - 1].type !== "empty") {
                    console.log("Connected to the left");
                    connectedLeft = true;
                } else {
                    console.log("Not connected to the left");
                    connectedLeft = false;
                }

                if (config.up && x > 0 && gameMatrix[x - 1][y] && gameMatrix[x - 1][y].type !== "empty") {
                    console.log("Connected to the top");
                    connectedTop = true;
                } else {
                    console.log("Not connected to the top");
                    connectedTop = false;
                }
                
                if(connectedLeft && connectedTop){
                    gameMatrix[x][y].isConnected = true;
                    console.log("connected");
                }else{
                    gameMatrix[x][y].isConnected = false;
                }
                break;

            case 270: // Left-down curve
                if (config.right && y < gridSize - 1 && gameMatrix[x][y + 1] && gameMatrix[x][y + 1].type !== "empty") {
                    console.log("Connected to the right");
                    connectedRight = true;
                } else {
                    console.log("Not connected to the right");
                    connectedRight = false;
                }

                if (config.up && x > 0 && gameMatrix[x - 1][y] && gameMatrix[x - 1][y].type !== "empty") {
                    console.log("Connected to the top");
                    connectedTop = true;
                } else {
                    console.log("Not connected to the top");
                    connectedTop = false;
                }
                
                if(connectedRight && connectedTop){
                    gameMatrix[x][y].isConnected = true;
                    console.log("connected");
                }else{
                    gameMatrix[x][y].isConnected = false;
                }
                break;

            default:
                console.log("Unexpected rotation value");
        }        
    }
}


let sourceArray = [];
for(let i = 0; i < sourceArray.length; i++){
    console.log(sourceArray[i]);
}

function addFunctionality(GAMEBOARD){
    GAMEBOARD.addEventListener("click", (e) => {
        checkButton.style.display = "grid";
        leadbtn.style.display = "grid";
        const parentDiv = e.target.parentElement; 
        if (e.target.matches(".img-cell") && !e.target.src.endsWith("oasis.png")) {
            console.log(e.target);
            console.log(parentDiv);
            const x = parseInt(parentDiv.getAttribute("data-x"));
            const y = parseInt(parentDiv.getAttribute("data-y"));
            changeTile(e.target, x, y);
            
            if (!sourceArray.some(tile => tile.x === x && tile.y === y)) {
                sourceArray.push({ tile: e.target, x, y });
            }
            print(5);
        }
        
    });
}

function updateAllConnections() {
    sourceArray.forEach(({ tile, x, y }) => {
        isConnected(tile, x, y);
    });
    checkWin();
}

//ROTATION
const rotateTile = (tile, x, y) => {

    if(!tile.src.endsWith("curve_rail.png"))
        {
        let currentRotation = parseInt(tile.getAttribute("data-rotation")) || 0;
    
        currentRotation = (currentRotation + 90) % 360;
    
        tile.setAttribute("data-rotation", currentRotation);
    
        tile.style.transform = `rotate(${currentRotation}deg)`;
    }else{
        let currentRotation = parseInt(tile.getAttribute("data-rotation")) || 0;
    
        currentRotation = (currentRotation + 90) % 360;
    
        tile.setAttribute("data-rotation", currentRotation);
    
        tile.style.transform = `rotate(${currentRotation}deg)`;
        if(gameMatrix[x][y].rotation < 3){
        gameMatrix[x][y].rotation++;
        }else{
            gameMatrix[x][y].rotation = 0;
        }  
    }
    isConnected(tile, x, y);
    };

function addRotateFunctionality(GAMEBOARD){
    GAMEBOARD.addEventListener("contextmenu", e => {
        const parentDiv = e.target.parentElement; 
        e.preventDefault();
        if(e.target.matches(".img-cell") && !nonRotatableTiles.some(x => e.target.src.endsWith(x)))
        {
            const x = parseInt(parentDiv.getAttribute("data-x"));
            const y = parseInt(parentDiv.getAttribute("data-y"));
            console.log(e.target);
            console.log(gameMatrix[x][y]);
            rotateTile(e.target, x, y);
        }
    });
}

function checkWin() {
    let allConnected = true;

    gameMatrix.forEach(row => {
        row.forEach(tile => {
            if (tile.isConnected === false && tile.type !== "empty") {
                allConnected = false;
                console.log("not yet");
                print();
                return;
            }
        });
    });

    if (allConnected) {
        console.log("win");
        print();
        win.style.display = "block";
        checkButton.style.display = "none";
    }
}

//LEADERBOARD 
function saveScore(playerName, timeTaken, difficulty_level){
    
    leaderboard.push({ name: playerName, time: timeTaken, difficulty_level})
    leaderboard.sort((entry_one, entry_two) => entry_one.time - entry_two.time);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function loadLeaderboard() {
    try{
        const stored_data = localStorage.getItem("leaderboard");
        leaderboard = stored_data ? JSON.parse(stored_data) : [];
    }catch(error){
        console.error("Error", error);
        leaderboard = [];
    }

    displayLeaderboard();
}

function displayLeaderboard() {
    
    const leaderboardElement = document.querySelector("#leaderboardTable tbody");
    leaderboardElement.innerHTML = "";

    for (let index = 0; index < leaderboard.length; index++) {
          
        const entry = leaderboard[index];   
        const row = document.createElement("tr");     
        
        const values = [
            index + 1,
            entry.name,
            `${Math.floor(entry.time / 60)} min ${entry.time % 60} sec`,
            entry.difficulty
        ];
        
        for (let i = 0; i < values.length; i++) {
            const cell = document.createElement("td");
            cell.textContent = values[i];
            row.appendChild(cell);
        
        }
        leaderboardElement.appendChild(row);
    }
}














