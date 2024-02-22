export class GameLoop {
    constructor(update, render){

        this.lastFrameTime = 0;
        this.accumulatedFrame = 0;
        this.timeStep = 1000/60;  //60 FPS

        this.update = update;
        this.render = render;

        this.rafId = null; //request Animation Frame
        this.isRunning = false;
    }

    mainLoop = (timestamp) => {
        if (!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;


        //accumulate the time since the last frame
        this.accumulatedFrame += deltaTime;


        while (this.accumulatedFrame >= this.timeStep) {
            this.update(this.timeStep);
            this.accumulatedFrame -= this.timeStep;
        }

        //Render
        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop);
    }


    start() {
        if (!this.isRunning)  {
        this.isRunning = true;
        this.rafId = requestAnimationFrame(this.mainLoop);
    }
}

    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }


}