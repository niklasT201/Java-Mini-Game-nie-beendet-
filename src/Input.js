export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const UP = "UP"
export const DOWN = "DOWN"

export class Input{
    constructor() {

        this.helpDirections = []

        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowUP" || e.code === "KeyW") {
                this.onArrowPressed(UP);
            }

            if (e.code === "ArrowDOWN" || e.code === "KeyS") {
                this.onArrowPressed(DOWN);
            }

            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowPressed(LEFT);
            }

            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowPressed(RIGHT);
            }
        })

        document.addEventListener("keyup", (e) => {
            if (e.code === "ArrowUP" || e.code === "KeyW") {
                this.onArrowReleased(UP);
            }

            if (e.code === "ArrowDOWN" || e.code === "KeyS") {
                this.onArrowReleased(DOWN);
            }

            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowReleased(LEFT);
            }

            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowReleased(RIGHT);
            }
        })
     }

     get direction() {
        return this.helpDirections[0];
     }

     onArrowPressed(direction) {

        if (this.helpDirections.indexOf(direction) === -1) {
            this.helpDirections.unshift(direction);
        }
     }

     onArrowReleased(direction) {
        const index = this.helpDirections.indexOf(direction);
        if (index === -1) {
            return;
        }

        this.helpDirections.splice(index, 1);
     }

    }