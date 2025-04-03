import * as THREE from "./build/three.module.js";
import {scene} from "./setup.js";

//Retrieves a 2D value stored in a 1D array
export function GetGridPosition(x,y, subdivision) {
      return x*subdivision+y;
}

//Can help visualise the vertex a bit easier
export function SpawnBox(pos) {
      const box_geom = new THREE.BoxGeometry(0.05,0.05,0.05);
      const box_material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1,1,0.4),
            wireframe: false
      });
      const box = new THREE.Mesh(box_geom, box_material);
      box.position.set(pos.x, pos.y);
      scene.add(box);
}