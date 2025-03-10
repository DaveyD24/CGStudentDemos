import * as THREE from "/build/three.module.js";

export var scene;
export var camera;
export var renderer;
export var cube;
export var tetra;

export function setScene() {
    scene = new THREE.Scene();
    const ratio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);

    camera.position.set(0, 0, 15);
    camera.lookAt(0,0,1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

export function setSceneElements() {
    const cube_geometry = new THREE.BoxGeometry(2,2,2);
    const cube_material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,1,0),
        wireframe: true
    });
    cube = new THREE.Mesh(cube_geometry, cube_material);
    scene.add(cube);

    const tetra_geometry = new THREE.TetrahedronGeometry(2,0);
    const tetra_material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,0,1),
        wireframe: true
    });
    tetra = new THREE.Mesh(tetra_geometry, tetra_material);
    scene.add(tetra);
}
