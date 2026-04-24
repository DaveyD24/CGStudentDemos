import * as THREE from "/build/three.module.js";

export let scene;
export let renderer;
export let minimapRenderer;
export let camera;
export let minimapCamera;

export let Pos;
export let Dir;
export let player;
export let plane;

export const PLANE_SIZE = 10;

export function setScene() {
    scene = new THREE.Scene();
    const renderView = document.querySelector(".render-view");
    const aspectRatio = renderView.clientWidth / renderView.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(renderView.clientWidth, renderView.clientHeight);
    renderer.domElement.style.borderRadius = "15px";
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene.background = new THREE.Color("#303041");
    document.querySelector(".render-view").appendChild(renderer.domElement);

    Pos = new THREE.Vector3(0,0,0);
    camera.position.set(Pos.x,Pos.y,Pos.z);
    Dir = new THREE.Vector3(0,0,-1);
    camera.lookAt(Dir.x,Dir.y,Dir.z)
}

export function setSceneElements() {
    const planeGeometry = new THREE.BoxGeometry(PLANE_SIZE,0.1,PLANE_SIZE,32,1,32);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,1,0),
        wireframe: true
    });
    plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.position.y=-0.25;
    scene.add(plane);
}

function resizeRenderView() {
    const width = document.querySelector(".render-view").clientWidth;
    const height = document.querySelector(".render-view").clientHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener("resize", resizeRenderView);