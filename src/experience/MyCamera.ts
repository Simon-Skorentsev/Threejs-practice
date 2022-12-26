import Experience from "./Experience";
import Sizes from "./utils/Sizes";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class MyCamera {
    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;
    perspectiveCamera!: THREE.PerspectiveCamera;
    orthographicCamera!: THREE.OrthographicCamera;
    controls?: OrbitControls;

    constructor() {
        this.experience = new Experience();  
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas!;
    
        this.createPerspectiveCamera();
        this.createOrthographicCamera(); 
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        
        this.perspectiveCamera = new THREE.PerspectiveCamera(60, this.sizes.aspect, 0.1, 10000);  
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 200;
        this.perspectiveCamera.position.y = 100;
    };

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(  
            -this.sizes.aspect * this.sizes.frustum / .2,  
            this.sizes.aspect * this.sizes.frustum / .2,
            this.sizes.frustum / .2,
            -this.sizes.frustum / .2,
            -100,
            1000
        );
        this.orthographicCamera.position.y = 100;
        this.orthographicCamera.position.z = 200;

        this.orthographicCamera.lookAt(new THREE.Vector3(0,0,0))
        this.scene.add(this.orthographicCamera);

        const size = 100;  
        const divisions = 10; 
        const gridHelper = new THREE.GridHelper( size, divisions ); 
        this.scene.add( gridHelper );

        const axesHelper = new THREE.AxesHelper( 75 );
        this.scene.add( axesHelper );
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);  
        this.controls.enableDamping = true;  
        this.controls.enableZoom = true;  
        this.controls.target = new THREE.Vector3(0, 100, 0);  
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();  

        this.orthographicCamera.left = -this.sizes.aspect * this.sizes.frustum / .2;
        this.orthographicCamera.right = this.sizes.aspect * this.sizes.frustum / .2;
        this.orthographicCamera.top = this.sizes.frustum / .2;
        this.orthographicCamera.bottom = -this.sizes.frustum / .2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        if (this.controls) this.controls.update();
    }
}