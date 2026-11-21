import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface HeroScene3DProps {
  mode: 'studio' | 'sculpt';
  paused: boolean;
  pointerRef: React.RefObject<{ x: number; y: number }>;
}

type IconKind =
  | 'meta'
  | 'seo'
  | 'react'
  | 'code'
  | 'video'
  | 'instagram'
  | 'facebook'
  | 'youtube';

interface OrbitIconSpec {
  id: IconKind;
  accent: number;
  accentCss: string;
  orbit: number; // 0 = inner, 1 = mid, 2 = outer
  radius: number;
  phase: number;
  speed: number;
  yOffset: number;
}

const ORBIT_ICONS: OrbitIconSpec[] = [
  // Orbit 0 (Inner planetary track)
  { id: 'meta', accent: 0x0ea5e9, accentCss: '#0ea5e9', orbit: 0, radius: 2.35, phase: 0.2, speed: 0.36, yOffset: 0.0 },
  { id: 'seo', accent: 0x22c55e, accentCss: '#22c55e', orbit: 0, radius: 2.35, phase: 2.3, speed: 0.36, yOffset: 0.0 },
  { id: 'react', accent: 0x38bdf8, accentCss: '#38bdf8', orbit: 0, radius: 2.35, phase: 4.4, speed: 0.36, yOffset: 0.0 },

  // Orbit 1 (Middle tilted track — opposite planetary direction)
  { id: 'code', accent: 0xff2a2a, accentCss: '#ff2a2a', orbit: 1, radius: 2.85, phase: 0.8, speed: -0.28, yOffset: 0.0 },
  { id: 'video', accent: 0xf59e0b, accentCss: '#f59e0b', orbit: 1, radius: 2.85, phase: 2.9, speed: -0.28, yOffset: 0.0 },
  { id: 'instagram', accent: 0xec4899, accentCss: '#ec4899', orbit: 1, radius: 2.85, phase: 5.0, speed: -0.28, yOffset: 0.0 },

  // Orbit 2 (Outer wide planetary ring)
  { id: 'facebook', accent: 0x3b82f6, accentCss: '#3b82f6', orbit: 2, radius: 3.35, phase: 1.4, speed: 0.22, yOffset: 0.0 },
  { id: 'youtube', accent: 0xff2a2a, accentCss: '#ff2a2a', orbit: 2, radius: 3.35, phase: 4.55, speed: 0.22, yOffset: 0.0 },
];

// Reusable module-scoped helpers (zero GC inside animation loop)
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();
const _worldPos = new THREE.Vector3();

/**
 * Generates crisp 512x512 procedural premium emblem CanvasTextures
 * for each skill & social media icon medallion (zero external 404 assets).
 */
function createIconMedallionTexture(
  kind: IconKind,
  accentCss: string,
  maxAnisotropy: number,
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;

  // Dark brushed obsidian circular surface with subtle radial studio depth
  const bgGrad = ctx.createRadialGradient(cx - 50, cy - 60, 20, cx, cy, size * 0.52);
  bgGrad.addColorStop(0, '#22242c');
  bgGrad.addColorStop(0.65, '#111218');
  bgGrad.addColorStop(1, '#08080b');
  ctx.fillStyle = bgGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.49, 0, Math.PI * 2);
  ctx.fill();

  // Subtle colored ambient sheen inside disc
  const glowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 195);
  glowGrad.addColorStop(0, `${accentCss}38`);
  glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // Inner metallic hairline border
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.44, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (kind) {
    case 'meta': {
      // Sleek Meta Infinity Emblem
      const grad = ctx.createLinearGradient(-120, -40, 120, 40);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, '#0081fb');
      grad.addColorStop(1, '#00c6ff');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(45, -88, 138, -88, 138, 0);
      ctx.bezierCurveTo(138, 88, 45, 88, 0, 0);
      ctx.bezierCurveTo(-45, -88, -138, -88, -138, 0);
      ctx.bezierCurveTo(-138, 88, -45, 88, 0, 0);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.82)';
      ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('META ADS', 0, 148);
      break;
    }

    case 'seo': {
      // Google-inspired crisp G + Search SEO Growth Ring
      const r = 82;
      ctx.lineWidth = 28;
      // Red top arc
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, -18, r, -Math.PI * 0.82, -Math.PI * 0.16);
      ctx.stroke();
      // Yellow left arc
      ctx.strokeStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, -18, r, Math.PI * 0.72, Math.PI * 1.18);
      ctx.stroke();
      // Green bottom arc
      ctx.strokeStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(0, -18, r, Math.PI * 0.18, Math.PI * 0.72);
      ctx.stroke();
      // Blue right arc + crossbar
      ctx.strokeStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(0, -18, r, -Math.PI * 0.05, Math.PI * 0.22);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(4, -18);
      ctx.lineTo(84, -18);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      ctx.font = '700 38px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SEO', 0, 148);
      break;
    }

    case 'react': {
      // Crisp React Atom Emblem
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 14;
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(0, -16);
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.ellipse(0, 0, 126, 48, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, -16, 22, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.86)';
      ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('REACT', 0, 148);
      break;
    }

    case 'code': {
      // Developer </> Brackets
      ctx.strokeStyle = '#ff2a2a';
      ctx.lineWidth = 24;
      // Left <
      ctx.beginPath();
      ctx.moveTo(-66, -74);
      ctx.lineTo(-124, -16);
      ctx.lineTo(-66, 42);
      ctx.stroke();
      // Right >
      ctx.beginPath();
      ctx.moveTo(66, -74);
      ctx.lineTo(124, -16);
      ctx.lineTo(66, 42);
      ctx.stroke();
      // Slash /
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(22, -88);
      ctx.lineTo(-22, 56);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.86)';
      ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('WEB DEV', 0, 148);
      break;
    }

    case 'video': {
      // Cinema Video Editing Frame + Play Triangle
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.roundRect(-112, -92, 224, 152, 26);
      ctx.stroke();

      // Top film strip notches
      ctx.fillStyle = '#f59e0b';
      for (let x = -78; x <= 78; x += 52) {
        ctx.fillRect(x - 14, -92, 28, 22);
      }

      // Play triangle inside
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-26, -42);
      ctx.lineTo(44, -8);
      ctx.lineTo(-26, 26);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.86)';
      ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VIDEO EDIT', 0, 148);
      break;
    }

    case 'instagram': {
      // Iconic Instagram Gradient Camera Outline
      const igGrad = ctx.createLinearGradient(-95, 95, 95, -95);
      igGrad.addColorStop(0, '#facc15');
      igGrad.addColorStop(0.5, '#ec4899');
      igGrad.addColorStop(1, '#8b5cf6');
      ctx.strokeStyle = igGrad;
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.roundRect(-92, -104, 184, 184, 48);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -12, 46, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(54, -66, 13, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.84)';
      ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('INSTAGRAM', 0, 148);
      break;
    }

    case 'facebook': {
      // Crisp Facebook Circle + f glyph
      ctx.fillStyle = '#1877f2';
      ctx.beginPath();
      ctx.arc(0, -16, 98, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 175px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('f', 6, 4);

      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = 'rgba(255,255,255,0.84)';
      ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('FACEBOOK', 0, 148);
      break;
    }

    case 'youtube': {
      // Crisp Crimson Video / Reels Play Button
      ctx.fillStyle = '#ff2a2a';
      ctx.beginPath();
      ctx.roundRect(-114, -86, 228, 148, 36);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-28, -48);
      ctx.lineTo(48, -12);
      ctx.lineTo(-28, 24);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.86)';
      ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('REELS', 0, 148);
      break;
    }
  }

  ctx.restore();

  // Subtle top glass specular arc
  const specGrad = ctx.createLinearGradient(0, 20, 0, 210);
  specGrad.addColorStop(0, 'rgba(255,255,255,0.18)');
  specGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = specGrad;
  ctx.beginPath();
  ctx.ellipse(cx, 120, 175, 85, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

export default function HeroScene3D({ mode, paused, pointerRef }: HeroScene3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<'studio' | 'sculpt'>(mode);
  const pausedRef = useRef<boolean>(paused);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param) ?? '');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.045);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 80);
    camera.position.set(0, 0.15, 8.2);

    const isInitialMobile = width < 768;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, isInitialMobile ? 1.5 : 2),
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // Balanced studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xf8fafc, 0x111111, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(4.5, 5.5, 6.0);
    scene.add(keyLight);

    const crimsonRim = new THREE.PointLight(0xff2a2a, 22, 22, 1.45);
    crimsonRim.position.set(-2.8, 1.8, 2.6);
    scene.add(crimsonRim);

    const coolRim = new THREE.PointLight(0x38bdf8, 12, 20, 1.5);
    coolRim.position.set(4.2, -1.6, 2.5);
    scene.add(coolRim);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };
    const trackMat = <T extends THREE.Material>(m: T): T => {
      materials.push(m);
      return m;
    };
    const trackTex = <T extends THREE.Texture>(t: T): T => {
      textures.push(t);
      return t;
    };

    const brushedSteelMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xa1a1aa,
        metalness: 0.92,
        roughness: 0.2,
        clearcoat: 0.45,
        clearcoatRoughness: 0.2,
      }),
    );

    const matteObsidianMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x1c1c20,
        metalness: 0.4,
        roughness: 0.58,
      }),
    );

    const crimsonTrackMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xff2a2a,
        emissive: 0xff2a2a,
        emissiveIntensity: 1.45,
        metalness: 0.2,
        roughness: 0.25,
      }),
    );

    const silverTrackMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        emissive: 0x52525b,
        emissiveIntensity: 0.65,
        metalness: 0.45,
        roughness: 0.3,
      }),
    );

    // Solar-system planetary root positioned behind Toufiq's transparent portrait
    const planetaryRoot = new THREE.Group();
    planetaryRoot.position.set(1.1, 0.05, 0);
    scene.add(planetaryRoot);

    // 3 Inclined Planetary Orbit Planes
    const orbitGroups: THREE.Group[] = [];
    const orbitSpecs = [
      { radius: 2.35, rotX: 1.18, rotY: 0.22, rotZ: -0.18, mat: crimsonTrackMat, tube: 0.016 },
      { radius: 2.85, rotX: 0.92, rotY: -0.34, rotZ: 0.26, mat: brushedSteelMat, tube: 0.022 },
      { radius: 3.35, rotX: 1.32, rotY: 0.14, rotZ: 0.12, mat: silverTrackMat, tube: 0.013 },
    ];

    for (const spec of orbitSpecs) {
      const grp = new THREE.Group();
      grp.rotation.set(spec.rotX, spec.rotY, spec.rotZ);
      planetaryRoot.add(grp);

      // Visible planetary orbital path ring (in XY plane of group, rotated with group)
      const ringMesh = new THREE.Mesh(
        trackGeo(new THREE.TorusGeometry(spec.radius, spec.tube, 14, 110)),
        spec.mat,
      );
      grp.add(ringMesh);

      // Secondary subtle inner machined rim on middle orbit
      if (spec.radius === 2.85) {
        const innerFilament = new THREE.Mesh(
          trackGeo(new THREE.TorusGeometry(spec.radius - 0.09, 0.01, 10, 110)),
          crimsonTrackMat,
        );
        grp.add(innerFilament);
      }

      orbitGroups.push(grp);
    }

    // Shared 3D medallion geometries (multi-part beveled metallic planets)
    const coinBodyGeo = trackGeo(new THREE.CylinderGeometry(0.41, 0.41, 0.09, 36));
    coinBodyGeo.rotateX(Math.PI / 2); // Align cylinder face along +Z / -Z

    const coinBezelGeo = trackGeo(new THREE.TorusGeometry(0.42, 0.032, 14, 40));
    const coinFaceGeo = trackGeo(new THREE.CircleGeometry(0.385, 36));

    // Build all 8 orbiting 3D Skill & Social Media Icon Medallions
    const orbitingPlanets: {
      group: THREE.Group;
      spec: OrbitIconSpec;
    }[] = [];

    for (const spec of ORBIT_ICONS) {
      const planetGroup = new THREE.Group();

      const accentRingMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: spec.accent,
          emissive: spec.accent,
          emissiveIntensity: 1.15,
          metalness: 0.35,
          roughness: 0.25,
        }),
      );

      const tex = trackTex(createIconMedallionTexture(spec.id, spec.accentCss, maxAnisotropy));
      const faceMat = trackMat(
        new THREE.MeshStandardMaterial({
          map: tex,
          metalness: 0.25,
          roughness: 0.28,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1,
        }),
      );

      // Part 1: Brushed dark metallic medallion core
      const coreMesh = new THREE.Mesh(coinBodyGeo, matteObsidianMat);

      // Part 2: Glowing colored planetary rim ring
      const bezelMesh = new THREE.Mesh(coinBezelGeo, accentRingMat);

      // Part 3: Outer brushed titanium equatorial ring
      const outerRimMesh = new THREE.Mesh(
        trackGeo(new THREE.TorusGeometry(0.47, 0.014, 10, 36)),
        brushedSteelMat,
      );

      // Part 4 & 5: Front & Back high-DPI icon faces
      const frontFace = new THREE.Mesh(coinFaceGeo, faceMat);
      frontFace.position.z = 0.048;

      const backFace = new THREE.Mesh(coinFaceGeo, faceMat);
      backFace.position.z = -0.048;
      backFace.rotation.y = Math.PI;

      planetGroup.add(coreMesh, bezelMesh, outerRimMesh, frontFace, backFace);

      // Place inside its corresponding planetary orbit plane
      const parentOrbit = orbitGroups[spec.orbit];
      parentOrbit.add(planetGroup);
      orbitingPlanets.push({ group: planetGroup, spec });
    }

    // InstancedMesh ambient cosmic star/data dust around the solar system
    const instanceCount = 88;
    const dustGeo = trackGeo(new THREE.OctahedronGeometry(0.032, 0));
    const dustMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.65,
        roughness: 0.32,
      }),
    );
    const dustMesh = new THREE.InstancedMesh(dustGeo, dustMat, instanceCount);
    dustMesh.frustumCulled = false;

    for (let i = 0; i < instanceCount; i++) {
      const theta = i * 2.3999632;
      const r = 2.6 + ((i * 37) % 100) / 30;
      const y = (((i * 53) % 100) / 100 - 0.5) * 6.0;
      const z = -1.4 + (((i * 29) % 100) / 100 - 0.5) * 3.4;

      _dummy.position.set(Math.cos(theta) * r, y, Math.sin(theta) * 0.95 + z);
      _dummy.rotation.set(i * 0.5, i * 0.8, 0);
      const scale = 0.55 + ((i * 19) % 100) / 115;
      _dummy.scale.setScalar(scale);
      _dummy.updateMatrix();
      dustMesh.setMatrixAt(i, _dummy.matrix);

      if (i % 4 === 0) _color.setHex(0xff2a2a);
      else if (i % 4 === 1) _color.setHex(0x38bdf8);
      else if (i % 4 === 2) _color.setHex(0xe4e4e7);
      else _color.setHex(0x52525b);
      dustMesh.setColorAt(i, _color);
    }
    dustMesh.instanceMatrix.needsUpdate = true;
    if (dustMesh.instanceColor) dustMesh.instanceColor.needsUpdate = true;
    dustMesh.computeBoundingSphere();
    scene.add(dustMesh);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const aspect = w / Math.max(h, 1);
      const isMobile = w < 768;

      camera.fov = isMobile ? 46 : 44;
      camera.aspect = aspect;
      camera.position.set(0, 0.15, isMobile ? 9.1 : 8.2);
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2),
      );
      renderer.setSize(w, h);

      if (isMobile) {
        // Compute exact visible frustum half-width so all 8 orbiting 3D icons stay inside narrow Android screens
        const vFovRad = THREE.MathUtils.degToRad(camera.fov);
        const visibleHeight = 2 * camera.position.z * Math.tan(vFovRad / 2);
        const visibleHalfWidth = (visibleHeight * aspect) / 2;
        const fitScale = THREE.MathUtils.clamp((visibleHalfWidth * 0.94) / 3.7, 0.44, 0.76);

        planetaryRoot.position.set(0, 1.18, 0);
        planetaryRoot.scale.setScalar(fitScale);
      } else {
        planetaryRoot.position.set(w >= 1024 ? 1.45 : 1.05, 0.05, 0);
        planetaryRoot.scale.setScalar(1.0);
      }

      // Slightly enlarge 3D icon medallions on mobile so emblems stay crisp & readable
      const iconScale = isMobile ? 1.24 : 1.0;
      for (let i = 0; i < orbitingPlanets.length; i++) {
        orbitingPlanets[i].group.scale.setScalar(iconScale);
      }
    };
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause WebGL rendering when Hero scrolls out of view (keeps Android scrolling 60fps & saves battery)
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 },
    );
    visibilityObserver.observe(container);

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();
    let elapsed = 0;
    let currentRotX = 0.1;
    let currentRotY = -0.08;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const isPaused = pausedRef.current || prefersReducedMotion;

      if (isVisible) {
        if (!isPaused) {
          elapsed += delta;
          dustMesh.rotation.y = elapsed * 0.05;
        }

        // Smooth exponential damping toward pointer tilt
        const ptr = pointerRef.current ?? { x: 0, y: 0 };
        const targetRotY = ptr.x * 0.22 - 0.06;
        const targetRotX = ptr.y * 0.14 + 0.08;

        currentRotY = THREE.MathUtils.damp(currentRotY, targetRotY, 4.2, delta);
        currentRotX = THREE.MathUtils.damp(currentRotX, targetRotX, 4.2, delta);

        planetaryRoot.rotation.y = currentRotY;
        planetaryRoot.rotation.x = currentRotX;

        // Update each planetary 3D icon position along its circular orbit
        for (let i = 0; i < orbitingPlanets.length; i++) {
          const { group, spec } = orbitingPlanets[i];
          const angle = spec.phase + elapsed * spec.speed;
          const x = Math.cos(angle) * spec.radius;
          const y = Math.sin(angle) * spec.radius;
          group.position.set(x, y, spec.yOffset);

          // Keep each 3D icon medallion smoothly oriented toward the viewer with a gentle 3D coin wobble
          group.getWorldPosition(_worldPos);
          group.lookAt(camera.position);
          group.rotateY(Math.sin(elapsed * 1.15 + spec.phase) * 0.35);
        }

        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      envTarget.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [pointerRef]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
