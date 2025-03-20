import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, setScene, setSceneElements, animateStrip} from "./setup.js"
import {OrbitControls} from "./build/controls/OrbitControls.js";
import {GUI} from "./build/gui/lil-gui.module.min.js";

let sphere_mesh;
let spotlightHelper;
let cameraLight;
let ambientLight;
let spotlight;


setScene();
setSceneElements(); //Now includes GenerateStrip()
let controls = new OrbitControls( camera, renderer.domElement );

addSphere();
addFloor();
addLighting();
setupGUI();

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
function addFloor() {
    const floor_geometry = new THREE.PlaneGeometry(200,200,200);
    const floor_material = new THREE.MeshLambertMaterial(
        {
            color: new THREE.Color(0.7,0.7,0.7),
            side: THREE.DoubleSide
        }
    );
    const floor = new THREE.Mesh(floor_geometry, floor_material);
    floor.position.y = -10;
    floor.rotation.x = Math.PI/2;
    floor.receiveShadow = true;
    scene.add(floor);
}
function addLighting() {
    cameraLight = new THREE.PointLight(new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1), 0.2);
    scene.add(ambientLight);

    spotlight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.2);
    spotlight.angle = Math.PI/8;
    spotlight.penumbra = 0.3;
    spotlight.castShadow = true;

    spotlight.position.y = 30;
    spotlight.target = sphere_mesh;
    scene.add(spotlight);

    spotlightHelper = new THREE.SpotLightHelper(spotlight);
    scene.add(spotlightHelper);
}
function UpdateScene() {
    spotlightHelper.update();
    controls.update();
    animateStrip();
    renderer.render(scene, camera);
}

function setupGUI() {
    const gui = new GUI();
    const controls = {
        CAMERA_LIGHT: cameraLight.color,
        CAMERA_INTENSITY: cameraLight.intensity,
        ANGLE: spotlight.angle,
        PENUMBRA: spotlight.penumbra
    };
    gui.addColor(controls, 'CAMERA_LIGHT').name('Camera Light').onChange(value => {cameraLight.color = value;});
    gui.add(controls, 'CAMERA_INTENSITY', 0, 1).name('Camera Light Intensity').onChange(value => {cameraLight.intensity = value;});
    gui.add(controls, 'ANGLE', 0, 1).name('Angle').onChange(value => {spotlight.angle = value;});
    gui.add(controls, 'PENUMBRA', 0, 1).name('Penumbra').onChange(value => {spotlight.penumbra = value;});
}