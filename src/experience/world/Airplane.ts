import * as THREE from "three";
import Experience from "../Experience";
import { colors } from "../utils/colors";

export default class Airplane {
    experience: Experience;
    scene: THREE.Scene;
    airplane: THREE.Object3D;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.airplane = new THREE.Object3D();

        const cabin = this.createEl("cabin", [60, 50, 50, 1, 1, 1], { color: colors.red });
        this.airplane.add(cabin);

        const engine = this.createEl("engine", [20, 50, 50, 1, 1, 1], { color: colors.white })
        engine.position.x = 40;
        this.airplane.add(engine);

        const tail = this.createEl("tail", [15, 20, 5, 1, 1, 1], { color: colors.red });
        tail.position.set(-35, 25, 0);
        this.airplane.add(tail);

        const sideWing = this.createEl("sideWing", [40, 8, 150, 1, 1, 1], { color: colors.red });
        this.airplane.add(sideWing);

        const propeller = this.createEl("propeller", [20, 10, 10, 1, 1, 1], {color: colors.brown});

        
        const blade = this.createEl("blade", [1, 100, 20, 1, 1, 1], { color: colors.brownDark });
        blade.position.set(8, 0, 0);
        propeller.add(blade);
        propeller.position.set(50, 0, 0);
        this.airplane.add(propeller);
        
        this.airplane.position.y = 100;
        this.scene.add(this.airplane);
    }

    setModel() {
        
    }

    private createEl(
        name: string, 
        
        geom: number[],
        mater: THREE.MeshPhongMaterialParameters ) {
        
        const geometry = new THREE.BoxGeometry(...geom);
        const material = new THREE.MeshPhongMaterial({  
            flatShading: true,
            ...mater
        });

        const el = new THREE.Mesh(geometry, material);
        el.castShadow = true;
        el.receiveShadow = true;
        el.name = name;

        return el;
    }

    resize() {
    }

    update() {
        this.airplane.children[4].rotation.x += .3;
    }
}











