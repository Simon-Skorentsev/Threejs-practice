import * as THREE from "three";
import Experience from "../Experience";
import { colors } from "../utils/colors";

export default class Sea {
    experience: Experience;
    scene: THREE.Scene;
    sea: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshPhongMaterial>;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        const geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
        const material = new THREE.MeshPhongMaterial({
            color: colors.blue,
            transparent: true,  
            opacity: .6,  
            flatShading: true,  
        });
        this.sea = new THREE.Mesh(geom, material);
        this.sea.receiveShadow = true;
        this.sea.rotateX(Math.PI / 2);  
        this.sea.position.y = -600;  
        this.scene.add(this.sea);
    }

    resize() {
    }

    update() {
        this.sea.rotateY(.005);
    }
}