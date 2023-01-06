import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Experience from "../Experience";
import Resources from "../utils/Resources";


export default class Airplane {
    experience: Experience;
    scene: THREE.Scene;
    renderer!: THREE.WebGLRenderer;
    resources: Resources;  
    airplane: GLTF["scene"];  
    gltf: GLTF;
    mixer!: THREE.AnimationMixer
    
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;  
        this.airplane = this.resources.items["airplane"].scene;  
        this.gltf = this.resources.items["airplane"];  
        console.log(this.gltf);

        this.setModel();  
        this.setAnimation();
    }

    setModel() {
        this.airplane.position.set( 0, 100, 0 );
        this.airplane.rotateY(-Math.PI / 2);
        this.airplane.scale.set(5,5,5);
        
        this.scene.add(this.airplane);  
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.airplane);  
        const plan = this.mixer.clipAction(this.gltf.animations[0]);
        const propeller = this.mixer.clipAction(this.gltf.animations[1]);
        propeller.play();  
        plan.play();
    }

    resize() {
    }

    update() {
        this.mixer.update(this.experience.time.delta * 0.0009);
    }
}