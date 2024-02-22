import { events } from "./Event";
import { GameObject } from "./GameObjects";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
    constructor() {
        super({});

        events.on("HERO_POSITION", this, heroPosition => {

            const personhalf = 8;
            const canvasWidth = 320;
            const canvasHeight = 180;
            const halfWidth = -personhalf + canvasWidth / 2;
            const halfHeight = - personhalf + canvasHeight / 2;
            this.position = new Vector2(
                -heroPosition.x + halfWidth,
                -heroPosition.y + halfHeight,
            )
        })
    }
}