class Dog {

    constructor(id) {
        this.dogId = `${id}`;
        this.fieldContainer = document.getElementById('field-container');
        this.dogElement = document.createElement('div');
        this.dogContainer = document.getElementById('dog-container');
    }

    launchWalkoutAnimation() {
        this.dogElement.setAttribute("id", this.dogId);
        this.fieldContainer.appendChild(this.dogElement);

        this.dogElement.addEventListener('animationend', () => {
            this.dogElement.classList.add('found');
        });

        this.dogElement.addEventListener('animationend', () => {
            setTimeout(() => {
                this.dogElement.classList.add('jump');
            }, 1000);
        });

        this.dogElement.addEventListener('animationend', () => {
            setTimeout(() => {
                this.dogElement.remove();
            }, 1800);
        });
    }

    showDogWithKilledDucks(killedDucks) {
        this.dogElement.setAttribute("id", this.dogId);
        this.dogContainer.appendChild(this.dogElement);

        if (killedDucks === 1) {
            this.dogElement.classList.add('gotOne');

        } else {
            this.dogElement.classList.add('gotTwo');
        }
    }

    showDogLaugh() {
        this.dogElement.setAttribute("id", this.dogId);
        this.dogContainer.appendChild(this.dogElement);
        this.dogElement.classList.add('laugh');
    }
}   