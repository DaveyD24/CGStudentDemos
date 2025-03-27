import * as THREE from "/build/three.module.js";
import {scene, camera, renderer, setScene, setSceneElements, setSceneLighting} from "./setup.js";
import {PLYLoader} from "./build/loaders/PLYLoader.js";
import {mouse, holding, getNextColour} from "/helpers.js";

setScene();
setSceneElements();
setSceneLighting();
loadMesh();

renderer.setAnimationLoop(UpdateScene);

let mesh = null;
function loadMesh() {
    const loader = new PLYLoader();
    loader.load('models/bunny.ply', function(geometry)
    {
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0.9,0.9,0.9),
            shininess: 0,
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.applyMatrix4(new THREE.Matrix4().makeScale(25, 25, 25));
        mesh.name = "bunny";

        scene.add(mesh);
    });
}
function UpdateScene() {
    moveBunny();
    renderer.render(scene, camera);
}

function moveBunny() {
    if (mesh == null) { return; } //function may run before mesh is loaded
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera); //draw from camera towards mouse position
    const intersects = raycaster.intersectObjects(scene.children, false);

    if (holding && intersects.length > 0 && intersects[0].object.name === "bunny") {
        mesh.position.x = intersects[0].point.x;
        mesh.position.y = intersects[0].point.y;
    }
    else if (!holding) {
        if (intersects.length < 2) { //Means its ONLY intersecting the bunny
            mesh.position.x = 0;
            mesh.position.y = 0;
        }
    }
    mesh.material.color = holding ? getNextColour() : new THREE.Color(0.9,0.9,0.9);
}