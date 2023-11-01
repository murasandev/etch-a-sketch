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

// Clone Square ---------------------------------------------------

const clonedSquare = [];
let numberOfSquares = 50;
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

allSquares.forEach(function(node) {
    node.addEventListener("mouseover", hoverSquare);
})

window.addEventListener("mousedown", function(event){
  isMouseDown = true;  
  console.log(isMouseDown);
  colorA = 0;
})

window.addEventListener("mouseup", function(event){
    isMouseDown = false;
    console.log(isMouseDown);
})

// reset etch a sketch
// loop through all squares and set color to initial color
function clearScreen() {
    allSquares.forEach(function(node) {
        node.style.backgroundColor = "rgb(255, 255, 255, 0.1)";
    })
}

// set custom size of etch container