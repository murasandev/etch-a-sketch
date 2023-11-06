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
    useColorSet = "white";
})

randClrBtn.addEventListener("click", () => {
    useColorSet = "randColor";
})

eraseBtn.addEventListener("click", () => {
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

// Set Custom Dimensions
let boxDimensions;
let numberOfSquares = 20;

// set selector for input then add event listener to catch when enter is pressed
// set input to boxdimensions
const dimensionInput = document.querySelector("#dimensionID");

dimensionInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        boxDimensions = dimensionInput.value;
        numberOfSquares = parseInt(boxDimensions);
        squareDimensions();

        // delete old etch a sketch and re run function to create grid
        clearScreen();
        deleteSquares();

        duplicateSquare();
    }
    setHoverEffect();
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

        clonedSquare.push(clonedSquare[i]);
        etchContainer.appendChild(clonedSquare[i]);
    }
}

const allSquares = document.querySelectorAll(".square");

function hoverSquare() {
    if(isMouseDown) {
        setColor(useColorSet);
        this.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB}, ${colorA}%)`;
    }
}

function setHoverEffect() {
    allSquares.forEach(function(node) {
        node.addEventListener("mouseover", hoverSquare);
    })
}

setHoverEffect();

window.addEventListener("mousedown", function(event){
  isMouseDown = true;  
  colorA = 0;
})

window.addEventListener("mouseup", function(event){
    isMouseDown = false;
})

function clearScreen() {
    allSquares.forEach(function(node) {
        node.style.backgroundColor = "rgb(255, 255, 255, 0.1)";
    })
}

function deleteSquares() {
    while (etchContainer.firstChild) {
        etchContainer.removeChild(etchContainer.firstChild);
    }
}

function setVolume() {
    const bgMusic = document.querySelector("#bg-music");
    bgMusic.volume = .5;
}

setVolume();