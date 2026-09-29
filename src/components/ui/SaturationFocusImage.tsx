"use client";

import { type ReactNode, useEffect, useEffectEvent, useRef } from "react";

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

type ImageSource = { src: string; width: number; height: number };

type SaturationFocusImageProps = {
  /** Used for the plain fallback (no WebGL, reduced motion). */
  src: string;
  /**
   * The same image at several sizes. The smallest one that still covers the
   * canvas is loaded as the texture, so a small phone banner doesn't decode
   * and upload a desktop-sized image. Defaults to `src`.
   */
  sources?: ImageSource[];
  alt?: string;
  /**
   * Must include a `position` value (e.g. "relative" or "absolute inset-0")
   * — the canvas anchors to this element via `absolute inset-0`, so without
   * one it'll position against a further-up ancestor instead.
   */
  className?: string;
  /**
   * While nobody is hovering, drift the colour spot around on its own (with a
   * ring showing where), so visitors see the effect before they find it. Also
   * runs on touch screens, where nothing else could drive the effect.
   */
  autoPlay?: boolean;
  /** Stop rendering entirely, e.g. while the image is on a hidden slide. */
  paused?: boolean;
  /** Called the first time a real pointer enters the image. */
  onUserHover?: () => void;
  children?: ReactNode;
};

// Auto-play waits this long after load, and after the visitor's pointer
// leaves, before taking over again.
const AUTO_START_DELAY_MS = 1400;
const AUTO_RESUME_DELAY_MS = 1800;

// Smallest source whose pixels still cover a canvas of this size when the
// image is scaled to "cover" it; the largest if none is big enough.
function pickSource(sources: ImageSource[], width: number, height: number) {
  const sorted = [...sources].sort((a, b) => a.width - b.width);
  const aspect = sorted[0].width / sorted[0].height;
  const needed = width / height >= aspect ? width : height * aspect;
  return (sorted.find((s) => s.width >= needed) ?? sorted[sorted.length - 1])
    .src;
}

export function SaturationFocusImage({
  src,
  sources,
  alt = "",
  className,
  autoPlay = false,
  paused = false,
  onUserHover,
  children,
}: SaturationFocusImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const loop = useRef<{ start: () => void; stop: () => void } | null>(null);
  const handleUserHover = useEffectEvent(() => onUserHover?.());
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

    // Without a fine, hovering pointer the effect has nothing to follow, so
    // it would only ever show its resting state (the whole image dimmed and
    // desaturated) unless auto-play drives it. Reduced-motion users don't get
    // the animated shader at all. Those cases get the plain, full-colour
    // image instead.
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || (!canHover && !autoPlay)) {
      applyFallbackBackground();
      return;
    }

    const setUp = (): (() => void) | undefined => {
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

      const textureSrc =
        sources && sources.length > 0 && canvas.width > 0 && canvas.height > 0
          ? pickSource(sources, canvas.width, canvas.height)
          : src;

      // decode() does the image decoding off the main thread, so only the GPU
      // upload below runs on it.
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = textureSrc;
      const upload = () => {
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
      image.decode().then(upload, () => {
        if (cancelled) return;
        console.error(
          "[SaturationFocusImage] failed to load texture:",
          textureSrc,
        );
        applyFallbackBackground();
      });

      const onPointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        targetMouse.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: 1 - (e.clientY - rect.top) / rect.height,
        };
      };
      let userHovering = false;
      let autoOn = false;
      let autoResumeAt = performance.now() + AUTO_START_DELAY_MS;
      // The ring stands in for a cursor, so it's only drawn beside a real
      // mouse pointer; on touch screens the colour spot drifts on its own.
      const ring = canHover ? ringRef.current : null;
      const setAutoOn = (on: boolean) => {
        autoOn = on;
        if (ring) ring.style.opacity = on ? "1" : "0";
      };

      const onPointerEnter = () => {
        userHovering = true;
        setAutoOn(false);
        targetHover.current = 1;
        handleUserHover();
      };
      const onPointerLeave = () => {
        userHovering = false;
        autoResumeAt = performance.now() + AUTO_RESUME_DELAY_MS;
        targetHover.current = 0;
      };

      // A slow Lissajous path around the middle of the image.
      const drive = (now: number) => {
        if (!autoPlay || userHovering) return;
        if (now < autoResumeAt) {
          if (autoOn) {
            setAutoOn(false);
            targetHover.current = 0;
          }
          return;
        }
        const t = now / 1000;
        const px = 0.5 + 0.3 * Math.sin(t * 0.55);
        const py = 0.5 + 0.26 * Math.sin(t * 0.83 + 1.2);
        if (!autoOn) setAutoOn(true);
        targetMouse.current = { x: px, y: 1 - py };
        targetHover.current = 1;
        if (ring) {
          ring.style.transform = `translate(${px * container.clientWidth}px, ${py * container.clientHeight}px)`;
        }
      };
      // Touch screens only get auto-play: a tap, or a scroll that starts on the
      // image, shouldn't interrupt it.
      if (canHover) {
        container.addEventListener("pointermove", onPointerMove, {
          passive: true,
        });
        container.addEventListener("pointerenter", onPointerEnter, {
          passive: true,
        });
        container.addEventListener("pointerleave", onPointerLeave, {
          passive: true,
        });
      }

      let rafId = 0;
      let running = false;
      let shown = false;
      let inView = true;

      const render = (now: number) => {
        if (!running || contextLost) return;
        drive(now);

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
          if (!shown) {
            shown = true;
            canvas.style.opacity = "1";
          }
        }
        rafId = requestAnimationFrame(render);
      };

      // Only run the RAF loop while the hero is on screen and the tab is
      // visible — otherwise it burns CPU/battery rendering nothing anyone sees.
      const stopLoop = () => {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
      };
      const startLoop = () => {
        if (
          running ||
          contextLost ||
          cancelled ||
          !inView ||
          document.hidden ||
          pausedRef.current
        ) {
          return;
        }
        running = true;
        rafId = requestAnimationFrame(render);
      };

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (inView) startLoop();
          else stopLoop();
        },
        { threshold: 0 },
      );
      visibilityObserver.observe(container);

      const onVisibilityChange = () => {
        if (document.hidden) stopLoop();
        else startLoop();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      loop.current = {
        start: () => {
          autoResumeAt = performance.now() + AUTO_START_DELAY_MS;
          startLoop();
        },
        stop: () => {
          stopLoop();
          setAutoOn(false);
          targetHover.current = 0;
        },
      };
      startLoop();

      return () => {
        cancelled = true;
        loop.current = null;
        stopLoop();
        visibilityObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
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
    };

    // Start once the page has loaded and the browser is idle, so compiling
    // the shaders and uploading the texture don't compete with hydration and
    // the first paint. (Safari has no requestIdleCallback.)
    let teardown: (() => void) | undefined;
    let disposed = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    const run = () => {
      if (!disposed) teardown = setUp();
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(run, { timeout: 2000 });
      } else {
        timeoutHandle = window.setTimeout(run, 200);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener("load", schedule);
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      teardown?.();
    };
  }, [src, sources, autoPlay]);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) loop.current?.stop();
    else loop.current?.start();
  }, [paused]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        aria-hidden={alt ? undefined : true}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700"
      />
      {autoPlay && (
        <div
          ref={ringRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-4 -mt-13.75 -ml-13.75 size-27.5 rounded-full border-[1.5px] border-white/75 bg-[radial-gradient(circle,rgba(255,255,255,.18),rgba(255,255,255,0)_70%)] opacity-0 shadow-[0_0_0_8px_rgba(255,255,255,.08)] transition-opacity duration-600"
        />
      )}
      {children && (
        <div style={{ position: "relative" }} className="h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
}
