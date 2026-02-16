import {scene, camera, renderer, setScene, setSceneElements, cube, tetra} from "./setup.js";

setScene();
setSceneElements();

cube.position.x += 2;
tetra.position.x -= 2;

function updateLoop() {
    cube.rotation.y += 0.01;
    tetra.rotation.x += 0.01;
    renderer.render(scene, camera);
}

renderer.render(scene, camera);
renderer.setAnimationLoop(updateLoop);