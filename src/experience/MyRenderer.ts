import Experience from "./Experience";
import Sizes from "./utils/Sizes";
import * as THREE from "three";
import MyCamera from "./MyCamera";

export default class MyRenderer {
    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;
    renderer!: THREE.WebGLRenderer;
    myCamera: MyCamera;

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas!;
        this.myCamera = this.experience.camera;

        this.setRenderer();

    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,  
        });

        
        this.renderer.physicallyCorrectLights = true;  
        this.renderer.outputEncoding = THREE.sRGBEncoding;  
        this.renderer.toneMapping = THREE.CineonToneMapping;  
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;  
        this.renderer.shadowMap.type = THREE.PCFShadowMap;  
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.renderer.render(this.scene, this.myCamera.perspectiveCamera);
    }
}