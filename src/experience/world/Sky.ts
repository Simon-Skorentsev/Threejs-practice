import * as THREE from "three";
import Experience from "../Experience";
import { colors } from "../utils/colors";

export default class Sky {
    experience: Experience;
    scene: THREE.Scene;
    renderer!: THREE.WebGLRenderer;
    sky: THREE.Object3D;
    nClouds: number;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sky = new THREE.Object3D();
        this.nClouds = 20;
        
        const stepAngle = Math.PI * 2 / this.nClouds;  

        for (let i = 0; i < this.nClouds; i++) {
            const cloud = this.createCloud();
            
            const angle = stepAngle * i;
            const height = 750 + Math.random() * 200;

            cloud.position.y = Math.sin(angle) * height;
            cloud.position.x = Math.cos(angle) * height;
            cloud.rotation.z = angle + Math.PI / 2;  
            
            cloud.position.z = -400 - Math.random() * 400;
            
            const s = 1 + Math.random() * 2;
            cloud.scale.set(s, s, s);

            
            this.sky.add(cloud);
        }

        this.sky.position.y = -600;  
        this.scene.add(this.sky);
    }

    createCloud() {
        const cloud = new THREE.Object3D();
        const geom = new THREE.BoxGeometry(20, 20, 20);
        const mat = new THREE.MeshPhongMaterial({
            color: colors.white,
        });
        const nBlocks = 3 + Math.floor(Math.random() * 3);  
        
        for (let i = 0; i < nBlocks; i++) {
            const block = new THREE.Mesh(geom, mat);
            
            block.position.x = i * 15;
            block.position.y = Math.random() * 10;
            block.position.z = Math.random() * 10;
            block.rotation.z = Math.random() * Math.PI * 2;
            block.rotation.y = Math.random() * Math.PI * 2;

            const s = .1 + Math.random() * .9;
            block.scale.set(s, s, s);
            
            block.castShadow = true;
            block.receiveShadow = true;
            
            cloud.add(block);
        }

        return cloud;
    }

    resize() {
    }

    update() {
        this.sky.rotateZ(.005);
    }
}