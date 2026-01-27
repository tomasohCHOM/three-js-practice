import "./style.css";
import * as THREE from "three";
// import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
// import { FirstPersonControls } from "three/examples/jsm/Addons.js";

class FirstPersonDemo {
  constructor() {
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color("#fff");

    // Camera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1.0;
    const far = 100;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.z = 5;

    // Light
    let light = new THREE.AmbientLight(0xffffff, 10);
    this._scene.add(light);
    light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(1, 1, 1);

    this._scene.add(light);

    // Cube
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: "#468585" });
    this._cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this._scene.add(this._cube);

    document.body.appendChild(this._renderer.domElement);
    window.addEventListener("resize", () => this._onWindowResize());

    this._RAF();
  }

  _onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._cube.rotation.x += 0.01;
      this._cube.rotation.y += 0.01;
      this._renderer.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new FirstPersonDemo();
});
