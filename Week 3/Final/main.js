import * as THREE from "/build/three.module.js"
import {setScene, setSceneElements, scene, camera, renderer, cube, CLOCK} from "./setup.js";
import {OrbitControls} from "./build/controls/OrbitControls.js";

setScene();
setSceneElements();

const controls = new OrbitControls(camera, renderer.domElement);
const cubes = []
const CUBE_COUNT = 36;
const SPEED = 1;

/*
*   Read from bottom up
*   -> Scale the cube
*   -> Flip the cube on itself by some amount
*   -> Translate 10 units on the x-axis (The origin is still 0,0,0!)
*   -> Rotate on the Y axis (around the origin) some amount
* */
function generateStrip() {
    for (let i = 0; i < CUBE_COUNT; i++) {
        cubes[i] = cube.clone();

        let combinedMatrix = new THREE.Matrix4();

        let rotationYMatrix = new THREE.Matrix4();
        rotationYMatrix.makeRotationY(i*(2*Math.PI/CUBE_COUNT));

        let translationMatrix = new THREE.Matrix4();
        translationMatrix.makeTranslation(10,0,0);

        let rotationZMatrix = new THREE.Matrix4();
        rotationZMatrix.makeRotationZ(i*Math.PI/CUBE_COUNT);

        let scaleMatrix = new THREE.Matrix4();
        scaleMatrix.makeScale(0.2, 3, 1.5);

        combinedMatrix.multiply(rotationYMatrix).multiply(translationMatrix).multiply(rotationZMatrix).multiply(scaleMatrix);

        cubes[i].applyMatrix4(combinedMatrix);
        scene.add(cubes[i]);
    }
}

/*
*  Our origin is still (0,0,0)
*  So rotating on the Y axis just spins around the center of the world
* */
function animateStrip() {
    const delta = CLOCK.getDelta();
    for (let i = 0; i < CUBE_COUNT; i++) {
        cubes[i].applyMatrix4(new THREE.Matrix4().makeRotationY(SPEED * delta));
    }
}

function updateLoop() {
    controls.update();
    animateStrip();
    renderer.render(scene, camera);
}
generateStrip();
renderer.setAnimationLoop(updateLoop);

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