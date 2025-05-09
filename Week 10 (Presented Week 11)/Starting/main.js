import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, SetScene, SetSceneLighting, SetSceneElements} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";

SetScene();
SetSceneLighting();
SetSceneElements();
const controls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();

function UpdateScene() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(UpdateScene);

