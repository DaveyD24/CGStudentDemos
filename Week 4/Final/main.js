import * as THREE from "./build/three.module.js"
import {scene, camera, renderer, setScene, setSceneElements, animateStrip} from "./setup.js"
import {OrbitControls} from "./build/controls/OrbitControls.js";

setScene();
setSceneElements(); //Now includes generateStrip()

addSphere();
addLighting();

const controls = new OrbitControls( camera, renderer.domElement );

function updateScene() {
    controls.update();
    animateStrip();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(updateScene);

function addSphere() {
    const sphereGeometry = new THREE.SphereGeometry();
    const sphereMaterial = new THREE.MeshPhongMaterial(
        {
            color: new THREE.Color(0.8,1,1),
            shininess: 100,
            wireframe: false
        }
    );
    scene.add(new THREE.Mesh(sphereGeometry, sphereMaterial));
}
function addLighting() {
    const cameraLight = new THREE.PointLight(new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1), 0.2);
    scene.add(ambientLight);
}

//Event Listeners
function resizeRenderView() {
    const width = document.querySelector(".render-view").clientWidth;
    const height = document.querySelector(".render-view").clientHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener('resize', resizeRenderView);