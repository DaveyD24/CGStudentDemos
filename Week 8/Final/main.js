import * as THREE from "/build/three.module.js";
import {scene, renderer, camera, setScene, setSceneElements, setSceneLighting} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";
import {OBJLoader} from "/build/loaders/OBJLoader.js";

const clock = new THREE.Clock();
const SPEED = 5;

setScene();
setSceneElements()
setSceneLighting();
const earth = await createWorld();
createWall();

const controls = new OrbitControls(camera, renderer.domElement);

async function createWorld() {
    const earthGeometry = new THREE.SphereGeometry(1.5);
    const earthMaterial = new THREE.MeshPhongMaterial({
        wireframe: false,
        map: new THREE.TextureLoader().load("image/texture/world.jpg"),
        normalMap : new THREE.TextureLoader().load("image/normal/world.png"),
        side: THREE.DoubleSide
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    let mesh = await loadOBJ("stand.obj");
    scaleToHeight(mesh, 5);

    mesh.material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0.5,0.3,0.2)
    });
    mesh.castShadow = true;
    mesh.position.y = -1.6;

    scene.add(mesh);
    earth.add(mesh)
    return earth;
}

function createWall() {
    const wallGeometry = new THREE.BoxGeometry(10,10,1);
    const wallMaterial = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load("image/texture/brick.jpg"),
        normalMap: new THREE.TextureLoader().load("image/normal/brick.jpg")
    });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.z -= 5.5;
    scene.add(wall);
}

async function loadOBJ(modelName) {
    const loader = new OBJLoader();
    let mesh;
    const group = await loader.loadAsync(`models/${modelName}`);
    group.traverse((child) => {
        if (child.isMesh) {
            mesh = child;
            return;
        }
    })
    return mesh;
}

function scaleToHeight(mesh, targetHeight) {
    const box = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    box.getSize(size);

    const currentHeight = size.y
    const scale = targetHeight / currentHeight;

    mesh.scale.multiplyScalar(scale);
}

function updateScene() {
    controls.update();
    const delta = clock.getDelta();
    if (earth != null) {
        earth.rotation.y += delta * 0.1 * SPEED;
    }
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(updateScene);
