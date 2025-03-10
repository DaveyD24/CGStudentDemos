import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, setScene, setSceneElements, cube, tetra} from "/setup.js";

setScene();
setSceneElements();

cube.position.x += 2;
tetra.position.x -= 2;

renderer.render(scene, camera);