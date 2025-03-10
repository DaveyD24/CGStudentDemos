import * as THREE from 'three';

export var scene;
export var renderer;
export  var camera;

export var Pos;
export var Dir;

export function setScene() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( );
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement );

    const ratio = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(45,ratio,0.00001,1000);

    Pos = new THREE.Vector3(0,0,0);
    camera.position.set(Pos.x,Pos.y,Pos.z);
    Dir = new THREE.Vector3(0,0,1);
    camera.lookAt(Dir.x,Dir.y,Dir.z);
}

export function setSceneElements() {
    const geometry_box = new THREE.BoxGeometry(10,0.1,10,32,1,32);
    const material_box = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1,0,0),
        wireframe: true
    });
    const BoxMesh = new THREE.Mesh(geometry_box,material_box);
    BoxMesh.position.y=-1;
    scene.add(BoxMesh);
}