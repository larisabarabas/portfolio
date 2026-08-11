"use client";

import { type ReactNode, useEffect, useRef } from "react";

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision mediump float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_hover;
uniform sampler2D u_texture;
uniform float u_imageAspect;

vec2 coverUv(vec2 uv) {
  float containerAspect = u_resolution.x / u_resolution.y;
  float imgAspect = u_imageAspect > 0.0 ? u_imageAspect : containerAspect;
  vec2 corrected = uv;
  if (imgAspect > containerAspect) {
    float scale = containerAspect / imgAspect;
    corrected.x = uv.x * scale + (1.0 - scale) * 0.5;
  } else {
    float scale = imgAspect / containerAspect;
    corrected.y = uv.y * scale + (1.0 - scale) * 0.5;
  }
  return clamp(corrected, vec2(0.001), vec2(0.999));
}

float luminance(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}
vec3 adjustSaturation(vec3 c, float amount) {
  return mix(vec3(luminance(c)), c, amount);
}

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 auv = v_uv;
  auv.x *= aspect;
  vec2 amouse = u_mouse;
  amouse.x *= aspect;

  float dist = distance(auv, amouse);
  float softness = 0.58;
  float zoomAmt = 0.02;
  float focusMask = smoothstep(softness, 0.0, dist) * u_hover;
  float outerMask = 1.0 - focusMask;

  vec2 zoomUv = mix(v_uv, u_mouse + (v_uv - u_mouse) * (1.0 - zoomAmt), focusMask);
  vec2 uv = coverUv(zoomUv);

  vec3 color = texture2D(u_texture, uv).rgb;
  vec3 gray = vec3(luminance(color));

  vec3 outerColor = mix(color, gray, 0.82 * outerMask) * 0.82;
  vec3 innerColor = adjustSaturation(color, 1.9) * 1.12;

  gl_FragColor = vec4(mix(outerColor, innerColor, focusMask), 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "[SaturationFocusImage] shader compile error:",
      gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

type SaturationFocusImageProps = {
  src: string;
  alt?: string;
  /**
   * Must include a `position` value (e.g. "relative" or "absolute inset-0")
   * — the canvas anchors to this element via `absolute inset-0`, so without
   * one it'll position against a further-up ancestor instead.
   */
  className?: string;
  children?: ReactNode;
};

export function SaturationFocusImage({
  src,
  alt = "",
  className,
  children,
}: SaturationFocusImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetHover = useRef(0);
  const hover = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const applyFallbackBackground = () => {
      container.style.backgroundImage = `url(${src})`;
      container.style.backgroundSize = "cover";
      container.style.backgroundPosition = "center";
    };

    const gl = canvas.getContext("webgl");
    if (!gl) {
      applyFallbackBackground();
      return;
    }

    const vertexShader = compileShader(
      gl,
      gl.VERTEX_SHADER,
      VERTEX_SHADER_SOURCE,
    );
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER_SOURCE,
    );
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        "[SaturationFocusImage] program link error:",
        gl.getProgramInfoLog(program),
      );
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }
    // biome-ignore lint/correctness/useHookAtTopLevel: gl.useProgram is the WebGL API method, not a React hook
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 255]),
    );

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uHover = gl.getUniformLocation(program, "u_hover");
    const uTexture = gl.getUniformLocation(program, "u_texture");
    const uImageAspect = gl.getUniformLocation(program, "u_imageAspect");

    let imageAspect = 0;
    let textureReady = false;
    let cancelled = false;
    let contextLost = false;

    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      applyFallbackBackground();
    };
    canvas.addEventListener("webglcontextlost", onContextLost, false);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      if (cancelled) return;
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      imageAspect = image.naturalWidth / image.naturalHeight;
      textureReady = true;
    };
    image.onerror = () => {
      if (cancelled) return;
      console.error("[SaturationFocusImage] failed to load texture:", src);
      applyFallbackBackground();
    };
    image.src = src;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const width = Math.round(container.clientWidth * dpr);
      const height = Math.round(container.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      };
    };
    const onPointerEnter = () => {
      targetHover.current = 1;
    };
    const onPointerLeave = () => {
      targetHover.current = 0;
    };
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerenter", onPointerEnter, {
      passive: true,
    });
    container.addEventListener("pointerleave", onPointerLeave, {
      passive: true,
    });

    let rafId: number;
    const render = () => {
      if (contextLost) return;

      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.08;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.08;
      hover.current += (targetHover.current - hover.current) * 0.07;

      if (textureReady) {
        // biome-ignore lint/correctness/useHookAtTopLevel: gl.useProgram is the WebGL API method, not a React hook
        gl.useProgram(program);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
        gl.uniform1f(uHover, hover.current);
        gl.uniform1f(uImageAspect, imageAspect);
        gl.uniform1i(uTexture, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteTexture(texture);
    };
  }, [src]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        aria-hidden={alt ? undefined : true}
        className="absolute inset-0 h-full w-full"
      />
      {children && (
        <div style={{ position: "relative" }} className="h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
}
