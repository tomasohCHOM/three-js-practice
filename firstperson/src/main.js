import "./style.css";
import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls";

class FirstPersonDemo {
  constructor() {
    this.renderer_ = new THREE.WebGLRenderer();
    this.renderer_.setPixelRatio(window.devicePixelRatio);
    this.renderer_.setSize(window.innerWidth, window.innerHeight);

    // Scene
    this.scene_ = new THREE.Scene();
    this.scene_.background = new THREE.Color("#a3f3ff");

    // Camera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1.0;
    const far = 100;
    this.camera_ = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera_.position.z = 5;

    // Light
    let light = new THREE.AmbientLight(0xffffff, 10);
    this.scene_.add(light);
    light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(1, 1, 1);

    this.scene_.add(light);

    // Cube
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: "#468585" });
    this.cube_ = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.scene_.add(this.cube_);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: "#aaf2ca" });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y -= 2;
    this.scene_.add(floor);

    document.body.appendChild(this.renderer_.domElement);
    window.addEventListener("resize", () => this.onWindowResize_());

    this.RAF_();

    this.controls_ = new PointerLockControls(
      this.camera_,
      this.renderer_.domElement,
    );

    this.scene_.add(this.controls_.object);

    this.keys_ = {};
    this.prevTime_ = performance.now();
    this.velocity_ = new THREE.Vector3();
    this.direction_ = new THREE.Vector3();

    document.addEventListener("keydown", (e) => this.onKeyDown_(e));
    document.addEventListener("keyup", (e) => this.onKeyUp_(e));
  }

  onKeyDown_(e) {
    this.keys_[e.code] = 1;
    this.controls_.lock();
    console.log("Velocity:", this.velocity_);
    console.log("Direction:", this.direction_);
    console.log(this.keys_);
  }

  onKeyUp_(e) {
    this.keys_[e.code] = 0;
  }

  onWindowResize_() {
    this.camera_.aspect = window.innerWidth / window.innerHeight;
    this.camera_.updateProjectionMatrix();
    this.renderer_.setSize(window.innerWidth, window.innerHeight);
  }

  RAF_() {
    requestAnimationFrame((time) => {
      this.cube_.rotation.x += 0.01;
      this.cube_.rotation.y += 0.01;

      const delta = (time - this.prevTime_) / 1000;

      this.velocity_.x -= this.velocity_.x * 10.0 * delta;
      this.velocity_.z -= this.velocity_.z * 10.0 * delta;

      const forward = (this.keys_["KeyW"] || 0) - (this.keys_["KeyS"] || 0);
      const right = (this.keys_["KeyD"] || 0) - (this.keys_["KeyA"] || 0);

      this.direction_.set(right, 0, forward);

      if (this.direction_.lengthSq() > 0) {
        this.direction_.normalize();
      }

      const speed = 100.0;
      this.velocity_.x -= this.direction_.x * speed * delta;
      this.velocity_.z -= this.direction_.z * speed * delta;

      this.controls_.moveRight(-this.velocity_.x * delta);
      this.controls_.moveForward(-this.velocity_.z * delta);

      this.renderer_.render(this.scene_, this.camera_);

      this.prevTime_ = time;
      this.RAF_();
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new FirstPersonDemo();
});
