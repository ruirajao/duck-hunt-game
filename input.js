const element = document.getElementById('duck');
const container = document.getElementById('boardContainer');

let posX = Math.floor(Math.random() * (container.offsetWidth - 10 + 1)) + 10;
let posY = 0.75 * container.offsetHeight;
let vx = 2;
let vy = 2; // Update with your desired vertical velocity

function getRandomSign() {
    return Math.random() < 0.5 ? -1 : 1;
}

let signX = getRandomSign(); // Sign for horizontal velocity
let signY = -1; // Sign for vertical velocity (always up)

let counter = 0;
function animateElement() {
    // Update the position based on velocity
    if (counter === 0) {
        posX = posX + vx * signX;
        posY = posY + vy * signY;

        //Diagonal up right
        if (vx * signX > 0) {
            element.style.backgroundImage = 'url("sprites/duck/flyrightup.gif")';
        }

        //Diagonal up left
        if (vx * signX < 0) {
            element.style.backgroundImage = 'url("sprites/duck/flyleftup.gif")';
        }
    }

    if (counter > 0) {
        posX = posX + vx * signX;
        posY = posY + vy * signY;
    }


    //Diagonal down right
    if (vx * signX > 0 && vy * signY > 0) {
        element.style.backgroundImage = 'url("sprites/duck/flyrightdown.gif")';
    }

    //Diagonal up right
    if (vx * signX > 0 && vy * signY < 0) {
        element.style.backgroundImage = 'url("sprites/duck/flyrightup.gif")';
    }

    //Diagonal down left
    if (vx * signX < 0 && vy * signY > 0) {
        element.style.backgroundImage = 'url("sprites/duck/flyleftdown.gif")';
    }

    //Diagonal up left
    if (vx * signX < 0 && vy * signY < 0) {
        element.style.backgroundImage = 'url("sprites/duck/flyleftup.gif")';
    }


    // Get container dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Get element dimensions
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Check for collision with container's left or right edge
    if (posX < 0 || posX + elementWidth > containerWidth) {
        signX *= -1; // Reverse horizontal velocity
    }

    // Check for collision with container's top or bottom edge
    if (posY < 0 || posY + elementHeight > containerHeight) {
        vy *= -1; // Reverse vertical velocity
    }

    // Apply the updated position
    element.style.top = `${posY}px`;
    element.style.left = `${posX}px`;

    counter++;

    // Call the animation function again in the next frame
    requestAnimationFrame(animateElement);
}

// Call the animation function initially
animateElement();

// Add event listener to container to trigger animation on click
    // container.addEventListener('click', animateSpawn());
