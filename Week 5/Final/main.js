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
    gui.addColor(cameraLight, 'color')
        .name('Camera Light');
    gui.add(cameraLight, 'intensity', 0, 1)
        .name('Camera Light Intensity');
    gui.add(spotlight, 'angle', 0, Math.PI / 2)
        .name('Angle');
    gui.add(spotlight, 'penumbra', 0, 1)
        .name('Penumbra');
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
