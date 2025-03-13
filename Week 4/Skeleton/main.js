import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, cube, setScene, setSceneElements, GenerateStrip, animateStrip} from "./setup.js"
import {OrbitControls} from "./build/controls/OrbitControls.js";

setScene();
setSceneElements(); //Now includes GenerateStrip()

let controls = new OrbitControls( camera, renderer.domElement );
renderer.setAnimationLoop(UpdateScene);

function UpdateScene() {
    controls.update();
    animateStrip();
    renderer.render(scene, camera);
}

//Event Listeners
function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener('resize', resize);