import { GameObject } from "../../GameObjects";
import { resources } from "../../Resource";
import { Vector2 } from "../../Vector2";
import { Sprite } from "../../Sprite";
import { events } from "../../Event";

export class Rod extends GameObject {
    constructor(x, y) {
            super({
                position: new Vector2(x, y)
            });
            const sprite = new Sprite({
                resource: resources.images.rod,
                position: new Vector2(0, -5)
            })
            this.addChild(sprite);
        }
        
        ready() {
            console.log("ROD IS READY!")
            events.on("HERO_POSITION", this, pos => {
                console.log("HERO POSITION")
                const roundedHeroX = Math.round(pos.x);
                const roundedHeroY = Math.round(pos.y);
                if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
                    this.onCollideWithHero();
                }
            })
        }
        
        
        onCollideWithHero() {
        this.destroy();

        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.rod,
            position: this.position
        })
    }
 }