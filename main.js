import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(1, 0, 290);
camera.lookAt(10, 0, 100);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 2);
scene.add(directionalLight);

const light = new THREE.PointLight(0xff0000, 1, 10);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.autoRotate = true;

new RGBELoader().load('/rosendal_mountain_midmorning_4k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// const geometry = new THREE.SphereGeometry(10, 20, 20);
// const material = new THREE.MeshStandardMaterial({
//   color: 'red' || 0xffffff || '#ffffff',
//   metalness: 0.5,
//   roughness: 0,
// });

// const ring = new THREE.Mesh(geometry, material);
// ring.position.y = 30;
// ring.position.x = 10;
// ring.position.z = 30;
// scene.add(ring);

const loader = new GLTFLoader();
loader.load('/vegeta-ssj-god_remade.glb', (glb) => {
  const model = glb.scene;
  model.scale.set(40.5, 40.5, 40.5);
  model.position.x = -70; // Adjust the position for the first model
  model.rotation.y = 20; // Rotate the second model to face the first one

  scene.add(model);
});

loader.load('/goku_super_saiyan.glb', (glb) => {
  const model = glb.scene;
  model.scale.set(2, 2, 2);
  model.position.x = 100; // Adjust the position for the second model
  model.rotation.y = -20; // Rotate the second model to face the first one
  scene.add(model);
});

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
