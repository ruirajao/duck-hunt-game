const duckContainer = document.getElementById('duck-container');


let totalDucksKilled = 0; //TODO: Use this for points
let ducksKilledWave = 0;

function getRandomSign() {
    return Math.random() < 0.5 ? -1 : 1;
}


function spawnDuck(velocity) {
    const duckElement = document.createElement('div');
    duckElement.setAttribute("class", "duck");
    duckContainer.appendChild(duckElement);

    let posX = Math.floor(Math.random() * (fieldContainer.offsetWidth - 25)) + 25;
    let posY = 0.75 * fieldContainer.offsetHeight;
    let vx = velocity;
    let vy = velocity; // Update with your desired vertical velocity
    let signX = getRandomSign(); // Sign for horizontal velocity
    let signY = -1; // Sign for vertical velocity (always up)
    let counter = 0;



    function animateElement() {
        const containerWidth = fieldContainer.offsetWidth;
        const containerHeight = fieldContainer.offsetHeight;
        const elementWidth = duckElement.offsetWidth;
        const elementHeight = duckElement.offsetHeight;

        // First spawn directions (counter === 0)
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

        // Fly directions (counter > 0)
        if (counter > 0) {
            posX = posX + vx * signX;
            posY = posY + vy * signY;
        }

        // Diagonal down right
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

        // Check for collision with container's left or right edge
        if (posX < 0 || posX + elementWidth > containerWidth) {
            signX *= -1; // Reverse horizontal velocity
        }

        // Check for collision with containers top or bottom edge
        if (posY < 0 || posY + elementHeight > containerHeight || posY > 0.76 * fieldContainer.offsetHeight) {
            vy *= -1; // Reverse vertical velocity
        }

        // Apply the updated position
        duckElement.style.top = `${posY}px`;
        duckElement.style.left = `${posX}px`;
        counter++;

        requestAnimationFrame(animateElement);
    }

    function listenerHitAndFall() {
        // duckElement "click" EventListener
        duckElement.addEventListener('click', function () {
            ducksKilledWave++;
            totalDucksKilled++;
            checkAndRemoveDuck();

            duckElement.style.backgroundImage = 'url("sprites/duck/hit.png")';
            vx = 0;
            vy = 0;

            setTimeout(function () {
                const fall = new Audio("audio/duck-falling.mp3");
                fall.play();
                duckElement.style.backgroundImage = 'url("sprites/duck/falling.gif")';
                vy = -4;

            }, 500);
        });

        // Fail to hit duckelement "click" EventListener
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
        let rect = duckElement.getBoundingClientRect();
        if (rect.bottom > fieldContainer.offsetHeight * 0.75) {
            duckElement.remove();

            if (ducksKilledWave === 1) {
                showDuck(1);
            } else {
                showDuck(2);
            }
        } else {
            requestAnimationFrame(checkAndRemoveDuck);
        }
    }

    // initialize the click duck hit listener
    listenerHitAndFall();

    // call the animation function initially
    animateElement();
}

function deleteAllDucks() {
    const duckElements = document.getElementsByClassName('duck');
    while (duckElements.length > 0) {
        duckElements[0].remove();
        missedDucks++;
    }
    escapedDucksDisplay();
}

function escapedDucksDisplay() {
    let ducks = Array.from(document.querySelector(".duckies").children);
    switch(missedDucks) {
        case 1: ducks[0].style.color = "red";
        break;
        case 2: ducks[1].style.color = "red"; ducks[0].style.color = "red";
        break;
        case 0: ducks.forEach(duck => {duck.style.color ="white";});
        break;
        default: ducks.forEach(duck => {duck.style.color ="red";});
        break;
    }
}



