import * as THREE from "./build/three.module.js"
import {scene, camera, renderer, setScene, setSceneElements, animateStrip} from "./setup.js"
import {OrbitControls} from "./build/controls/OrbitControls.js";

setScene();
setSceneElements(); //Now includes generateStrip()


const controls = new OrbitControls( camera, renderer.domElement );

function updateScene() {
    controls.update();
    animateStrip();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(updateScene);

//Event Listeners
function resizeRenderView() {
    const width = document.querySelector(".render-view").clientWidth;
    const height = document.querySelector(".render-view").clientHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener('resize', resizeRenderView);