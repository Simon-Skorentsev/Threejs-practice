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
            alpha: true,  
        });
        
        this.renderer.physicallyCorrectLights = true;  
        this.renderer.outputEncoding = THREE.LinearEncoding;  
        this.renderer.toneMapping = THREE.CineonToneMapping;  
        this.renderer.toneMapping = THREE.LinearToneMapping;
        this.renderer.toneMappingExposure = 2.6;
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
        this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);  
        this.renderer.render(this.scene, this.myCamera.perspectiveCamera);
        
        const x = this.sizes.width - this.sizes.width / 3,
            y = this.sizes.height - this.sizes.height / 3,
            width = this.sizes.width / 3,
            height = this. sizes.height / 3;
        this.renderer.setScissorTest(true);  
        this.renderer.setViewport(x, y, width, height);
        this.renderer.setScissor(x, y, width, height);
        
        this.renderer.render(this.scene, this.myCamera.orthographicCamera);
        this.renderer.setScissorTest(false);
    }
}
