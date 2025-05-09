import * as THREE from "/build/three.module.js";

export var scene;
export var camera;
export var renderer;

export function SetScene() {
    scene = new THREE.Scene( );
    scene.background = new THREE.Color(0.9, 0.9, 0.9 );
    const ratio = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    // camera.position.set(0,2,150);
    // camera.lookAt(0,0,2);

    renderer = new THREE.WebGLRenderer( );
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement );
}

export function SetSceneLighting() {
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

export function SetSceneElements() {
    const floor_geo = new THREE.PlaneGeometry(100, 100);
    const floor_mat = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        color: new THREE.Color(1,1,1)
    });
    const floor = new THREE.Mesh(floor_geo, floor_mat);
    floor.rotation.x = Math.PI/2;
    floor.position.y -= 3;
    scene.add(floor);
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