"use client";
import { useEffect, useRef } from "react";

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface SmokeyCursorProps {
  simulationResolution?: number;
  dyeResolution?: number;
  captureResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  enableShading?: boolean;
  colorUpdateSpeed?: number;
  backgroundColor?: ColorRGB;
  transparent?: boolean;
  className?: string;
  disabled?: boolean;
  intensity?: number;
  followMouse?: boolean;
  autoColors?: boolean;
}

// Removed unused interface - commented out to avoid TypeScript errors
/*
interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}
*/

// Removed unused function
/*
function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  };
}
*/

export default function SmokeyCursor({
  simulationResolution = 128,
  dyeResolution = 1440,
  captureResolution = 512,
  densityDissipation = 3.5,
  velocityDissipation = 2,
  pressure = 0.1,
  pressureIterations = 20,
  curl = 3,
  splatRadius = 0.2,
  splatForce = 6000,
  enableShading = true,
  colorUpdateSpeed = 10,
  backgroundColor = { r: 0.5, g: 0, b: 0 },
  transparent = true,
  className = "",
  disabled = false,
}: SmokeyCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || disabled) return;

    let config = {
      SIM_RESOLUTION: simulationResolution,
      DYE_RESOLUTION: dyeResolution,
      CAPTURE_RESOLUTION: captureResolution,
      DENSITY_DISSIPATION: densityDissipation,
      VELOCITY_DISSIPATION: velocityDissipation,
      PRESSURE: pressure,
      PRESSURE_ITERATIONS: pressureIterations,
      CURL: curl,
      SPLAT_RADIUS: splatRadius,
      SPLAT_FORCE: splatForce,
      SHADING: enableShading,
      COLOR_UPDATE_SPEED: colorUpdateSpeed,
      PAUSED: false,
      BACK_COLOR: backgroundColor,
      TRANSPARENT: transparent,
    };

    let gl: WebGL2RenderingContext | WebGLRenderingContext | null = null;
    let ext: any = null;
    let animationFrameId: number | null = null;
    
    try {
      const contextResult = getWebGLContext(canvas);
      if (!contextResult || !contextResult.gl || !contextResult.ext) {
        console.warn('WebGL not available, SmokeyCursor disabled');
        return;
      }
      gl = contextResult.gl;
      ext = contextResult.ext;
    } catch (error) {
      console.warn('WebGL initialization failed, SmokeyCursor disabled:', error);
      return;
    }
    
    if (!gl || !ext) return;

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas: HTMLCanvasElement): { gl: WebGL2RenderingContext | WebGLRenderingContext | null; ext: any } | null {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;

      if (!gl) {
        const webglContext = (canvas.getContext("webgl", params) ||
          canvas.getContext("experimental-webgl", params)) as WebGLRenderingContext | null;
        if (webglContext) {
          // For WebGL1, we'll return null as WebGL2 is required
          return null;
        }
      }

      if (!gl) return null;

      const isWebGL2 = "drawBuffers" in gl;
      let supportLinearFiltering = false;
      let halfFloat: OES_texture_half_float | null = null;

      if (isWebGL2) {
        (gl as WebGL2RenderingContext).getExtension("EXT_color_buffer_float");
        supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension("OES_texture_float_linear");
      } else {
        // WebGL1 fallback - should not reach here as we return null above
        return null;
      }

      gl.clearColor(0, 0, 0, 1);
      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : (halfFloat && (halfFloat as any).HALF_FLOAT_OES) || 0;

      let formatRGBA: any;
      let formatRG: any;
      let formatR: any;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RG16F, (gl as WebGL2RenderingContext).RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, (gl as WebGL2RenderingContext).R16F, (gl as WebGL2RenderingContext).RED, halfFloatTexType);
      } else {
        // WebGL1 fallback - should not reach here
        formatRGBA = getSupportedFormat(gl as any, (gl as any).RGBA, (gl as any).RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl as any, (gl as any).RGBA, (gl as any).RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl as any, (gl as any).RGBA, (gl as any).RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number,
      format: number,
      type: number
    ): { internalFormat: number; format: number } | null {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if ("drawBuffers" in gl) {
          const gl2 = gl as WebGL2RenderingContext;
          switch (internalFormat) {
            case gl2.R16F:
              return getSupportedFormat(gl2, gl2.RG16F, gl2.RG, type);
            case gl2.RG16F:
              return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);
            default:
              return null;
          }
        }
        return null;
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number,
      format: number,
      type: number
    ) {
      const texture = gl.createTexture();
      if (!texture) return false;

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      if (!fbo) return false;

      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    // Setup canvas size
    let mouseX = 0;
    let mouseY = 0;
    let startTime = Date.now();
    
    const resizeCanvas = () => {
      if (!canvas || !gl) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    // Create a simple shader program for basic rendering
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 mouse = u_mouse / u_resolution.xy;
        
        float dist = distance(uv, mouse);
        float circle = smoothstep(0.3, 0.0, dist);
        
        vec3 color = vec3(0.5 + 0.5 * sin(u_time + uv.x * 10.0), 
                          0.5 + 0.5 * sin(u_time + uv.y * 10.0 + 2.0), 
                          0.8);
        
        gl_FragColor = vec4(color * circle, circle * 0.3);
      }
    `;

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      console.warn('Failed to compile shaders for SmokeyCursor');
      return;
    }

      const program = gl.createProgram();
    if (!program) return;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Rendering loop
    const render = () => {
      if (!gl || !program) return;
      
      resizeCanvas();
      
      const currentTime = (Date.now() - startTime) / 1000;
      
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(mouseLocation, mouseX * (window.devicePixelRatio || 1), 
                    (window.innerHeight - mouseY) * (window.devicePixelRatio || 1));
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationFrameId = requestAnimationFrame(render);
    };

    // Start rendering
    render();

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (gl && program) {
        gl.deleteProgram(program);
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
      }
    };
  }, [
    simulationResolution,
    dyeResolution,
    captureResolution,
    densityDissipation,
    velocityDissipation,
    pressure,
    pressureIterations,
    curl,
    splatRadius,
    splatForce,
    enableShading,
    colorUpdateSpeed,
    backgroundColor,
    transparent,
    disabled,
  ]);

  if (disabled) return null;

  return (
    <div className={`fixed top-0 left-0 z-50 pointer-events-none w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        id="fluid"
        className="w-screen h-screen block"
        style={{ cursor: 'none' }}
      />
    </div>
  );
}
