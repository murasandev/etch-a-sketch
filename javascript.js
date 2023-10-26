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

function setRandomColor() {
    randColorR = Math.floor(Math.random() * 256);
    randColorG = Math.floor(Math.random() * 256);
    randColorB = Math.floor(Math.random() * 256);

    squareColor.style.backgroundColor = `rgb(${randColorR}, ${randColorG}, ${randColorB})`;
}