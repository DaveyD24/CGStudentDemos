import * as THREE from "./build/three.module.js";
import { OBJLoader } from "./build/loaders/OBJLoader.js";

export async function loadObBJ(modelName, height, material) {
    const loader = new OBJLoader();
    let mesh;
    const group = await loader.loadAsync(`models/${modelName}.obj`);
    group.traverse((child) => {
        if (child.isMesh) {
            mesh = child;
            return;
        }
    })
    scaleToHeight(mesh, height);
    mesh.material = material;
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
