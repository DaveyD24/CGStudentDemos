import * as THREE from "/build/three.module.js"

export var scene;
export var camera;
export var renderer;

export var cube;

let cubes = [];
let n = 36;

const clock = new THREE.Clock();
const speed = 0.75;

export function setScene() {
    scene = new THREE.Scene( );

    const ratio = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(30,ratio,0.1,1000);
    camera.position.set(0,7.5,30);
    camera.lookAt(0,0,1);

    renderer = new THREE.WebGLRenderer( );
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement );
}

export function setSceneElements() {
    let cube_geometry = new THREE.BoxGeometry(1,1,1);
    let cube_material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0,1,0),
        wireframe: false,
    });
    cube = new THREE.Mesh(cube_geometry, cube_material);
    GenerateStrip();
}

function GenerateStrip() {
    for (let i = 0; i < n; i++) {
        const combined = new THREE.Matrix4();
        combined.multiply(new THREE.Matrix4().makeRotationY(i*(2*Math.PI/n)));
        combined.multiply(new THREE.Matrix4().makeTranslation(10,0,0));
        combined.multiply(new THREE.Matrix4().makeRotationZ(i*(Math.PI/n)));
        combined.multiply(new THREE.Matrix4().makeScale(0.5,3,1.5));

        cubes[i] = cube.clone();
        cubes[i].applyMatrix4(combined);

        scene.add(cubes[i]);
    }
}

export function animateStrip() {
    const delta = clock.getDelta();
    for (let i = 0; i < n; i++) {
        cubes[i].applyMatrix4(new THREE.Matrix4().makeRotationY(delta*speed));
    }
}