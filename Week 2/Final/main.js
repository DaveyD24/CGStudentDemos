import * as THREE from './build/three.module.js';
import {setScene, setSceneElements, scene, camera, renderer} from "./setup.js";

setScene();
setSceneElements();

let movingForward = false;
let movingBackward = false;
let movingLeft = false;
let movingRight = false;

let Pos = new THREE.Vector3(0,0,-5);
let Dir = new THREE.Vector3(0,0,1);

const CLOCK = new THREE.Clock();
const SPEED = 5;
let angle = 0;

function movementLoop() {
    //Do stuff (each frame)
    const delta = CLOCK.getDelta();
    if (movingForward) {
        Pos.x += Dir.x * SPEED * delta;
        Pos.z += Dir.z * SPEED * delta;
    }
    if (movingBackward) {
        Pos.x -= Dir.x * SPEED * delta;
        Pos.z -= Dir.z * SPEED * delta;
    }
    if (movingLeft) {
        angle += delta * (SPEED/2);
        Dir.x = Math.sin(angle);
        Dir.z = Math.cos(angle);
    }
    if (movingRight) {
        angle -= delta * (SPEED/2);
        Dir.x = Math.sin(angle);
        Dir.z = Math.cos(angle);
    }

    camera.position.set(Pos.x, Pos.y, Pos.z);
    camera.lookAt(Pos.x+Dir.x, Pos.y+Dir.y, Pos.z+Dir.z);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(movementLoop);

function resizeRenderView() {
    const width = document.querySelector(".render-view").clientWidth;
    const height = document.querySelector(".render-view").clientHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}

function onKeyDown(event) {
    switch (event.key) {
        case "ArrowUp" : case "w" : movingForward = true; break;
        case "ArrowDown" : case "s" : movingBackward = true; break;
        case "ArrowLeft" : case "a" : movingLeft = true; break;
        case "ArrowRight" : case "d" : movingRight = true; break;
    }
}

function onKeyUp(event) {
    switch (event.key) {
        case "ArrowUp" : case "w" : movingForward = false; break;
        case "ArrowDown" : case "s" : movingBackward = false; break;
        case "ArrowLeft" : case "a" : movingLeft = false; break;
        case "ArrowRight" : case "d" : movingRight = false; break;
    }
}

//Event Listeners
window.addEventListener( 'resize', resizeRenderView);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);