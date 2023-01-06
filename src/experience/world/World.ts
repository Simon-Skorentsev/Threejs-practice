import * as THREE from "three";
import Experience from "../Experience";
import MyCamera from "../MyCamera";
import Resources from "../utils/Resources";
import Sizes from "../utils/Sizes";
import Airplane from "./Airplane";
import Environment from "./Environment";
import Sea from "./Sea";
import Sky from "./Sky";
import Title from "./Title";

export default class World {
    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;
    renderer!: THREE.WebGLRenderer;
    myCamera: MyCamera;
    title!: Title;
    environment!: Environment;
    resources: Resources;
    sea!: Sea;
    sky!: Sky;
    airplane!: Airplane;

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas!;
        this.myCamera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();  
            this.title = new Title();
            this.sea = new Sea();
            this.sky = new Sky();
            this.airplane = new Airplane();
        });
    }

    resize() {
    }

    update() {
        if (this.title) this.title.update();
        if (this.airplane) this.airplane.update();
        if (this.sky) this.sky.update();
        if (this.sea) this.sea.update();
    }
}