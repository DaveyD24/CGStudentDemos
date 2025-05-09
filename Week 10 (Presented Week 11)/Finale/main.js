import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, SetScene, SetSceneLighting, SetSceneElements} from "./setup.js";
import {OrbitControls} from "/build/controls/OrbitControls.js";

SetScene();
SetSceneLighting();
SetSceneElements();
const controls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();

const uniforms = {
    time: { value: 0 },
    frequency: { value: 5 },
    speed: { value: 2 },
    amplitude: { value: 0.2 },
};
CreateFlag();

function CreateFlag() {
    const flag_geometry = new THREE.PlaneGeometry(4, 2, 64, 64);

    const vertexShader = `
      uniform float time;
      uniform float frequency;
      uniform float amplitude;
      uniform float speed;
      varying vec2 vUV;

      void main() {
        vUV = uv;
        vec3 pos = position;

        float wave = sin(position.x * frequency + time * speed) * amplitude;
        pos.z += wave;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const colour = new THREE.Color(0.5,0,0);
    const fragmentShader = `
      varying vec2 vUV;

      void main() {
        vec3 color = mix(vec3(${colour.r}, ${colour.g}, ${colour.b}), vec3(1.0, 1.0, 1.0), vUV.y);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const flag_material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        side: THREE.DoubleSide,
        wireframe: false
    });

    const flag = new THREE.Mesh(flag_geometry, flag_material);
    scene.add(flag);
}

function UpdateScene() {
    controls.update();
    uniforms.time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(UpdateScene);

