import * as THREE from "three";
import Experience from "../Experience";
import MyCamera from "../MyCamera";
import Sizes from "../utils/Sizes";
import Environment from "./Environment";
import Title from "./Title";

export default class World {
    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;
    renderer!: THREE.WebGLRenderer;
    myCamera: MyCamera;
    title: Title;
    environment: Environment;

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas!;
        this.myCamera = this.experience.camera;

        this.title = new Title();
        this.environment = new Environment();

        
        
        
        
    }

    resize() {
    }

    update() {
        if (this.title) this.title.update();
    }
}