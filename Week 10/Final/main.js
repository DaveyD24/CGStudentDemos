import * as THREE from "./build/three.module.js"
import {scene, camera, renderer, SetScene, setSceneElements, SetSceneLighting, repositionGUI} from "./setup.js";
import {OrbitControls} from "./build/controls/OrbitControls.js";
import { GUI } from "./build/gui/lil-gui.module.min.js";

SetScene();
setSceneElements();
SetSceneLighting();
const controls = new OrbitControls(camera, renderer.domElement);
const CLOCK = new THREE.Clock();

const uniforms = {
    uTime: { value: 0 },
    uFrequency: { value: 5 },
    uSpeed: { value: 2 },
    uAmplitude: { value: 0.2 },
    uFlagColor: { value: new THREE.Color(0,0,1) },
    uCubeColor: { value: new THREE.Color(0,1,0) }
};

createFlag();
createCube();
setupGUI();

function createCube() {
    const cubeGeometry = new THREE.BoxGeometry(1,1,1);

    const vertexShader = `
        varying vec2 vUV;

        void main() {
            vUV = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x-3.0, position.y, position.z, 1.0);
        }
    `
    const fragmentShader = `
        uniform float uTime;
        uniform vec3 uCubeColor;
        varying vec2 vUV;

        void main() {
            float brightness = sin(uTime*3.0);
            vec3 color =  mix(vec3(uCubeColor.r, uCubeColor.g, uCubeColor.b), vec3(0.0,0.0,0.0), vUV.x);
            gl_FragColor = vec4(color, brightness);
        }
    `

    const cubeMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);
}

function createFlag() {
    const flagGeometry = new THREE.PlaneGeometry(4, 2, 64, 64);

    const vertexShader = `
      uniform float uTime;
      uniform float uFrequency;
      uniform float uAmplitude;
      uniform float uSpeed;
      varying vec2 vUV;

      void main() {
        vUV = uv;
        vec3 pos = position;

        float wave = sin(position.x * uFrequency + (uTime * uSpeed)) * uAmplitude;
        pos.z += wave;
        pos.x += wave;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUV;
      uniform vec3 uFlagColor;

      void main() {
        vec3 color = mix(vec3(uFlagColor.r, uFlagColor.g, uFlagColor.b), vec3(1.0, 1.0, 1.0), vUV.y);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const flagMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        side: THREE.DoubleSide,
    });

    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    scene.add(flag);
}

function setupGUI() {
    const gui = new GUI();
    gui.addColor(uniforms, 'uCubeColor')
        .name("Cube Colour")
        .onChange(val => uniforms.uCubeColor.value = val)
    gui.addColor(uniforms, 'uFlagColor')
        .name("Flag Colour")
        .onChange(val => uniforms.uFlagColor.value = val)
    repositionGUI();
}

function updateScene() {
    controls.update();
    uniforms.uTime.value = CLOCK.getElapsedTime();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(updateScene);