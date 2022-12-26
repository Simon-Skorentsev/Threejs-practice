import { EventEmitter } from "events";
import Experience from "../Experience";
import MyRenderer from "../MyRenderer";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Assets } from "./assets";

export default class Resources extends EventEmitter {
    assets;
    experience: Experience;
    renderer: MyRenderer;
    queue: number;
    loaded: number;
    items: {[key: string]: any};
    loaders: { gltfLoader?: GLTFLoader, dracoLoader?: DRACOLoader };

    constructor(assets: Assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.MyRenderer;

        this.assets = assets;
        this.items = {};
        this. queue = this.assets.length;
        this.loaded = 0;
        this.loaders = {};

        // this.setLoaders();
        // this.startLoading();

        this.emit("ready");  //TODO: убрать если хочешь загружать модели
    }

    // setLoaders() {
    //     this.loaders.gltfLoader = new GLTFLoader();
    //     this.loaders.dracoLoader = new DRACOLoader();
    //     this.loaders.dracoLoader.setDecoderPath("/draco/");  //copy of three\examples\js\libs\draco
    //     this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    // }
 
    // startLoading() {
    //     for (const asset of this.assets) {
    //         if (asset.type === "glbModfel") {
    //             this.loaders.gltfLoader!.load(asset.path, (file) => {
    //                 this.singleAssetLoade(asset, file);
    //             })
    //         } else {
    //             console.log(asset.name + ": ", asset);
    //         }
    //     }
    // }

    // singleAssetLoade(asset: typeof this.assets[number], file: GLTF) {
    //     this.items[asset.name] = file;
    //     this.loaded++;
    //     if (this.loaded === this.queue) {
    //         this.emit("ready");  //реакция в World
    //     }
    // }
}