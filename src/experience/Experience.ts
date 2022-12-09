import * as THREE from "three";
import MyCamera from "./MyCamera";
import MyRenderer from "./MyRenderer";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import World from "./world/World";

export default class Experience {
    canvas;
    static instance: Experience;
    sizes!: Sizes  
    scene!: THREE.Scene;
    camera!: MyCamera;
    MyRenderer!: MyRenderer;
    time!: Time;
    world!: World;

    constructor(canvas?: HTMLCanvasElement) {  
        
        if (Experience.instance) { 
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.camera = new MyCamera();
        this.MyRenderer = new MyRenderer();
        this.time = new Time ();
        this.world = new World();  
        
        this.time.on("update", () => {
            this.update();
        });

        this.sizes.on("resize", () => {
            this.resize();
        });
    }

    update() {
        this.camera.update();
        this.MyRenderer.update();
        this.world.update();
    }

    resize() {
        this.camera.resize();
        this.MyRenderer.resize();
        this.world.resize();
    }
}