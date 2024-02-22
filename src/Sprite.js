import { GameObject } from "./GameObjects";
import { Vector2 } from "./Vector2";

export class Sprite extends GameObject{
    constructor({
        resource, //Bild das gezeigt wird
        frameSize, //Size of the crop of the image
        hFrames, // Sprite horizenral
        vFrames,  // Sprite vertikal
        frame,  //welcher Frame wird gezeigt
        scale,  //wie groß es ist
        position, // wo soll es stehen
        animations,
    }){
        super({});
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16,16)
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0, 0);
        this.animations = animations ?? null;
        this.buildFrameMap();
    }

    buildFrameMap(){
        let frameCount = 0;
        for (let v=0; v<this.vFrames; v++){
            for (let h=0; h<this.hFrames; h++){
                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h, this.frameSize.y * v)
                )
                frameCount++;
            }
        }
    }

    step(delta) {
        if (!this.animations) {
            return;
        }
        this.animations.step(delta);
        this.frame = this.animations.frame;
    }

    drawImage(ctx, x, y){
        if (!this.resource.isLoaded){
            return;
        }

        //richtigen Sprite finden
        let frameCoordX = 0;
        let frameCoordY = 0;
        const frame = this.frameMap.get(this.frame);
        if (frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;


        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY, //Top Y Corner of frame
            frameSizeX, //wie viel vom Sprite Sheet soll verwendet werden (x)
            frameSizeY, //wie viel vom Sprite Sheet soll verwendet werden (y)
            x,
            y,
            frameSizeX *this.scale,
            frameSizeY * this.scale,
        )
    }
}