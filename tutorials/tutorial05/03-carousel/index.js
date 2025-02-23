let currentPosition = 0;
let gap = 10;
const slideWidth = 400;

function moveCarousel(direction) {
    //grabs the class labeled carousel carousel
    const items = document.querySelectorAll(".carousel-item");

    //if direction is forward, it moves the items in that direction else it moves back
    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        if (currentPosition >= items.length - 2) {
            return false;
        }
        currentPosition++;
    } else {
        if (currentPosition == 0) {
            return false;
        }
        currentPosition--;
    }

    const offset = (slideWidth + gap) * currentPosition;
    //sets offset to class grabbed
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
