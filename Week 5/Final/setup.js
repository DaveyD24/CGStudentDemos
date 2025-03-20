import * as THREE from "/build/three.module.js"

export var scene;
export var camera;
export var renderer;

export var cube;

let cubes = [];
let n = 36;

export function setScene() {
    scene = new THREE.Scene( );

    const ratio = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
    camera.position.set(0,10,30);
    camera.lookAt(0,0,1);

    renderer = new THREE.WebGLRenderer( );
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement );
}

export function setSceneElements() {
    let cube_geometry = new THREE.BoxGeometry(1,1,1);
    let cube_material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0,1,0),
        wireframe: false
    });
    cube = new THREE.Mesh(cube_geometry, cube_material);
    cube.castShadow = true;
    GenerateStrip();
}

function GenerateStrip() {
    for (let i = 0; i < n; i++) {
        let rotZ = new THREE.Matrix4();
        let sca = new THREE.Matrix4();
        let rotY = new THREE.Matrix4();
        let tra = new THREE.Matrix4();
        let combined = new THREE.Matrix4();

        rotZ.makeRotationZ(i*(Math.PI/n));
        sca.makeScale(0.5,3,1.5);
        rotY.makeRotationY(i*(2*Math.PI/n));
        tra.makeTranslation(10,0,0);

        combined.multiply(rotY);
        combined.multiply(tra);
        combined.multiply(rotZ);
        combined.multiply(sca);

        cubes[i] = cube.clone();
        cubes[i].applyMatrix4(combined);

        scene.add(cubes[i]);
    }
}

const speed = 0.5;
const clock = new THREE.Clock();
export function animateStrip() {
    const delta = clock.getDelta();
    for (let i = 0; i < n; i++) {
        cubes[i].applyMatrix4(new THREE.Matrix4().makeRotationY(delta*speed));
    }
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