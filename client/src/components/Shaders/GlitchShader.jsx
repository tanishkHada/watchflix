import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GlitchShader = () => {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;
    uniform float glitchIntensity;
    uniform float time;

    float random(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;

      // Add dynamic randomness based on time
      float segment = floor(uv.y * 10.0 + time * 2.0);
      float randomValue = random(vec2(segment, time));

      // Dynamic offsets for color channels
      vec2 redOffset = vec2(randomValue * glitchIntensity * 0.03, 0.0);
      vec2 greenOffset = vec2(-randomValue * glitchIntensity * 0.02, 0.0);
      vec2 blueOffset = vec2(randomValue * glitchIntensity * 0.01, 0.0);

      // Sample textures with offsets
      vec4 redChannel = texture2D(u_texture, uv + redOffset);
      vec4 greenChannel = texture2D(u_texture, uv + greenOffset);
      vec4 blueChannel = texture2D(u_texture, uv + blueOffset);

      // Combine channels
      gl_FragColor = vec4(redChannel.r, greenChannel.g, blueChannel.b, 1.0);
    }
  `;

  const createTextTexture = (text, font, size, color, fontWeight = "100") => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const canvasWidth = 2048;
    const canvasHeight = 2048;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = color || "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const fontSize = size || Math.floor(canvasWidth);
    ctx.fillStyle = "#1a1a1a";
    ctx.font = `${fontWeight} ${fontSize}px "${font || "Arial"}"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const scaleFactor = Math.min(1, (canvasWidth * 0.8) / textWidth);
    const aspectCorrection = canvasWidth / canvasHeight;

    ctx.setTransform(
      scaleFactor,
      0,
      0,
      scaleFactor / aspectCorrection,
      canvasWidth / 2,
      canvasHeight / 2
    );

    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = fontSize * 0.005;
    for (let i = 0; i < 3; i++) {
      ctx.strokeText(text, 0, 0);
    }

    ctx.fillText(text, 0, 0);

    return new THREE.CanvasTexture(canvas);
  };

  const ShaderPlane = () => {
    const materialRef = useRef();
    const texture = createTextTexture("404", "Arial", null, "#ffffff", "100");

    useFrame((state) => {
      if (materialRef.current) {
        materialRef.current.uniforms.time.value = state.clock.elapsedTime;
        materialRef.current.uniforms.glitchIntensity.value =
          0.1 + Math.random() * 0.2; // Random intensity between 0.1 and 0.3
      }
    });

    return (
      <mesh>
        <planeGeometry args={[3, 3]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            u_texture: { value: texture },
            glitchIntensity: { value: 0.1 },
            time: { value: 0.0 },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    );
  };

  return (
    <div
      className="responsive-canvas"
      style={{
        width: "100%",
        height: "400px",
        position: "relative",
        background: "#3b852b",
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
};

export default GlitchShader;
