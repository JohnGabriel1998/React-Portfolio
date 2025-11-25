"use client";
import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

    for(float i = 1.0; i < 8.0; i++) {
        uv.y += i * 0.1 / i * 
            sin(uv.x * i * i + iTime * 0.5) * sin(uv.y * i * i + iTime * 0.5);
    }

    vec3 col;
    col.r = uv.y - 0.1;
    col.g = uv.y + 0.3;
    col.b = uv.y + 0.95;

    fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface WaveBackgroundProps {
  backdropBlurAmount?: BlurSize;
  className?: string;
}

const blurClassMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

function WaveBackground({
  backdropBlurAmount = "sm",
  className = "",
}: WaveBackgroundProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const errorCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { 
      preserveDrawingBuffer: false,
      antialias: false 
    });
    if (!gl) {
      if (errorCountRef.current < 1) {
        console.warn("WebGL not supported, falling back to CSS background");
        errorCountRef.current++;
      }
      return;
    }

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        if (errorCountRef.current < 1) {
          console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
          errorCountRef.current++;
        }
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  let iResolutionLocation = gl.getUniformLocation(program, "iResolution");
  let iTimeLocation = gl.getUniformLocation(program, "iTime");

    let startTime = Date.now();
    let rafId: number;
    let disposed = false;

    const render = () => {
      if (disposed) return; // guard against running after unmount
      // Bail out if program got invalidated (context lost) to prevent INVALID_OPERATION
      if (!gl || disposed) return;

      // Reacquire uniforms if context reinitialized (rare but defensive)
      if (iResolutionLocation === null || iTimeLocation === null) {
        iResolutionLocation = gl.getUniformLocation(program, "iResolution");
        iTimeLocation = gl.getUniformLocation(program, "iTime");
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);

      const currentTime = (Date.now() - startTime) / 1000;

      // Check if uniform locations are valid before using them
      if (iResolutionLocation) {
        gl.uniform2f(iResolutionLocation, width, height);
      }
      if (iTimeLocation) {
        gl.uniform1f(iTimeLocation, currentTime);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    // Cleanup function
    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      try {
        if (gl) {
          gl.deleteProgram(program);
          gl.deleteShader(vertexShader);
          gl.deleteShader(fragmentShader);
          gl.deleteBuffer(positionBuffer);
        }
      } catch (e) {
        // Swallow errors during teardown (context may already be lost)
      }
    };
  }, []);

  const finalBlurClass = blurClassMap[backdropBlurAmount] || blurClassMap["sm"];

  return (
    <div className={`w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: "block" }}
      />
      <div className={`absolute inset-0 ${finalBlurClass} bg-gradient-to-br from-gray-50/20 to-gray-100/20 dark:from-gray-900/20 dark:to-gray-800/20`} />
    </div>
  );
}

export default WaveBackground;

