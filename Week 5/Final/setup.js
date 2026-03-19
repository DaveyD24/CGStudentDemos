import * as THREE from "/build/three.module.js"

export let scene;
export let camera;
export let renderer;

export let wallMesh;

const cubes = [];
const CUBE_COUNT = 36;
const SPEED = 1;
const CLOCK = new THREE.Clock();

export function setScene() {
    scene = new THREE.Scene();
    const renderView = document.querySelector(".render-view");
    const aspectRatio = renderView.clientWidth / renderView.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);

    camera.position.set(0, 0, 15);
    camera.lookAt(0,0,1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(renderView.clientWidth, renderView.clientHeight);
    renderer.domElement.style.borderRadius = "15px";
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene.background = new THREE.Color("#e3e3ff");
    document.querySelector(".render-view").appendChild(renderer.domElement);
}

export function setSceneElements() {
    const wallGeometry = new THREE.BoxGeometry(20,20,100);
    const wallMaterial = new THREE.MeshLambertMaterial({
        color: new THREE.Color(1,1,1),
    });
    wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    wallMesh.receiveShadow = true;
    wallMesh.position.x -= 40;
    scene.add(wallMesh);

    const floorGeometry = new THREE.PlaneGeometry(100,100);
    const floorMaterial = new THREE.MeshLambertMaterial(
        {
            color: new THREE.Color(0.7,0.7,0.7),
            side: THREE.DoubleSide
        }
    );
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.position.y = -10;
    floor.rotation.x = Math.PI/2;
    scene.add(floor);

    generateStrip();
}

function generateStrip() {
    let cubeGeometry = new THREE.BoxGeometry(1,1,1);
    let cubeMaterial = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0,1,0),
        wireframe: false,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    for (let i = 0; i < CUBE_COUNT; i++) {
        const combined = new THREE.Matrix4();
        combined.multiply(new THREE.Matrix4().makeRotationY(i*(2*Math.PI/CUBE_COUNT)));
        combined.multiply(new THREE.Matrix4().makeTranslation(10,0,0));
        combined.multiply(new THREE.Matrix4().makeRotationZ(i*(Math.PI/CUBE_COUNT)));
        combined.multiply(new THREE.Matrix4().makeScale(0.5,3,1.5));

        cubes[i] = cube.clone();
        cubes[i].applyMatrix4(combined);

        scene.add(cubes[i]);
    }
}

export function animateStrip() {
    const delta = CLOCK.getDelta();
    for (let i = 0; i < CUBE_COUNT; i++) {
        cubes[i].applyMatrix4(new THREE.Matrix4().makeRotationY(delta*SPEED));
        cubes[i].rotation.z += delta*SPEED;
    }
}