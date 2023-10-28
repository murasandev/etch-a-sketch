const etchContainer = document.querySelector(".etch-container");
let squareColor = document.querySelector(".square");
let isInitialColor = true;

let useColorSet = "randColor";
let randColorSet = "randColor";

squareColor.addEventListener("mouseover", () => {
    // change color on hover
    console.log("hover");
    if (isInitialColor) {
        setFirstColor();
        isInitialColor = false;
    }
    else {
        setSecondColor();
        isInitialColor = true;
    }
});

function setFirstColor() {
    switch(useColorSet) {
        case "blackWhite":
            squareColor.style.backgroundColor = "rgb(255, 255, 255)";
            break;

        case "randColor":
            setRandomColor();
            break;
    }
}

function setSecondColor() {
    switch(useColorSet) {
        case "blackWhite":
            squareColor.style.backgroundColor = "green";
            break;
        
        case "randColor":
            setRandomColor();
            break;
    }
}

let randColorR;
let randColorG;
let randColorB;
let randColorA = 10;

function setRandomColor() {
    randColorR = Math.floor(Math.random() * 256);
    randColorG = Math.floor(Math.random() * 256);
    randColorB = Math.floor(Math.random() * 256);

    squareColor.style.backgroundColor = `rgb(${randColorR}, ${randColorG}, ${randColorB}, ${randColorA}%)`;
    
    if(randColorA < 100) {
        randColorA += 10;
    }
    
}

// Clone Square ---------------------------------------------------

const clonedSquare = [];
let numberOfSquares = 20;
let squareSize;

squareDimensions();

function duplicateSquare() {
    for(i = 0; i < numberOfSquares * numberOfSquares; i++) {
        clonedSquare[i] = squareColor.cloneNode(true);
        clonedSquare[i].style.height = `${squareSize}px`;
        clonedSquare[i].style.width = `${squareSize}px`;
// set dimensions of square based on number of squares
        etchContainer.appendChild(clonedSquare[i]);
        clonedSquare[i].style.backgroundColor = "black";
    }
}

duplicateSquare();

function squareDimensions() {
    squareSize = 1000 / numberOfSquares;
    alert(squareSize);
}