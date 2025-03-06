import * as THREE from "/build/three.module.js"
import {setScene, setSceneElements, scene, camera, renderer, cube} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";

setScene();
setSceneElements();
scene.add(cube);

let controls = new OrbitControls(camera, renderer.domElement);


function UpdateScene() {
    controls.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(UpdateScene);

//Event Listeners
function resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener('resize', resize);