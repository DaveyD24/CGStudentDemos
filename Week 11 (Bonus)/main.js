import { main, logo, setScene, setSceneElements, setLogoScene} from "./setup.js";
import * as THREE from "./build/three.module.js";
import {LERP_SPEED, CAMERA_ROTATION_OFFSET, ROTATION_SPEED} from "./constants.js";
import { loadObBJ } from "./meshLoader.js"

setScene();
setSceneElements();
setLogoScene();

const clock = new THREE.Clock();
let rotating = false;
let targetRotation = new THREE.Euler(0, Math.PI/2 - CAMERA_ROTATION_OFFSET, 0);
const shapes = [];
let currentShapeViewIndex = 0;
let animationIndex = 0;

let bunny = await loadObBJ("bunny", 2.5, new THREE.MeshBasicMaterial({color: new THREE.Color(1, 0.5, 0.5)}));
bunny.position.y -= 1.5;
logo.scene.add(bunny);

const box = addShape(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(1,0,0), wireframe: true }),
    new THREE.Vector3(-5,0,0)
);
addShape(
    new THREE.TetrahedronGeometry(1),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5,0.5,1), wireframe: true }),
    new THREE.Vector3(0,0,-5)
);
addShape(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(1,1,0), wireframe: true }),
    new THREE.Vector3(5,0,0)
);
addShape(
    new THREE.DodecahedronGeometry(1),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0,1,0), wireframe: true }),
    new THREE.Vector3(0,0,5)
);

function addShape(geometry, material, position) {
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(position.x, position.y, position.z);
    main.scene.add(shape);
    shapes.push(shape)
    return shape;
}

function lerpCameraRotation(camera, targetEuler, alpha) {
    const epsilon = 0.001;
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
    const angle = camera.quaternion.angleTo(targetQuaternion);
    if (angle < epsilon) {
        main.camera.quaternion.copy(targetQuaternion);
        return true;
    }
    main.camera.quaternion.slerp(targetQuaternion, alpha);
    return false;
}

function nextTextAnimation() {
    const overlay = document.querySelector(".overlay");
    if (animationIndex === 4) {
        overlay.style.transition = "none";
        overlay.style.transform = `translateY(0)`;
        overlay.offsetHeight;
        overlay.style.transition = "transform 0.6s ease";
        animationIndex = 0;
    }
    overlay.style.transform = `translateY(-${(animationIndex+1) * 100}vh)`;
    animationIndex++;
}

function resizeHeaderBox() {
    const header = document.querySelector(".box");
    const bounds = getScreenBounds(shapes[currentShapeViewIndex], main.camera, main.renderer);

    const widthBuffer = 50;
    const heightBuffer = 75;
    header.style.left = `${bounds.x - widthBuffer}px`;
    header.style.top = `${bounds.y - heightBuffer}px`;
    header.style.width = `${bounds.width + (widthBuffer*2)}px`;
    header.style.height = `${bounds.height + (heightBuffer*2)}px`;

    header.querySelectorAll("p").forEach(p => {
        p.textContent = shapes[currentShapeViewIndex].geometry.type.replace("Geometry", "").toUpperCase();
    })
}

function getScreenBounds(obj, camera, renderer) {
    const box = new THREE.Box3().setFromObject(obj);
    const points = [
        new THREE.Vector3(box.min.x, box.min.y, box.min.z),
        new THREE.Vector3(box.min.x, box.min.y, box.max.z),
        new THREE.Vector3(box.min.x, box.max.y, box.min.z),
        new THREE.Vector3(box.min.x, box.max.y, box.max.z),
        new THREE.Vector3(box.max.x, box.min.y, box.min.z),
        new THREE.Vector3(box.max.x, box.min.y, box.max.z),
        new THREE.Vector3(box.max.x, box.max.y, box.min.z),
        new THREE.Vector3(box.max.x, box.max.y, box.max.z),
    ];

    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    for (const point of points) {
        point.project(camera); //Convert from world space to screen space [-1 -> 1]

        const x = (point.x * 0.5 + 0.5) * renderer.domElement.clientWidth;     //Convert from screen space to
        const y = (-point.y * 0.5 + 0.5) * renderer.domElement.clientHeight;   //pixel space [0 -> renderer width]

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    return { 
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
}

function updateLoop() {
    const delta = clock.getDelta();
    if (rotating) {
        rotating = !lerpCameraRotation(main.camera, targetRotation, 0.01 * LERP_SPEED);
    }
    else {
        resizeHeaderBox();
    }
    if (bunny !== null) {
        bunny.rotation.y += delta * ROTATION_SPEED;
    }
    main.renderer.render(main.scene, main.camera); 
    logo.renderer.render(logo.scene, logo.camera);  
}
main.renderer.setAnimationLoop(updateLoop);

window.addEventListener("click", () => {
    targetRotation = new THREE.Euler(0, targetRotation.y - Math.PI/2, 0)
    rotating = true;
    currentShapeViewIndex++;
    if (currentShapeViewIndex === shapes.length) {
        currentShapeViewIndex = 0;
    }
    nextTextAnimation();
});

window.addEventListener("resize", () => {
    main.renderer.setSize(window.innerWidth, window.innerHeight);
    main.camera.aspectRatio = window.innerWidth / window.innerHeight;
    main.camera.updateProjectionMatrix();
    main.renderer.render(main.scene,main.camera);
    resizeHeaderBox();
})