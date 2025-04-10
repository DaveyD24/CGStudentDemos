import * as THREE from "/build/three.module.js";
import {scene, renderer, camera, setScene, setSceneLighting, gui} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";

let earth = null;
setScene();
setSceneLighting();
CreateTextures();
SetupGUI();

const controls = new OrbitControls(camera, renderer.domElement);

function CreateTextures() {
    const plane_mesh = new THREE.PlaneGeometry(192, 108);
    const sphere_geometry = new THREE.SphereGeometry(50);
    const earth_material = new THREE.MeshPhongMaterial({
        wireframe: false,
        map: new THREE.TextureLoader().load("image/worldmap.jpg"),
        normalMap : new THREE.TextureLoader().load("image/normalmap.png"),
        side: THREE.DoubleSide
    });
    earth = new THREE.Mesh(sphere_geometry, earth_material);
    scene.add(earth);
}

function SetupGUI() {
    const controls = {
        NORMAL_SCALE : 1
    };
    gui.add(controls, 'NORMAL_SCALE', 0, 1).name("Scale").onChange(value => {earth.material.normalScale.set(value, value);});
}

function UpdateScene() {
    controls.update();
    earth.applyMatrix4(new THREE.Matrix4().makeRotationY(0.003));
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(UpdateScene);