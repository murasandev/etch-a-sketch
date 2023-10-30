const etchContainer = document.querySelector(".etch-container");
let square = document.querySelector(".square");

let isInitialColor = true;

let useColorSet = "randColor";
let randColorSet = "randColor";

square.addEventListener("mouseover", () => {
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
            square.style.backgroundColor = "rgb(255, 255, 255)";
            break;

        case "randColor":
            setRandomColor();
            break;
    }
}

function setSecondColor() {
    switch(useColorSet) {
        case "blackWhite":
            square.style.backgroundColor = "green";
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

    // note:reset alpha to 0 when mouseup
    if(randColorA < 100) {
        randColorA += 1;
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

// change color of square
// for(i = 0; i < numberOfSquares * numberOfSquares; i++) {
//     clonedSquare[i].addEventListener("mouseover", () => {
//         // change color on hover
//         if (isInitialColor) {
//             // setFirstColor();
//             clonedSquare[i].style.backgroundColor = "black";
//             isInitialColor = false;
//         }
//         else {
//             // setSecondColor();
//             clonedSquare[i].style.backgroundColor = "white";
//             isInitialColor = true;
//         }
//     });
// }
// function setFirstColor() {
//     switch(useColorSet) {
//         case "blackWhite":
//             square.style.backgroundColor = "rgb(255, 255, 255)";
//             break;

//         case "randColor":
//             setRandomColor();
//             break;
//     }
// }

// function setSecondColor() {
//     switch(useColorSet) {
//         case "blackWhite":
//             square.style.backgroundColor = "green";
//             break;
        
//         case "randColor":
//             setRandomColor();
//             break;
//     }
// }

// function setRandomColor() {
//     randColorR = Math.floor(Math.random() * 256);
//     randColorG = Math.floor(Math.random() * 256);
//     randColorB = Math.floor(Math.random() * 256);

//     square.style.backgroundColor = `rgb(${randColorR}, ${randColorG}, ${randColorB}, ${randColorA}%)`;
    
//     if(randColorA < 100) {
//         randColorA += 10;
//     }
// }
const allSquares = document.querySelectorAll(".square");

function hoverSquare() {
    if(useColorSet === "blackWhite") {
        this.style.backgroundColor = "white";
    }
    else {
        setRandomColor();
        this.style.backgroundColor = `rgb(${randColorR}, ${randColorG}, ${randColorB}, ${randColorA}%)`;
    }
}

// to add mousedown feature, set a bool to trigger when mouse is down and 
// reset bool when mouse is up
allSquares.forEach(function(node) {
    node.addEventListener("mouseover", hoverSquare);
})