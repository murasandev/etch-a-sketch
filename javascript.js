const etchContainer = document.querySelector(".etch-container");
let square = document.querySelector(".square");

// controls color set in setColor Function
let useColorSet;

// buttons
const bwBtn = document.querySelector(".colorOptionBW");
const randClrBtn = document.querySelector(".colorOptionRand");
const eraseBtn = document.querySelector(".colorOptionErase");

bwBtn.addEventListener("click", () => {
    setColor("blackWhite");
})

randClrBtn.addEventListener("click", () => {
    setColor("randColor");
})

let isMouseDown;

let colorR;
let colorG;
let colorB;
let colorA = 1;

// change this to use above variables for any color and random color
function setColor(useColorSet) {
    switch(useColorSet){ 
        case "randColor":
            colorR = Math.floor(Math.random() * 256);
            colorG = Math.floor(Math.random() * 256);
            colorB = Math.floor(Math.random() * 256);
            break;

        case "blackWhite":
            colorR = 255;
            colorG = 255;
            colorB = 255;
            break;

    }
    
    // note:reset alpha to 0 when mouseup
    if(colorA < 100) {
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
        setColor("randColor");
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