
import * as THREE from "/build/three.module.js";
import {setScene, setSceneElements, scene, camera, renderer, Pos, Dir} from "./setup.js";

setScene();
setSceneElements();

const clock = new THREE.Clock();
const speed = 2;
let angle = Math.PI;

let movingForward = false;
let movingLeft = false;
let movingBackward = false;
let movingRight = false;

function MovementLoop() {
    const delta = clock.getDelta();
    if (movingForward) {
        Pos.x += Dir.x * delta * speed;
        Pos.z += Dir.z * delta * speed;
    }
    if (movingBackward) {
        Pos.x -= Dir.x * delta * speed;
        Pos.z -= Dir.z * delta * speed;
    }
    if (movingLeft) {
        angle+=(speed/2)*delta;
        Dir.x=Math.sin(angle);
        Dir.z=Math.cos(angle);
        Dir.normalize();
    }
    if (movingRight) {
        angle-=(speed/2)*delta;
        Dir.x=Math.sin(angle);
        Dir.z=Math.cos(angle);
        Dir.normalize();
    }

    camera.position.set(Pos.x, Pos.y, Pos.z);
    camera.lookAt(Pos.x+Dir.x, Pos.y+Dir.y, Pos.z+Dir.z);
    camera.updateProjectionMatrix();

    renderer.render(scene,camera);
}

renderer.setAnimationLoop(MovementLoop);

//this function is called when the window is resized
function resize() {
    //get the new sizes
    var width = window.innerWidth;
    var height = window.innerHeight;
    //then update the renderer
    renderer.setSize(width,height);
    //and update the aspect ratio of the camera
    camera.aspect = width/height;

    //update the projection matrix given the new values
    camera.updateProjectionMatrix();

    //and finally render the scene again
    renderer.render(scene,camera);
};
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
window.addEventListener( 'resize', resize);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
