import * as THREE from "/build/three.module.js";

export var scene;
export var renderer;
export var minimapRenderer;
export  var camera;
export var minimapCamera;

export var Pos;
export var Dir;
export var Player;

export function setScene() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( );
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement );

    const ratio = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(45,ratio,0.00001,1000);

    Pos = new THREE.Vector3(0,0,0);
    camera.position.set(Pos.x,Pos.y,Pos.z);
    Dir = new THREE.Vector3(0,0,-1);
    camera.lookAt(Dir.x,Dir.y,Dir.z);

    minimapCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000);
    minimapCamera.position.set(0, 100, 0);
    minimapCamera.lookAt(camera.position);

    minimapRenderer = new THREE.WebGLRenderer();
    minimapRenderer.setSize(200, 200);
    minimapRenderer.domElement.style.position = 'absolute';
    minimapRenderer.domElement.style.top = '57px'; //Im writing this at 2:03am ok
    minimapRenderer.domElement.style.left = '0px';
    document.body.appendChild(minimapRenderer.domElement);

    const player_geometry = new THREE.SphereGeometry(0.5);
    const player_material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0,1,0),
    });
    Player = new THREE.Mesh(player_geometry, player_material);
    scene.add(Player);
}

export function setSceneElements() {
    const geometry_box = new THREE.BoxGeometry(10,0.1,10,32,1,32);
    const material_box = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1,0,0),
        wireframe: true
    });
    const BoxMesh = new THREE.Mesh(geometry_box,material_box);
    BoxMesh.position.y=-0.25;
    scene.add(BoxMesh);
}