import * as THREE from "/build/three.module.js";

export let scene;
export let camera;
export let renderer;

export function SetScene() {
    scene = new THREE.Scene();
    const renderView = document.querySelector(".render-view");
    const aspectRatio = renderView.clientWidth / renderView.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);

    camera.position.set(0, 2, 5);
    camera.lookAt(0,0,0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(renderView.clientWidth, renderView.clientHeight);
    renderer.domElement.style.borderRadius = "15px";
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene.background = new THREE.Color("#e3e3ff");
    document.querySelector(".render-view").appendChild(renderer.domElement);
}

export function setSceneElements() {
    const sphereGeometry = new THREE.SphereGeometry(100);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1,0,0),
        wireframe: true,
        side: THREE.DoubleSide
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
}

export function SetSceneLighting() {
    const cameraLight = new THREE.PointLight( new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1),0.2);
    scene.add(ambientLight);
}

export function repositionGUI() {
    const guiDom = document.getElementsByClassName("lil-gui")[0];
    const renderView = document.getElementsByClassName("render-view")[0];
    const rect = renderView.getBoundingClientRect();

    guiDom.style.right = rect.left;
    guiDom.style.top = rect.top;
}

function resize() {
    const width = document.querySelector(".render-view").clientWidth;
    const height = document.querySelector(".render-view").clientHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
    repositionGUI();
}
window.addEventListener('resize', resize);