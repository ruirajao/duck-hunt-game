function spawnDuck() {
    const fieldContainer = document.getElementById('field-container');
    const duckContainer = document.getElementById('duck-container');
    const duckElement = document.createElement('div');
    // duckElement.id = 'duck';
    duckElement.setAttribute("class", "duck");
    duckContainer.appendChild(duckElement);

    function checkAndRemoveDuck() {
        let rect = duckElement.getBoundingClientRect(); // Get the current position of the duck element
        if (rect.bottom > fieldContainer.offsetHeight - 150) { // Check if the top of the duck element is beyond the bottom of the screen
            duckElement.remove(); // Remove the duck element from the DOM
            console.log("fieldContainer.offsetHeight-200:" + fieldContainer.offsetHeight - 200);
            console.log("fieldContainer.offsetHeight:" + fieldContainer.offsetHeight);
        } else {
            requestAnimationFrame(checkAndRemoveDuck); // Continue checking the position of the duck element
        }
    }

    duckElement.addEventListener('click', clickDuck = () => {
        // duck hit
        duckElement.style.backgroundImage = 'url("sprites/duck/hit.png")';
        vx = 0;
        vy = 0;


        // after 500 milliseconds, the duck starts falling 
        setTimeout(function () {
            duckElement.style.backgroundImage = 'url("sprites/duck/falling.gif")';
            vy = -2;
            checkAndRemoveDuck();

        }, 500);
        // duckElement.removeEventListener('click', clickDuck);
    });




    let posX = Math.floor(Math.random() * (fieldContainer.offsetWidth - 10 + 1)) + 10;
    let posY = 0.75 * fieldContainer.offsetHeight;
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
                duckElement.style.backgroundImage = 'url("sprites/duck/flyrightup.gif")';
            }

            //Diagonal up left
            if (vx * signX < 0) {
                duckElement.style.backgroundImage = 'url("sprites/duck/flyleftup.gif")';
            }
        }

        if (counter > 0) {
            posX = posX + vx * signX;
            posY = posY + vy * signY;
        }


        //Diagonal down right
        if (vx * signX > 0 && vy * signY > 0) {
            duckElement.style.backgroundImage = 'url("sprites/duck/flyrightdown.gif")';
        }

        //Diagonal up right
        if (vx * signX > 0 && vy * signY < 0) {
            duckElement.style.backgroundImage = 'url("sprites/duck/flyrightup.gif")';
        }

        //Diagonal down left
        if (vx * signX < 0 && vy * signY > 0) {
            duckElement.style.backgroundImage = 'url("sprites/duck/flyleftdown.gif")';
        }

        //Diagonal up left
        if (vx * signX < 0 && vy * signY < 0) {
            duckElement.style.backgroundImage = 'url("sprites/duck/flyleftup.gif")';
        }


        // Get container dimensions
        const containerWidth = fieldContainer.offsetWidth;
        const containerHeight = fieldContainer.offsetHeight;

        // Get element dimensions
        const elementWidth = duckElement.offsetWidth;
        const elementHeight = duckElement.offsetHeight;

        // Check for collision with container's left or right edge
        if (posX < 0 || posX + elementWidth > containerWidth) {
            signX *= -1; // Reverse horizontal velocity
        }

        // Check for collision with container's top or bottom edge
        if (posY < 0 || posY + elementHeight > containerHeight) {
            vy *= -1; // Reverse vertical velocity
        }

        // Apply the updated position
        duckElement.style.top = `${posY}px`;
        duckElement.style.left = `${posX}px`;

        counter++;

        // Call the animation function again in the next frame
        requestAnimationFrame(animateElement);
    }

    // Call the animation function initially
    animateElement();

    // Add event listener to container to trigger animation on click
    // container.addEventListener('click', animateSpawn());
}
