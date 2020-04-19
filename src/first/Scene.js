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
    getFoodCratePositionFromIndex,
    CORN,
    PIZZA_LABEL,
    PIZZA,
    CORN_LABEL,
    BURGER,
    BURGER_LABEL,
    APPLE_LABEL,
    APPLE,
    ORANGE_LABEL,
    ORANGE,
    PASTA,
    PASTA_LABEL
} from '../levels';

import PlayerScript from '../playerScript';
import FloatScript from '../floatScript';
import CrateScript from '../crateScript';

import {changeFood, gameWin, goodFood, startGame, wrongFood} from '../ui/actions/game';

import {
    FEEDING,
    CRATE_FOUND,
    UPDATE_RELATIVE_POSITION,
    COLLECTED, PLAYER_GAME_WIN
} from '../constants';

import UI from '../ui/UI';
import {closeMenu, openMenu} from '../ui/actions/menu';
import {GAME_WIN} from '../ui/actions/types';

const WHITE = 0Xffffff;
const BACKGROUND = 0xb8e994;

export default class MrBiggs extends BaseScene {

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
            callback();
        }, 5000);
        setTimeout(() => {
            loader.classList.add('invisible');
        }, 6000);
    };

    setUpCamera = () => {
        window.camera = SceneManager.camera;
        SceneManager.camera.position({ y: 19, z: 17 });
        SceneManager.camera.lookAt(0, 0, 0);
    };

    createPlayer() {
        this.player = ModelsEngine.getModel('player');
        this.player.level = this.level;
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
            store.dispatch(gameWin(hunger));
            this.player.dispatchEvent({
                type: PLAYER_GAME_WIN
            });
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

        removeCrateBox(this.level, row, col);
        this.collected.push(crate);

        crate.dispatchEvent({
            type: COLLECTED,
            length: this.collected.length
        });

        this.playCollectedSound();
        this.player.add(crate);
    }

    createFoodCrate(row, col, type = 'corn') {
        const crate = this.sceneHelper.addCube(1.5, WHITE);
        const position = getFoodCratePositionFromIndex(row, col);

        crate.setName('crate');

        crate.setTextureMap(type+'.crate');
        crate.addScript('crateScript');
        crate.position(position);

        crate.index = { row, col };
        crate.type = type;

        this.crates.push(crate);
    }

    setUpLevel() {
        const description = getLevelDescription(this.level);
        const models = [];

        description.forEach((row, rowIndex) => {
            row.forEach((el, colIndex) => {
                if (!el) return;

                const position = getPositionFromIndex(rowIndex, colIndex);
                const model = ModelsEngine.getModel('block');
                model.position(position);
                models.push(model);

                if (el === CORN) {
                    this.createFoodCrate(rowIndex, colIndex, CORN_LABEL);
                }

                if (el === PIZZA) {
                    this.createFoodCrate(rowIndex, colIndex, PIZZA_LABEL);
                }

                if (el === BURGER) {
                    this.createFoodCrate(rowIndex, colIndex, BURGER_LABEL);
                }

                if (el === APPLE) {
                    this.createFoodCrate(rowIndex, colIndex, APPLE_LABEL);
                }

                if (el === ORANGE) {
                    this.createFoodCrate(rowIndex, colIndex, ORANGE_LABEL);
                }

                if (el === PASTA) {
                    this.createFoodCrate(rowIndex, colIndex, PASTA_LABEL);
                }


            });
        });
    }

    setUpRandomFood = () => {
        this.randomFoodInterval = setInterval(() => {
            store.dispatch(changeFood(this.level));
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
        console.log(game);
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
        const { path = 0 } = this.options;
        console.log(this.options);
        this.level = Number(path.replace('/', '')) || 0;

        store.dispatch(startGame(this.level));

        if (this.level === 0) {
            store.dispatch(openMenu());
        } else {
            store.dispatch(closeMenu());
        }

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

        this.setUpLevel();
        this.createPlayer();
        this.setUpRandomFood();

        this.enableUI(UI, { level: this.level });

        PostProcessingEngine.add('HueSaturationEffect', { hue: 0.1, saturation: 0.3 });
        PostProcessingEngine.add('DepthOfField', { focus: 19.85, aperture: 0.0001, maxblur: 0.008 });
    }
}
