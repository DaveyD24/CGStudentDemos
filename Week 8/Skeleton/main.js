import * as THREE from "/build/three.module.js";
import {scene, renderer, camera, setScene, setSceneLighting, gui} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";

setScene();
setSceneLighting();

const controls = new OrbitControls(camera, renderer.domElement);

function UpdateScene() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(UpdateScene);
