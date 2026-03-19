import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, setScene, setSceneElements, animateStrip, wallMesh} from "./setup.js"
import {OrbitControls} from "./build/controls/OrbitControls.js";
import {GUI} from "./build/gui/lil-gui.module.min.js";

setScene();
setSceneElements();

addSphere();
addLighting();

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
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(mesh);
}

function addLighting() {
    const cameraLight = new THREE.PointLight(new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1), 0.2);

    scene.add(ambientLight)
}
function updateScene() {
    controls.update();
    animateStrip();
    renderer.render(scene, camera);
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