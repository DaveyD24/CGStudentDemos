import * as THREE from "/build/three.module.js";
import {scene, renderer, camera, setScene, setSceneElements, setSceneLighting} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";
import {OBJLoader} from "/build/loaders/OBJLoader.js";

const clock = new THREE.Clock();

setScene();
setSceneElements()
setSceneLighting();

const controls = new OrbitControls(camera, renderer.domElement);


async function loadOBJ(modelName) {
    const loader = new OBJLoader();
    let mesh;
    const group = await loader.loadAsync(`models/${modelName}`);
    group.traverse((child) => {
        if (child.isMesh) {
            mesh = child;
            return;
        }
    })
    return mesh;
}

function scaleToHeight(mesh, targetHeight) {
    const box = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    box.getSize(size);

    const currentHeight = size.y
    const scale = targetHeight / currentHeight;

    mesh.scale.multiplyScalar(scale);
}

function updateScene() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(updateScene);
