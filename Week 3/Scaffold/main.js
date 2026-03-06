import * as THREE from "/build/three.module.js"
import {setScene, setSceneElements, scene, camera, renderer, cube, CLOCK} from "./setup.js";
import {OrbitControls} from "./build/controls/OrbitControls.js";

setScene();
setSceneElements();

renderer.render(scene,camera);

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