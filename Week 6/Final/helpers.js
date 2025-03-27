import * as THREE from "/build/three.module.js";
import {renderer} from "./setup.js";

export const mouse = new THREE.Vector2();
export let holding = false;

let counter = 0;
export function getNextColour() {
    if (counter >= 360) { counter = 0; }
    counter++;
    return new THREE.Color(`hsl(${counter}, 100%, 50%)`);
}

function onMouseDown(event) {
    holding = true;
}
function onMouseMove(event) {
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
}
function onMouseUp(event) {
    holding = false;
}

//Event Listeners
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mousemove', onMouseMove);