let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5Circles();
    draw5RedSquares();
    drawGrid(canvasWidth, canvasHeight);
    draw5CirclesWhile();
    draw5CirclesFor();
    drawNCirclesFlexible(10, 25, 200, 200);
    drawNShapesFlexible(10, 25, 700, 200, "square");
    drawNShapesFlexible(5, 100, 800, 200, "circle");
    drawNShapesDirectionFlexible(15, 30, 1000, 200, "square", "column");
    drawNShapesDirectionFlexible(2, 20, 1100, 200, "circle", "column");
    drawNShapesDirectionFlexible(5, 30, 100, 100, "square", "row");
    drawNShapesDirectionFlexible(3, 100, 900, 100, "circle", "row");
}

// my first function
function draw5Circles() {
    noFill();
    // fill('red');
    circle(100, 200, 50); // centerX, centerY, radius
    circle(100, 250, 50);
    circle(100, 300, 50);
    circle(100, 350, 50);
    circle(100, 400, 50);
}

function draw5CirclesWhile() {
    noFill();

    let count = 0;
    
    while(count < 5) {
        let y = 200 + 50*count;
        circle(500, y, 50);
        count ++;
    }
}

function draw5CirclesFor() {
    noFill();

    for(let i = 0; i < 5; i++){
        let y = 200 + 50*i;

        circle(600, y, 50);
    }
}

function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}

function drawNCirclesFlexible(n, size, x, y) {
    fill("green");

    for(let i = 0; i < n; i++) {
        let currY = y + size*i;

        circle(x, currY, size);
    }
}

function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
    fill("blue");

    if(direction !== "row") {
        for(let i = 0; i < n; i++) {
            let currY = y + size*i;

            if(shape === "circle") {
                circle(x, currY, size);
            } else {
                square(x, currY, size);
            }
        } 
    } else { 
        for(let i = 0; i < n; i++) {
            let currX = x + size*i;

            if(shape === "circle") {
                circle(currX, y, size);
            } else {
                square(currX, y, size);
            }
        }
    }
}

function drawNShapesFlexible(n, size, x, y, shape, direction) {
    fill("green");

    for(let i = 0; i < n; i++) {
        let currY = y + size*i;

        if(shape === "circle") {
            circle(x, currY, size);
        } else {
            square(x, currY, size);
        }
    } 
}
