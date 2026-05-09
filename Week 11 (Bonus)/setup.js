import * as THREE from "./build/three.module.js";
import {CAMERA_ROTATION_OFFSET} from "./constants.js";

export const main = {
    scene: null,
    camera: null,
    renderer: null
}
export const logo = {
    scene: null,
    camera: null,
    renderer: null
}

export function setScene() {
    main.scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    main.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    main.camera.position.set(0,0,0);
    main.camera.lookAt(-1,0,0);
    main.camera.rotation.y -= CAMERA_ROTATION_OFFSET ;
    main.renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    main.renderer.setClearColor(0x000000, 0); 
    main.scene.background = null;
    main.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(main.renderer.domElement);
}

export function setLogoScene() {
    logo.scene = new THREE.Scene();
    const logoDiv = document.querySelector(".logo");
    const aspectRatio = logoDiv.clientWidth / logoDiv.clientHeight;
    logo.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    logo.camera.position.set(0,0,-6);
    logo.camera.lookAt(0,0,1);
    logo.renderer = new THREE.WebGLRenderer();
    logo.renderer.setSize(logoDiv.clientWidth, logoDiv.clientHeight);
    logo.renderer.domElement.style.borderRadius = "10px";
    logo.scene.background = new THREE.Color("#000000");
    logoDiv.appendChild(logo.renderer.domElement);
}

export function setSceneElements() {
    const planeGeometry = new THREE.BoxGeometry(25,0.1,25,64,1,64);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1,1,1),
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const solidMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,0,0)
    });
    const plane = new THREE.Mesh(planeGeometry,planeMaterial);
    const innerPlane = new THREE.Mesh(planeGeometry, solidMaterial);
    innerPlane.position.y = -1;
    plane.position.y=-1;
    main.scene.add(plane, innerPlane);
}