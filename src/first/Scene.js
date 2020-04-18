import {
    BaseScene,
    ControlsManager,
    SceneManager,
    AmbientLight,
    SunLight,
    ModelsEngine,
    AudioEngine,
    ScriptManager,
    ParticleEngine,
    Partykals,
    ImagesEngine,
    PostProcessingEngine,
    Vector3,
    THREEColor,
    Universe,
    store
} from 'mage-engine';

import {
    getLevelDescription,
    getPositionFromIndex,
    getInitialPlayerPositionForLevel
} from '../levels';

import PlayerScript from '../playerScript';
import FloatScript from '../floatScript';

import MainMenu from '../ui/MainMenu';

const BACKGROUND_COLOR = 0x81ecec;//0x55efc4;//0xa8e6cf;
const GROUND_COLOR = 0xdddddd;
const PLANE_COLOR = 0xfab1a0;
const CAR_COLOR = 0xa8e6cf;
const SUN_COLOR = 0xe17055;//0x555555;
const AMBIENT_LIGHT_COLOR = 0xffffff;
const WHITE = 0Xffffff;

export default class FlatGrid extends BaseScene {

    addAmbientLight() {
        window.ambient = new AmbientLight({
            color: WHITE,
            intensity: 0.1,
            name: 'ambientlight'
        });
    }

    addSunlight() {
        window.sun = new SunLight({
            color: PLANE_COLOR,//PLANE_COLOR,//SUN_COLOR,
            intensity: 0.3,
            position: { x: 20, y: 8, z: 0 },
            target: { x: 0, y: 0, z: 0 },
            name: 'sunlight',
            near: 0.1,
            far: 50
        });
    }

    progressAnimation = (callback) => {
        const loader = document.querySelector('.loader');
        loader.classList.remove('fadeout', 'invisible');
        setTimeout(() => {
            loader.classList.add('fadeout');
        }, 5000);
        setTimeout(() => {
            loader.classList.add('invisible');
        }, 6000);
        callback();
    };

    setUpCamera = () => {
        window.camera = SceneManager.camera;
        SceneManager.camera.position({ y: 15, z: 13 });
        SceneManager.camera.lookAt(0, 0, 0);
    };

    onStateChange = (state) => {
        console.log(state);
    }

    createPlayer(id) {
        const player = ModelsEngine.getModel('player');
        player.level = 0;

        //player.setTextureMap('corn.crate');

        player.addScript('playerScript');
    }

    setUpLevel(id) {
        const description = getLevelDescription(id);
        const models = [];

        description.forEach((row, rowIndex) => {
            row.forEach((el, colIndex) => {
                if (!el) return;

                const position = getPositionFromIndex(rowIndex, colIndex);
                const model = ModelsEngine.getModel('block');
                model.position(position);
                models.push(model);
                //model.rotation(getRandomRotation());
            });
        })

        models.forEach(model => {
            model.addScript('floatScript');
        })
    }

    onCreate() {
        ControlsManager.setOrbitControl();
        SceneManager.setShadowType('basic');
        SceneManager.setClearColor(PLANE_COLOR);
        AudioEngine.setVolume(0.1); // 2

        ScriptManager.create('playerScript', PlayerScript);
        ScriptManager.create('floatScript', FloatScript);


        this.addAmbientLight();
        this.addSunlight();
        this.setUpCamera();

        this.setUpLevel(0);
        this.createPlayer(0);

        this.enableUI(MainMenu, {
            onStartButtonClick: () => {}
        });


        //ScriptManager.create('carScript', CarScript);
        //ScriptManager.create('rotation', Rotation);

        PostProcessingEngine.add('HueSaturationEffect', { hue: 0.1, saturation: 0.3 });
        PostProcessingEngine.add('DepthOfField', { focus: 19.85, aperture: 0.0001, maxblur: 0.008 });
    }
}
