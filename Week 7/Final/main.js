import * as THREE from "/build/three.module.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";
import {scene, camera, renderer, gui, setScene, setSceneLighting} from "./setup.js";
import {GetGridPosition, SpawnBox} from "./Helpers.js";

let tissue = null;

setScene();
setSceneLighting();
CreateTissue(8, 100);
const controls = new OrbitControls(camera, renderer.domElement);

function CreateTissue(size, subd) {
    const tissue_geometry = new THREE.BufferGeometry();

    const vertices = [];
    const triangles = [];
    const scale = 20;
    const amount = size/subd;

    for (let i = 0; i < subd; i++) {
        for (let j = 0; j < subd; j++) {
            const POS = new THREE.Vector3(i*amount, j*amount,0);
            POS.x -= size/2;
            POS.y -= size/2;

            const Length = POS.length()/size * scale;
            POS.z = Math.cos(Length);
            vertices.push(POS.x,POS.y,POS.z);
        }
    }
    for (let i = 0; i < subd-1; i++) {
        for (let j = 0; j < subd-1; j++) {
            const BottomLeft = GetGridPosition(i,j,subd);
            const BottomRight = GetGridPosition(i+1,j,subd);
            const TopLeft = GetGridPosition(i,j+1,subd);
            const TopRight = GetGridPosition(i+1,j+1,subd);

            triangles.push(TopRight, TopLeft, BottomRight);
            triangles.push(BottomRight, TopLeft, BottomLeft)
        }
    }

    tissue_geometry.setIndex(triangles);
    tissue_geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
    tissue_geometry.computeVertexNormals();

    const tissue_material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(1,1,0.3),
        side: THREE.DoubleSide,
        wireframe: false
    });

    tissue = new THREE.Mesh(tissue_geometry, tissue_material);
    tissue.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))
    scene.add(tissue);
}

function UpdateScene() {
    controls.update();
    if (tissue != null) {
        tissue.applyMatrix4(new THREE.Matrix4().makeRotationY(0.04));
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(UpdateScene);
