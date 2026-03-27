import * as THREE from "/build/three.module.js";
import {scene, camera, renderer, setScene, setSceneElements, setSceneLighting, discs, CLOCK} from "/setup.js";
import {PLYLoader} from "./build/loaders/PLYLoader.js";
import {OBJLoader} from "./build/loaders/OBJLoader.js";
import {OrbitControls} from "./build/controls/OrbitControls.js";

setScene();
setSceneElements();
setSceneLighting();
let controls = new OrbitControls(camera, renderer.domElement);

function scaleToHeight(mesh, targetHeight) {
    const box = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    box.getSize(size);

    const currentHeight = size.y
    const scale = targetHeight / currentHeight;

    mesh.scale.multiplyScalar(scale);
}

function addSpotlight(mesh) {
    const spotlight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.2);
    spotlight.angle = Math.PI/8;
    spotlight.penumbra = 0.3;
    spotlight.castShadow = true;

    spotlight.position.set(mesh.position.x,15,0)
    spotlight.target = mesh;

    scene.add(spotlight);
}

function updateScene() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(updateScene);