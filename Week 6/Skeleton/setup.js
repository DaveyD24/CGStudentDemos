import * as THREE from "/build/three.module.js"

export var scene;
export var camera;
export var renderer;


export function setScene() {
    scene = new THREE.Scene( );
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xffffff );
    const ratio = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
    camera.position.set(0,0,20);
    camera.lookAt(0,0,0);

    renderer = new THREE.WebGLRenderer( );
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement );
}

export function setSceneElements() {
    const plane_geometry = new THREE.PlaneGeometry(10,10,10,10);
    const plane_material = new THREE.MeshLambertMaterial(
        {
            color: new THREE.Color(1.0,0.8,1.0),
            side: THREE.DoubleSide
        }
    );
    const plane = new THREE.Mesh(plane_geometry, plane_material);
    plane.name = "floor";
    scene.add(plane);
}

export function setSceneLighting() {
    const cameraLight = new THREE.PointLight( new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1),0.2);
    scene.add(ambientLight);
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