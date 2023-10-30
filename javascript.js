const etchContainer = document.querySelector(".etch-container");
let square = document.querySelector(".square");

// controls color set in setColor Function
let useColorSet = "blackWhite";

let colorR;
let colorG;
let colorB;
let colorA = 1;

// change this to use above variables for any color and random color
function setColor() {
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
let numberOfSquares = 20;
let squareSize;

squareDimensions();
duplicateSquare();

// set dimensions of square based on number of squares
function squareDimensions() {
    squareSize = 1000 / numberOfSquares;
}

function duplicateSquare() {
    for(i = 0; i < numberOfSquares * numberOfSquares; i++) {
        clonedSquare[i] = square.cloneNode(true);

        clonedSquare[i].style.height = `${squareSize}px`;
        clonedSquare[i].style.width = `${squareSize}px`;
        clonedSquare[i].style.backgroundColor = "black";

        clonedSquare.push(clonedSquare[i]);
        etchContainer.appendChild(clonedSquare[i]);
    }
}

const allSquares = document.querySelectorAll(".square");

function hoverSquare() {
    setColor();
    this.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB}, ${colorA}%)`;
}

// to add mousedown feature, set a bool to trigger when mouse is down and 
// reset bool when mouse is up
allSquares.forEach(function(node) {
    node.addEventListener("mouseover", hoverSquare);
})