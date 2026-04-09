import * as THREE from "/build/three.module.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";
import {scene, camera, renderer, gui, setScene, setSceneLighting, setSceneElements} from "./setup.js";


setScene();
setSceneElements();
setSceneLighting();

let tissue = null;
const controls = new OrbitControls(camera, renderer.domElement);
const CLOCK = new THREE.Clock();

createTissue(8, 100);
addSpotlight(tissue);

function createTissue(size, subd) {
    
    const tissueGeometry = new THREE.BufferGeometry();

    const vertices = [];
    const triangles = [];
    const amount = size/subd;
    const scale = 20;

    for (let i = 0; i < subd; i++) {
        for (let j = 0; j < subd; j++) {
            const POS = new THREE.Vector3(i*amount, j*amount, 0);
            POS.x -= size/2;
            POS.y -= size/2;
            
            const length = POS.length()/size * scale;
            POS.z = Math.cos(length);
            
            vertices.push(POS.x,POS.y,POS.z);
        }
    }
    for (let i = 0; i < subd-1; i++) {
        for (let j = 0; j < subd-1; j++) {
            const bottomLeft = getGridPosition(i,j,subd);
            const bottomRight = getGridPosition(i+1,j,subd);
            const topLeft = getGridPosition(i,j+1,subd);
            const topRight = getGridPosition(i+1,j+1,subd);

            triangles.push(topRight,topLeft,bottomRight);
            triangles.push(bottomRight,topLeft,bottomLeft);
        }
    }

    tissueGeometry.setIndex(triangles);
    tissueGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
    tissueGeometry.computeVertexNormals();

    const tissueMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(1,0.3,0.3),
        side: THREE.DoubleSide,
        wireframe: false
    })

    tissue = new THREE.Mesh(tissueGeometry, tissueMaterial);
    tissue.castShadow = true;
    tissue.rotation.x -= Math.PI/2;
    scene.add(tissue);
}

//Helper Functions
function getGridPosition(x,y, subdivision) {
      return x*subdivision+y;
}
function SpawnBox(pos) {
      const box_geom = new THREE.BoxGeometry(0.02,0.02,0.02);
      const box_material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1,1,0.4),
            wireframe: false
      });
      const box = new THREE.Mesh(box_geom, box_material);
      box.position.set(pos.x, pos.y, pos.z);
      scene.add(box);
}
function addSpotlight(mesh) {
    const spotlight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.2);
    spotlight.angle = Math.PI/8;
    spotlight.penumbra = 0.3;
    spotlight.castShadow = true;

    spotlight.position.set(mesh.position.x,15,0)
    spotlight.target = mesh;

    scene.add(spotlight);
}

function updateScene() {
    const delta = CLOCK.getDelta();
    controls.update();
    if (tissue != null) {
        tissue.rotation.z += delta;
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(updateScene);
