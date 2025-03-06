import * as THREE from "/build/three.module.js"
import {setScene, setSceneElements, scene, camera, renderer, cube} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";

setScene();
setSceneElements();

let controls = new OrbitControls(camera, renderer.domElement);
let cubes = [];
let n = 36;

function GenerateStrip() {
    for (let i = 0; i < n; i++) {
        
        let combined = new THREE.Matrix4();

        combined.multiply(new THREE.Matrix4().makeRotationY(i*(2*Math.PI/n)));  //Imagine you are standing, twist so you're facing 360deg/n amount
        combined.multiply(new THREE.Matrix4().makeTranslation(10,0,0));         //Move your body 10 units forward in you're new direction
        combined.multiply(new THREE.Matrix4().makeRotationZ(i*(Math.PI/n)));    //Lean forward 180deg/n amount
        combined.multiply(new THREE.Matrix4().makeScale(0.2,3,1.5));            //Scale yourself, breaking all bones in your body (difficult to demonstrate in class)

        cubes[i] = cube.clone();
        cubes[i].applyMatrix4(combined);

        scene.add(cubes[i]);
    }
}

function UpdateScene() {
    controls.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(UpdateScene);
GenerateStrip();

//Event Listeners
function resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener('resize', resize);