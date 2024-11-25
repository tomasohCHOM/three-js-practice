import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f0f0f0");

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Objects
const cubeGeometry = new THREE.DodecahedronGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: "#468585",
  emissive: "#468585",
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

const planeGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: "#b4b4b3",
  emissive: "#b4b4b3",
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -1.5;

scene.add(cube);
scene.add(plane);

// Light
const light = new THREE.SpotLight("#006769", 100);
light.position.set(1, 1, 1);
scene.add(light);

// Render
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  plane.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

// Window Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
