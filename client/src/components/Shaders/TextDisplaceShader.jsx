import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TextDisplaceShader = () => {
  const easeFactorRef = useRef(0.02);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const targetMousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const prevPositionRef = useRef({ x: 0.5, y: 0.5 });

  const [fontLoaded, setFontLoaded] = useState(false);

   // Wait for the custom font to load
   useEffect(() => {
    const loadFont = async () => {
      try {
        // Ensure the font is loaded before proceeding
        await document.fonts.load('16px humane');
        setFontLoaded(true);
      } catch (error) {
        console.error("Failed to load font:", error);
      }
    };

    loadFont();
  }, []);

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
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;

    void main() {
      vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
      vec2 centerOfPixel = gridUV + vec2(1.0 / 40.0, 1.0 / 40.0);

      vec2 mouseDirection = u_mouse - u_prevMouse;

      vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
      float pixelDistanceToMouse = length(pixelToMouseDirection);
      float strength = smoothstep(0.2, 0.0, pixelDistanceToMouse) * 20.0;

      vec2 uvOffset = strength * mouseDirection * 0.3;
      vec2 uv = vUv - uvOffset;

      vec4 color = texture2D(u_texture, uv);
      gl_FragColor = color;
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

    ctx.fillStyle = "#ffffff";
    ctx.font = `${fontWeight} ${fontSize}px "${font || "Arial"}"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

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
      canvasHeight * 0.4,
    );

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = fontSize * 0.005;
    for (let i = 0; i < 3; i++) {
      ctx.strokeText(text, 0, 0);
    }

    ctx.fillText(text, 0, 0);

    return new THREE.CanvasTexture(canvas);
  };

  const ShaderPlane = () => {
    const materialRef = useRef();

    useFrame(() => {
      const easeFactor = easeFactorRef.current;
      const mousePosition = mousePositionRef.current;
      const targetMousePosition = targetMousePositionRef.current;
      const prevPosition = prevPositionRef.current;

      // Smoothly update the mouse position
      prevPosition.x = mousePosition.x;
      prevPosition.y = mousePosition.y;

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

      materialRef.current.uniforms.u_mouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y
      );

      materialRef.current.uniforms.u_prevMouse.value.set(
        prevPosition.x,
        1.0 - prevPosition.y
      );
    });

    const texture = createTextTexture("WATCHFLIX", "humane", 750, "#5a5a5a", "100");

    return (
      <mesh>
        <planeGeometry args={[3, 3]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_texture: { value: texture },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    );
  };

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    targetMousePositionRef.current.x = x;
    targetMousePositionRef.current.y = y;
  };

  return (
    <div
      className="responsive-canvas w-[100%] h-[950px] relative"
      // style={{
      //   width: "100%",
      //   height: "800px",
      //   position: "relative",
      //   background: '#3b852b'
      // }}
      onMouseMove={handleMouseMove}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        {fontLoaded && <ShaderPlane />}
      </Canvas>
    </div>
  );
};

export default TextDisplaceShader;

