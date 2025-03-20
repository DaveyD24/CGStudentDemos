import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, setScene, setSceneElements, animateStrip} from "./setup.js"
import {OrbitControls} from "./build/controls/OrbitControls.js";
import {GUI} from "./build/gui/lil-gui.module.min.js";

let sphere_mesh;
let cameraLight;
let ambientLight;


setScene();
setSceneElements(); //Now includes GenerateStrip()
let controls = new OrbitControls( camera, renderer.domElement );

addSphere();
addLighting();

renderer.setAnimationLoop(UpdateScene);

function addSphere() {
    const sphere_geometry = new THREE.SphereGeometry();
    const sphere_material = new THREE.MeshPhongMaterial(
        {
            color: new THREE.Color(0.8,1,1),
            shininess: 100,
            wireframe: false
        }
    );
    sphere_mesh = new THREE.Mesh(sphere_geometry, sphere_material);
    sphere_mesh.castShadow = true;
    scene.add(sphere_mesh);
}

function addLighting() {
    cameraLight = new THREE.PointLight(new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1), 0.2);
    scene.add(ambientLight);
}
function UpdateScene() {
    controls.update();
    animateStrip();
    renderer.render(scene, camera);
}