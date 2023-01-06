import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
    experience: Experience;
    scene: THREE.Scene;
    sunlight!: THREE.DirectionalLight;
    ambientLight!: THREE.AmbientLight;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.newLight();
        this.scene.fog = new THREE.Fog("#f7d9aa");
    }

    newLight() {
        const hemisphereLight = new THREE.HemisphereLight("#aaaaaa", "#000000", .9)  
        this.scene.add(new THREE.HemisphereLightHelper(hemisphereLight, 50));
        
        const shadowLight = new THREE.DirectionalLight("#ffffff", .9);
        shadowLight.position.set(150, 350, 350);
        shadowLight.castShadow = true;
        shadowLight.shadow.camera.left = -400;
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;
        shadowLight.shadow.mapSize.set(2048, 2048);
        
        this.scene.add(hemisphereLight);
        this.scene.add(shadowLight);
        this.scene.add(new THREE.DirectionalLightHelper(shadowLight, 50));

    }

    resize() {
    }

    update() {
    }
}