import * as THREE from "/build/three.module.js";
import {scene, camera, renderer, setScene, setSceneElements, setSceneLighting} from "/setup.js";
import {PLYLoader} from "./build/loaders/PLYLoader.js";
import {mouse, holding, getNextColour} from "/helpers.js";

setScene();
setSceneElements();
setSceneLighting();
loadMesh();
let mesh = null;

function loadMesh() {
    const loader = new PLYLoader();
    loader.load("models/bunny.ply", function(geometry) {
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1,1,1),
            shininess: 0
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.applyMatrix4(new THREE.Matrix4().makeScale(25,25,25));
        mesh.name = "bunny";
        scene.add(mesh);
    })
}

renderer.setAnimationLoop(UpdateScene);

function UpdateScene() {
    updateBunny();
    renderer.render(scene, camera);
}

function doesIntersect(intersects, name) {
    for (const obj of intersects) {
        if (obj.object.name === name) {
            return true;
        }
    }
    return false;
}

function updateBunny() {
    if (mesh == null) { return; }

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, false);

    if (holding) {
        if (intersects.length > 0 && doesIntersect(intersects, "bunny")) {
            mesh.position.x = intersects[0].point.x;
            mesh.position.y = intersects[0].point.y;
        }
    }
    else {
        if (!doesIntersect(intersects, "floor") && doesIntersect(intersects, "bunny")) {
            mesh.position.x = 0;
            mesh.position.y = 0;
        }
    }
    mesh.material.color = holding ? getNextColour() : new THREE.Color(1,1,1);
}
