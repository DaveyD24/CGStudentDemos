import * as THREE from "./build/three.module.js"
import {scene, camera, renderer, SetScene, setSceneElements, SetSceneLighting, repositionGUI} from "./setup.js";
import {OrbitControls} from "./build/controls/OrbitControls.js";
import { GUI } from "./build/gui/lil-gui.module.min.js";

SetScene();
setSceneElements();
SetSceneLighting();
const controls = new OrbitControls(camera, renderer.domElement);
const CLOCK = new THREE.Clock();

function updateScene() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(updateScene);