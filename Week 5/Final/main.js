import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, setScene, setSceneElements, animateStrip, wallMesh} from "./setup.js"
import {OrbitControls} from "./build/controls/OrbitControls.js";
import {GUI} from "./build/gui/lil-gui.module.min.js";

let sphereMesh;
let spotlightHelper;
let cameraLight;
let ambientLight;
let spotlight;

setScene();
setSceneElements();

addSphere();
addLighting();
setupGUI();

const controls = new OrbitControls( camera, renderer.domElement );
renderer.setAnimationLoop(updateScene);

function addSphere() {
    const sphereGeometry = new THREE.SphereGeometry(2);
    const sphereMaterial = new THREE.MeshPhongMaterial(
        {
            color: new THREE.Color(0.8,1,1),
            shininess: 100,
            wireframe: false
        }
    );
    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.castShadow = true;
    scene.add(sphereMesh);
}

function addLighting() {
    cameraLight = new THREE.PointLight(new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1), 0.2);

    spotlight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.2);
    spotlight.angle = Math.PI/8;
    spotlight.penumbra = 0.3;
    spotlight.castShadow = true;

    spotlight.position.y = 30;
    spotlight.target = sphereMesh;
    spotlightHelper = new THREE.SpotLightHelper(spotlight);

    const wallLight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.5);
    wallLight.angle = Math.PI/8;
    wallLight.penumbra = 0.3;
    wallLight.castShadow = true;

    wallLight.position.x += 20;
    wallLight.target = wallMesh;

    scene.add(ambientLight, spotlight, spotlightHelper, wallLight)
}
function updateScene() {
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
    gui.addColor(controls, 'CAMERA_LIGHT')
        .name('Camera Light')
        .onChange(value => {cameraLight.color = value;});
    gui.add(controls, 'CAMERA_INTENSITY', 0, 1)
        .name('Camera Light Intensity')
        .onChange(value => {cameraLight.intensity = value;});
    gui.add(controls, 'ANGLE', 0, 1)
        .name('Angle')
        .onChange(value => {spotlight.angle = value;});
    gui.add(controls, 'PENUMBRA', 0, 1)
        .name('Penumbra')
        .onChange(value => {spotlight.penumbra = value;});
    repositionGUI();
}

//Probably not needed for your assignment
//This just shifts the GUI away from the corner a bit
function repositionGUI() {
    const guiDom = document.getElementsByClassName("lil-gui")[0];
    const renderView = document.getElementsByClassName("render-view")[0];
    const rect = renderView.getBoundingClientRect();

    guiDom.style.right = rect.left;
    guiDom.style.top = rect.top;
}

function resizeRenderView() {
    const width = document.querySelector(".render-view").clientWidth;
    const height = document.querySelector(".render-view").clientHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
    repositionGUI();
}
window.addEventListener("resize", resizeRenderView);