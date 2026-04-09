import * as THREE from "/build/three.module.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";
import {scene, camera, renderer, gui, setScene, setSceneLighting, setSceneElements} from "./setup.js";


setScene();
setSceneElements();
setSceneLighting();

const controls = new OrbitControls(camera, renderer.domElement);
const CLOCK = new THREE.Clock();


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
    controls.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(updateScene);
