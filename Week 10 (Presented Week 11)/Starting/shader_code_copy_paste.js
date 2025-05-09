const vertexShader = `
      uniform float time;
      varying vec2 vUV;

      void main() {
        vUV = uv;
        vec3 pos = position;

        float wave = sin(position.x * 5 + time * 2) * 0.2;
        pos.z += wave;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

const fragmentShader = `
      varying vec2 vUV;

      void main() {
        vec3 color = mix(vec3(0.5, 0, 0), vec3(1.0, 1.0, 1.0), vUV.y);
        gl_FragColor = vec4(color, 1.0);
      }
    `;