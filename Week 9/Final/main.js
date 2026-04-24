
import * as THREE from "/build/three.module.js";
import {setScene, setSceneElements, scene, camera, minimapCamera, renderer, minimapRenderer, Pos, Dir, player, PLANE_SIZE, plane} from "./setup.js";

setScene();
setSceneElements();

const CLOCK = new THREE.Clock();
const SPEED = 2;
let angle = Math.PI;
let movingForward, movingLeft, movingBackward, movingRight = false;

function movementLoop() {
    const delta = CLOCK.getDelta();
    if (movingForward) {
        Pos.x += Dir.x * delta * SPEED;
        Pos.z += Dir.z * delta * SPEED;
    }
    if (movingBackward) {
        Pos.x -= Dir.x * delta * SPEED;
        Pos.z -= Dir.z * delta * SPEED;
    }
    if (movingLeft) {
        angle+=(SPEED/2)*delta;
        Dir.x=Math.sin(angle);
        Dir.z=Math.cos(angle);
        Dir.normalize();
    }
    if (movingRight) {
        angle-=(SPEED/2)*delta;
        Dir.x=Math.sin(angle);
        Dir.z=Math.cos(angle);
        Dir.normalize();
    }

    const padding = 0.5;
    const boundary = (PLANE_SIZE/2) - padding;
    Pos.x = Math.max(-boundary, Math.min(boundary, Pos.x));
    Pos.z = Math.max(-boundary, Math.min(boundary, Pos.z));

    if (Math.abs(Pos.x) === Math.abs(boundary) || Math.abs(Pos.z) === Math.abs(boundary)) {
        plane.material.color = new THREE.Color(1,0,0);
    }
    else {
        plane.material.color = new THREE.Color(0,1,0)
    }

    camera.position.set(Pos.x, Pos.y, Pos.z);
    camera.lookAt(Pos.x+Dir.x, Pos.y+Dir.y, Pos.z+Dir.z);
    camera.updateProjectionMatrix();

    renderer.render(scene,camera);
    minimapRenderer.render(scene, minimapCamera)
}
renderer.setAnimationLoop(movementLoop);

function onKeyDown(event) {
    switch (event.key) {
        case "ArrowUp": case "w": movingForward = true; break;
        case "ArrowLeft": case "a": movingLeft = true; break;
        case "ArrowDown": case "s": movingBackward = true; break;
        case "ArrowRight": case "d": movingRight = true; break;
    }
}
function onKeyUp(event) {
    switch (event.key) {
        case "ArrowUp": case "w": movingForward = false; break;
        case "ArrowLeft": case "a": movingLeft = false; break;
        case "ArrowDown": case "s": movingBackward = false; break;
        case "ArrowRight": case "d": movingRight = false; break;
    }
}

//Event Listeners
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);