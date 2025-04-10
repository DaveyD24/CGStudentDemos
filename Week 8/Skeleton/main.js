import * as THREE from "/build/three.module.js";
import {scene, renderer, camera, setScene, setSceneLighting, gui} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";

setScene();
setSceneLighting();

const controls = new OrbitControls(camera, renderer.domElement);

function UpdateScene() {
    controls.update();
    earth.applyMatrix4(new THREE.Matrix4().makeRotationY(0.003));
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(UpdateScene);