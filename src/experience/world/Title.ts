import * as THREE from "three";
import Experience from "../Experience";


export default class Title {
    experience: Experience;
    scene: THREE.Scene;
    renderer!: THREE.WebGLRenderer;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        const geometry = new THREE.BoxGeometry(1, 1, 1),
            material = new THREE.MeshStandardMaterial({ color: "#f22000" }),
            cube = new THREE.Mesh(geometry, material);
        cube.position.y = 0.5;
        cube.rotateY(180)
        this.scene.add(cube);
    }

    resize() {
    }

    update() {
    }
}