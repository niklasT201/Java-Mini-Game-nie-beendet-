import './style.css'
import {resources} from "./src/Resource.js";
import {Sprite} from "./src/Sprite.js";
import { Vector2 } from './src/Vector2.js';
import { GameLoop } from './src/GameLoop.js';
import { Input } from './src/Input.js';
import { LEFT, RIGHT, UP, DOWN } from './src/Input.js';
import { gridCells, isSpaceFree } from './src/helpers/grid.js';
import { moveTowards } from './src/helpers/moveTowards.js';
import {walls} from './src/levels/levels1.js';
import { Animations } from './src/Animations.js';
import {FrameIndexPattern} from './src/FrameIndexPattern.js';
import { WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGHT, STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT } from './src/objects/hero/heroAnimation.js';
import { GameObject } from './src/GameObjects.js';
import { events } from './src/Event.js';
import { Camera } from './src/Camera.js';
import { Inventory } from './src/objects/inventory/Inventory.js';


const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
    position: new Vector2(0, 0)
})

const SpriteSky = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
});


const SpriteGround = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
});

mainScene.addChild(SpriteGround);


const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod);

const inventory = new Inventory();



mainScene.input = new Input();

events.on("HERO_POSITION", mainScene, heroPosition => {
    console.log("HERO MOVED!", heroPosition)
})

const update = (delta) =>{
    mainScene.stepEntry(delta, mainScene)
};



const draw = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    SpriteSky.drawImage(ctx, 0, 0);

    ctx.save();

    ctx.translate(camera.position.x, camera.position.y);

    mainScene.draw(ctx, 0, 0)

    ctx.restore();

    inventory.draw(ctx, 0, 0)
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();

