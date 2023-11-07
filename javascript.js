const etchContainer = document.querySelector(".etch-container");
let square = document.querySelector(".square");

// controls color set in setColor Function
let useColorSet;
let isErasing;

// buttons
const whiteBtn = document.querySelector(".colorOptionBW");
const randClrBtn = document.querySelector(".colorOptionRand");
const eraseBtn = document.querySelector(".colorOptionErase");
const clearBtn = document.querySelector(".colorClear");

whiteBtn.addEventListener("click", () => {
    disableAllColorOptions();
    useColorSet = "white";
})

randClrBtn.addEventListener("click", () => {
    disableAllColorOptions();
    useColorSet = "randColor";
})

eraseBtn.addEventListener("click", () => {
    disableAllColorOptions();
    useColorSet = "erase";
})

clearBtn.addEventListener("click", () => {
    clearScreen();
})

let isMouseDown;

let colorR;
let colorG;
let colorB;
let colorA;

// change this to use above variables for any color and random color
function setColor(useColorSet) {
    switch(useColorSet){ 
        case "randColor":
            colorR = Math.floor(Math.random() * 256);
            colorG = Math.floor(Math.random() * 256);
            colorB = Math.floor(Math.random() * 256);
            break;

        case "white":
            colorR = 255;
            colorG = 255;
            colorB = 255;
            break;
        
        case "erase":
            colorR = 255;
            colorG = 255;
            colorB = 255;
            colorA = 10;
    }
    
    // note:reset alpha to 0 when mouseup
    if(colorA < 100 && !isErasing) {
        colorA += 1;
    }
}

// color pallette ocean
const btnOceanTheme = document.querySelector(".colorOceanTheme");
let activeOceanTheme;

function enableOceanTheme() {
    disableAllColorOptions();
    activeOceanTheme = true;
}



btnOceanTheme.addEventListener("click", enableOceanTheme);
function oceanTheme() {
    let numberOfColors = 4;
    let colorChoice = Math.floor(Math.random() * numberOfColors);
    switch(colorChoice){
    
        case 0: //blue
            colorR = 53;
            colorG = 80;
            colorB = 112;
            break;
        
        case 1: //chinese violet
            colorR = 109;
            colorG = 89;
            colorB = 122;
            break;

        case 2: //china rose
            colorR = 181;
            colorG = 101;
            colorB = 118;
            break;

        case 3: //buff
            colorR = 234;
            colorG = 172;
            colorB = 139;
            break;
    }

    if(colorA < 100 && !isErasing) {
        colorA += 1;
    }
}

const btnSunsetTheme = document.querySelector(".colorSunsetTheme");
let activeSunsetTheme;

function enableSunsetTheme() {
    disableAllColorOptions();
    activeSunsetTheme = true;
}

function disableAllColorOptions() {
    activeOceanTheme = false;
    activeSunsetTheme = false;
}

btnSunsetTheme.addEventListener("click", enableSunsetTheme);
function sunsetTheme() {
    let numberOfColors = 5;
    let colorChoice = Math.floor(Math.random() * numberOfColors);
    switch(colorChoice){
    
        case 0: //puce
            colorR = 179;
            colorG = 136;
            colorB = 154;
            break;
        
        case 1: //salmon pink
            colorR = 242;
            colorG = 143;
            colorB = 164;
            break;

        case 2: //salmon pink 2
            colorR = 255;
            colorG = 158;
            colorB = 173;
            break;

        case 3: //melon
            colorR = 255;
            colorG = 176;
            colorB = 173;
            break;

        case 4: //apricot
            colorR = 252;
            colorG = 209;
            colorB = 182;
            break;
    }

    if(colorA < 100 && !isErasing) {
        colorA += 1;
    }
}
// color pallette sunset
// puce 179 136 154
// salmon pink 242 143 163
// salmon pink 255 158 173
// melon 255 176 173
// apricot 252 209 182

// Set Custom Dimensions
let boxDimensions;
let numberOfSquares = 20;

const dimensionInput = document.querySelector("#dimensionID");

dimensionInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        boxDimensions = dimensionInput.value;
        numberOfSquares = parseInt(boxDimensions);

        if (boxDimensions > 1 && boxDimensions < 101) {
            squareDimensions();

            clearScreen();
            deleteSquares();
    
            duplicateSquare();
        }
        else {
            alert("Please enter a value between 2 and 100.");
        }
    }
})

// Clone Square ---------------------------------------------------

const clonedSquare = [];

let squareSize;
let containerHeight = 750;

squareDimensions();
duplicateSquare();

// set dimensions of square based on number of squares
function squareDimensions() {
    squareSize = containerHeight / numberOfSquares;
}

function duplicateSquare() {
    for(i = 0; i < numberOfSquares * numberOfSquares; i++) {
        clonedSquare[i] = square.cloneNode(true);

        clonedSquare[i].style.height = `${squareSize}px`;
        clonedSquare[i].style.width = `${squareSize}px`;
        clonedSquare[i].style.backgroundColor = "rgb(255, 255, 255, 0.1)";
        clonedSquare[i].addEventListener("mouseover", hoverSquare);

        clonedSquare.push(clonedSquare[i]);
        etchContainer.appendChild(clonedSquare[i]);
    }
}

const allSquares = document.querySelectorAll(".square");

// colors square on mouseover
function hoverSquare() {
    if(isMouseDown) {
        if(activeOceanTheme) {
            oceanTheme();
        }
        else if(activeSunsetTheme) {
            sunsetTheme();
        }
        else {
            setColor(useColorSet);
        }
        
        this.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB}, ${colorA}%)`;
    }
}

// mouseup mousedown functions control when you can draw on hover
window.addEventListener("mousedown", function(event){
  isMouseDown = true;  
  colorA = 0;
})

window.addEventListener("mouseup", function(event){
    isMouseDown = false;
})

// set color of all squares back to default
function clearScreen() {
    clonedSquare.forEach(function(node) {
        node.style.backgroundColor = "rgb(255, 255, 255, 0.1)";
    })
}

// delete old squares in etchContainer before creating new squares
function deleteSquares() {
    while (etchContainer.firstChild) {
        etchContainer.removeChild(etchContainer.firstChild);
    }
}

// control audio level at start
function setVolume() {
    const bgMusic = document.querySelector("#bg-music");
    bgMusic.volume = .5;
}

setVolume();