import * as THREE from "/build/three.module.js";

export let scene;
export let camera;
export let renderer;
export let cube;
export let tetra;

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
    document.querySelector(".render-view").appendChild(renderer.domElement);
}

export function setSceneElements() {
    const cubeGeometry = new THREE.BoxGeometry(2,2,2);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,1,0),
        wireframe: true
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    const tetraGeometry = new THREE.TetrahedronGeometry(2,0);
    const tetraMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,0,1),
        wireframe: true
    });
    tetra = new THREE.Mesh(tetraGeometry, tetraMaterial);
    scene.add(tetra);
}
