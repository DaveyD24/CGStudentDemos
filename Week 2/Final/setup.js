import * as THREE from './build/three.module.js';

export let scene;
export let renderer;
export let camera;

export function setScene() {
    scene = new THREE.Scene();
    const renderView = document.querySelector(".render-view");
    const aspectRatio = renderView.clientWidth / renderView.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    camera.lookAt(0,0,1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(renderView.clientWidth, renderView.clientHeight);
    renderer.domElement.style.borderRadius = "15px";
    scene.background = new THREE.Color("#17171a");
    document.querySelector(".render-view").appendChild(renderer.domElement);
}

export function setSceneElements() {

    const cubeGeometry = new THREE.BoxGeometry(2,2,2);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,1,0),
        wireframe: true
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x += 2;
    scene.add(cube);

    const tetraGeometry = new THREE.TetrahedronGeometry(2,0);
    const tetraMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,0,1),
        wireframe: true
    });
    const tetra = new THREE.Mesh(tetraGeometry, tetraMaterial);
    tetra.position.x -= 2;
    scene.add(tetra);
}