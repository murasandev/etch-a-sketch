let squareColor = document.querySelector(".square");
let isInitialColor = true;
squareColor.addEventListener("mouseover", () => {
    // change color on hover
    console.log("hover");
    if (isInitialColor) {
        squareColor.style.backgroundColor = "white";
        isInitialColor = false;
    }
    else {
        squareColor.style.backgroundColor = "black";
        isInitialColor = true;
    }
});