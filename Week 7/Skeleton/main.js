import * as THREE from "/build/three.module.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";
import {scene, camera, renderer, gui, setScene, setSceneLighting} from "./setup.js";
import {GetGridPosition, SpawnBox} from "./Helpers.js";

setScene();
setSceneLighting();

const controls = new OrbitControls(camera, renderer.domElement);

function UpdateScene() {
    controls.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(UpdateScene);
