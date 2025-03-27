import * as THREE from "/build/three.module.js";
import {scene, camera, renderer, setScene, setSceneElements, setSceneLighting} from "/setup.js";
import {PLYLoader} from "./build/loaders/PLYLoader.js";
import {mouse, holding, getNextColour} from "/helpers.js";

setScene();
setSceneElements();
setSceneLighting();

renderer.setAnimationLoop(UpdateScene);

function UpdateScene() {
    renderer.render(scene, camera);
}