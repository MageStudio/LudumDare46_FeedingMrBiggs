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
    getTargetPositionFromIndex,
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
            color: WHITE,
            intensity: 0.5,
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
        SceneManager.camera.position({ y: 25, z: 23 });
        SceneManager.camera.lookAt(0, 0, 0);
    };

    createPlayer() {
        this.player = ModelsEngine.getModel('player');
        this.player.level = this.level;
        this.player.addScript('playerScript');

        this.player.addEventListener(CRATE_FOUND, this.handleCrateFound);
        this.player.addEventListener(FEEDING, this.handleFeeding);

        this.elements.push(this.player);
    }

    handleFeeding = () => {
        if (this.collected.length) {
            const crate = this.collected[0];
            this.collected = this.collected.slice(1);

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

        this.elements.push(crate);
    }

    createMrBiggs = (row, col) => {
        const mrbiggs = ModelsEngine.getModel('mrbiggs');
        const bench = ModelsEngine.getModel('bench');
        const block = ModelsEngine.getModel('block');

        const crate1 = ModelsEngine.getModel('crate1');
        const crate2 = ModelsEngine.getModel('crate2');
        const crate3 = ModelsEngine.getModel('crate3');

        const position = getTargetPositionFromIndex(row, col);

        crate1.position(position);
        crate1.setTextureMap('corn.crate');
        crate2.position(position);
        crate2.setTextureMap('burger.crate');
        crate3.position(position);
        crate3.setTextureMap('pizza.crate');

        mrbiggs.position(position);
        bench.position(position);
        block.position(position);

        this.elements.push(mrbiggs);
        this.elements.push(bench);
        this.elements.push(block);

        this.elements.push(crate1);
        this.elements.push(crate2);
        this.elements.push(crate3);
    }

    createSurroundings = (row, col) => {
        const position = getPositionFromIndex(row, col);
        const randomGrass = Math.random() * 10;
        const randomRock = Math.random() * 10;

        if (randomGrass < 2.5) {
            const grass1 = ModelsEngine.getModel('grass1');
            const grass2 = ModelsEngine.getModel('grass2');

            grass1.position(position);
            grass2.position(position);

            this.elements.push(grass1);
            this.elements.push(grass2);
        } else if (randomGrass < 4) {
            const grass1 = ModelsEngine.getModel('grass1');
            const grass2 = ModelsEngine.getModel('grass3');

            grass1.position(position);
            grass2.position(position);

            this.elements.push(grass1);
            this.elements.push(grass2);
        } else if (randomGrass < 6) {
            const grass = ModelsEngine.getModel('grass3');
            const grass1 = ModelsEngine.getModel('grass1');
            const grass2 = ModelsEngine.getModel('grass3');

            grass1.position(position);
            grass2.position(position);
            grass.position(position);

            this.elements.push(grass);
            this.elements.push(grass2);
            this.elements.push(grass1);
        }

        if (randomRock < 3) {
            const rock1 = ModelsEngine.getModel('pebble1');
            const rock2 = ModelsEngine.getModel('pebble2');

            rock1.position(position);
            rock2.position(position);

            this.elements.push(rock1);
            this.elements.push(rock2);
        } else if (randomRock < 6) {
            const rock1 = ModelsEngine.getModel('pebble1');

            rock1.position(position);

            this.elements.push(rock1);
        }

    };

    setUpLevel() {
        const description = getLevelDescription(this.level);

        description.forEach((row, rowIndex) => {
            row.forEach((el, colIndex) => {
                if (el === 0) return;
                if (el === -1) {
                    this.createMrBiggs(rowIndex, colIndex);
                    return;
                };

                const position = getPositionFromIndex(rowIndex, colIndex);
                const model = ModelsEngine.getModel('block');
                model.setColor(0xeeeeee);
                model.position(position);

                this.elements.push(model);

                this.createSurroundings(rowIndex, colIndex);

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

                if (el === 9) {
                    this.createTarget(rowIndex, colIndex);
                }
            });
        });
    }

    createTarget(row, col) {
        const position = getTargetPositionFromIndex(row, col);

        const target = ModelsEngine.getModel('target');

        target.setColor(0x82ccdd);

        target.position(position);
        target.addScript('floatScript');

        this.elements.push(target);
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
        if (game.over) {
            clearInterval(this.randomFoodInterval);
            this.playLoseSound();
        } else if (game.win) {
            clearInterval(this.randomFoodInterval);
            this.playWinSound();
        }
    };

    dispose() {
        super.dispose();

        this.elements.forEach(el => {
            try {
                el.dispose();
                el = null;
            } catch(e) {}
        });
        this.elements = [];
    }

    onCreate() {
        this.elements = [];
        this.crates = [];
        this.collected = [];
        const { path = 0 } = this.options;

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

        PostProcessingEngine.add('HueSaturationEffect', { hue: 0.1, saturation: 0.1 });
        PostProcessingEngine.add('DepthOfField', { focus: 19.85, aperture: 0.0001, maxblur: 0.005 });
    }
}
