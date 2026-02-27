import * as THREE from './build/three.module.js';
import {setScene, setSceneElements, scene, camera, renderer} from "./setup.js";

setScene();
setSceneElements();

renderer.render(scene,camera);

function resizeRenderView() {
    const width = document.querySelector(".render-view").clientWidth;
    const height = document.querySelector(".render-view").clientHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}


//Event Listeners
window.addEventListener( 'resize', resizeRenderView);