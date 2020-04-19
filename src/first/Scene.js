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
    store,
    Sound
} from 'mage-engine';

import {
    getLevelDescription,
    getPositionFromIndex,
    removeCrateBox,
    getFoodCratePositionFromIndex
} from '../levels';

import PlayerScript from '../playerScript';
import FloatScript from '../floatScript';
import CrateScript from '../crateScript';

import {changeFood, gameWin, goodFood, startGame, wrongFood} from '../ui/actions/game';

import {
    FEEDING,
    CRATE_FOUND,
    UPDATE_RELATIVE_POSITION,
    COLLECTED
} from '../constants';

import UI from '../ui/UI';

const WHITE = 0Xffffff;
const BACKGROUND = 0xb8e994;

const LEVEL = 0;

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
            color: BACKGROUND,
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

    createPlayer(id) {
        this.player = ModelsEngine.getModel('player');
        this.player.level = LEVEL;
        this.player.addScript('playerScript');

        this.player.addEventListener(CRATE_FOUND, this.handleCrateFound);
        this.player.addEventListener(FEEDING, this.handleFeeding);
    }

    handleFeeding = () => {
        console.log('maybe feeding');
        if (this.collected.length) {
            const crate = this.collected[0];
            this.collected = this.collected.slice(1);

            console.log('feeding', this.collected, crate);

            this.checkIfFeedingRight(crate.type);
            crate.dispose();
            this.player.remove(crate);

            this.playFeedingSound();

            this.collected.forEach((c, i) => {
                c.dispatchEvent({
                    type: UPDATE_RELATIVE_POSITION,
                    pos: i
                });
            });

            this.checkIfWin();
        }
    };

    checkIfWin = () => {
        const { game } = store.getState();
        const { hunger } = game;

        console.log(this.crates, this.collected, hunger);

        if (this.crates.length === 0 &&
            this.collected.length === 0 &&
            hunger < 100) {
            store.dispatch(gameWin(hunger))
        }
    }

    checkIfFeedingRight = (type) => {
        const { game } = store.getState();
        if (type === game.food) {
            // good food
            store.dispatch(goodFood());
        } else {
            store.dispatch(wrongFood());
        }
    }

    handleCrateFound = ({ row, col }) => {
        const index = this.crates.findIndex(c => c.index.row == row && c.index.col === col);
        const crate = this.crates[index];

        this.crates.splice(index, 1); // removing from crates

        removeCrateBox(LEVEL, row, col);
        this.collected.push(crate);

        crate.dispatchEvent({
            type: COLLECTED,
            length: this.collected.length
        });

        this.playCollectedSound();
        this.player.add(crate);
    }

    createFoodCrate(row, col, type = 'corn') {
        const crate = this.sceneHelper.addCube(1, WHITE);
        const position = getFoodCratePositionFromIndex(row, col);

        crate.setName('crate');

        crate.setTextureMap(type+'.crate');
        crate.addScript('crateScript');
        crate.position(position);

        crate.index = { row, col };
        crate.type = type;

        this.crates.push(crate);
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

                if (el === 2) {
                    this.createFoodCrate(rowIndex, colIndex, 'corn');
                }

                if (el === 3) {
                    this.createFoodCrate(rowIndex, colIndex, 'pizza');
                }

            });
        });
    }

    setUpRandomFood = (level) => {
        this.randomFoodInterval = setInterval(() => {
            store.dispatch(changeFood(level));
        }, 3000);
    }

    playFeedingSound = () => {
        new Sound('feeding').start();
    }

    playCollectedSound = () => {
        new Sound('collected').start();
    }

    playWinSound = () => {
        new Sound('win').start();
    }

    playLoseSound = () => {
        new Sound('lose').start();
    }

    onStateChange = ({ game }) => {
        if (game.over) {
            clearInterval(this.randomFoodInterval);
            this.playLoseSound();
        } else if (game.win) {
            clearInterval(this.randomFoodInterval);
            this.playWinSound();
        }
    };

    onCreate() {
        this.crates = [];
        this.collected = [];

        store.dispatch(startGame(LEVEL));

        ControlsManager.setOrbitControl();
        SceneManager.setShadowType('basic');
        SceneManager.setClearColor(BACKGROUND);
        AudioEngine.setVolume(1.3); // 2

        ScriptManager.create('playerScript', PlayerScript);
        ScriptManager.create('floatScript', FloatScript);
        ScriptManager.create('crateScript', CrateScript);


        this.addAmbientLight();
        this.addSunlight();
        this.setUpCamera();

        this.setUpLevel(LEVEL);
        this.createPlayer(LEVEL);
        this.setUpRandomFood(LEVEL);

        this.enableUI(UI);

        PostProcessingEngine.add('HueSaturationEffect', { hue: 0.1, saturation: 0.3 });
        PostProcessingEngine.add('DepthOfField', { focus: 19.85, aperture: 0.0001, maxblur: 0.008 });
    }
}
