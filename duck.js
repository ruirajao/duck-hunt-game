const duckContainer = document.getElementById('duck-container');


let ducksKilled;

function getRandomSign() {
    return Math.random() < 0.5 ? -1 : 1;
}


function spawnDuck(velocity) {
    const duckElement = document.createElement('div');
    duckElement.setAttribute("class", "duck");
    duckContainer.appendChild(duckElement);

    let posX = Math.floor(Math.random() * (fieldContainer.offsetWidth - 10 + 1)) + 10;
    let posY = 0.75 * fieldContainer.offsetHeight;
    let vx = velocity;
    let vy = velocity; // Update with your desired vertical velocity
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
        if (posY < 0 || posY + elementHeight > containerHeight || posY > 0.76 * fieldContainer.offsetHeight) {
            vy *= -1; // Reverse vertical velocity
        }

        // Apply the updated position
        duckElement.style.top = `${posY}px`;
        duckElement.style.left = `${posX}px`;

        counter++;

        // Call the animation function again in the next frame
        requestAnimationFrame(animateElement);
    }

    function listenerHitAndFall() {
        //duckelement click event listener
        duckElement.addEventListener('click', function () {
            checkAndRemoveDuck();
            // duck hit
            duckElement.style.backgroundImage = 'url("sprites/duck/hit.png")';
            vx = 0;
            vy = 0;

            // after 500 milliseconds, the duck starts falling 
            setTimeout(function () {
                const fall = new Audio("audio/duck-falling.mp3");
                fall.play();
                duckElement.style.backgroundImage = 'url("sprites/duck/falling.gif")';
                vy = -6;

            }, 500);
        });

        //fail to hit duckelement click event listener
        document.addEventListener("click", function (event) {
            if (isEnableShooting) {
                if (
                    !event.target.classList.contains("duck") &&
                    !event.target.id.includes("playButton")
                ) {
                    dogLaugh();
                }
            }
        });
    }

    function checkAndRemoveDuck() {
        let rect = duckElement.getBoundingClientRect(); // Get the current position of the duck element
        console.log
        if (rect.bottom > fieldContainer.offsetHeight * 0.75) { // Check if the top of the duck element is beyond the bottom of the screen
            duckElement.remove();
            showDuck(1); // Remove the duck element from the DOM
            ducksKilled++;
            // console.log(Duck.kills);
            // console.log("fieldContainer.offsetHeight:" + fieldContainer.offsetHeight);
            // console.log("passei aqui")
        } else {
            requestAnimationFrame(checkAndRemoveDuck); // Continue checking the position of the duck element
        }
    }

    // initialize the click duck listener
    listenerHitAndFall();

    // Call the animation function initially
    animateElement();
}

function dogLaugh() {
    let dogElement = document.createElement("div");
    let dogContainer = document.getElementById("dog-container");
    dogElement.setAttribute("id", "dog2");
    dogContainer.appendChild(dogElement);
    dogElement.classList.add("laugh");
}

function showDuck(killedDucks) {
    let dogElement = document.createElement("div");
    let dogContainer = document.getElementById("dog-container");
    dogElement.setAttribute("id", "dog2");
    dogContainer.appendChild(dogElement);
    if (killedDucks === 1) {
        dogElement.classList.add("gotOne");
    } else {
        dogElement.classList.add("gotTwo");
    }
}

function deleteAllDucks() {
    const duckElements = document.getElementsByClassName('duck');
    while (duckElements.length > 0) {
        duckElements[0].remove();
    }
}



