import * as THREE from "/build/three.module.js";
import {GUI} from "/build/gui/lil-gui.module.min.js";

export var scene;
export var camera;
export var renderer;
export var gui;

export function setScene() {
    scene = new THREE.Scene( );

    const ratio = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(60,ratio,0.1,1000);
    camera.position.set(0,2,150);
    camera.lookAt(0,0,2);

    renderer = new THREE.WebGLRenderer( );
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement );

    //Doing some shenanigans to manually shift the position of the GUI on the screen
    gui = new GUI({autoPlace: false});
    gui.domElement.id = "gui";
    document.body.appendChild(gui.domElement);
}

export function setSceneLighting() {
    const cameraLight = new THREE.PointLight( new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1),0.2);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.2);
    spotlight.castShadow = true;
    spotlight.receiveShadow = true;
    spotlight.penumbra = 0.1;
    spotlight.position.set(0, 2, 0);
    spotlight.lookAt(0,0,0);
    scene.add(spotlight);
}

//Event Listeners
function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener('resize', resize);