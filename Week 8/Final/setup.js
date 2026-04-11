import * as THREE from "/build/three.module.js";

export let scene;
export let camera;
export let renderer;

export function setScene() {
    scene = new THREE.Scene();
    const renderView = document.querySelector(".render-view");
    const aspectRatio = renderView.clientWidth / renderView.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);

    camera.position.set(0, 10, 20);
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
    const planeGeometry = new THREE.BoxGeometry(10,10,1);
    const planeMaterial = new THREE.MeshLambertMaterial(
        {
            color: new THREE.Color(1,1,1),
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("image/texture/wood.jpg")
        }
    );
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x += Math.PI/2;
    plane.position.y -= 4.5;
    plane.receiveShadow = true;
    scene.add(plane);
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

    const sideLight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.5);
    sideLight.castShadow = true;
    sideLight.receiveShadow = true;
    sideLight.penumbra = 0.3;
    sideLight.position.set(0,0,5);
    sideLight.lookAt(0,0,0);
    scene.add(sideLight);
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