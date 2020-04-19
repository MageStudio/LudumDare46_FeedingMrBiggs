import {
    BaseScript,
    Input,
    constants,
    SceneManager,
    Sound,
    debounce,
    store
} from 'mage-engine';

import {
    getInitialPlayerDirection,
    getInitialPlayerPositionForLevel,
    getInitialPlayerIndex,
    isAllowedMove,
    getPlayerPositionFromIndex,
    isCrateBox,
    isTarget,
    DIRECTIONS
} from './levels';

import {CRATE_FOUND, FEEDING, PLAYER_GAME_WIN} from './constants';
import {playerMovement} from './ui/actions/game';

export default class PlayerScript extends BaseScript {

    constructor() {
        super('playerScript');
    }

    start(mesh) {
        Input.enable();

        this.mesh = mesh;

        this.mesh.setColliders(
            [constants.VECTOR_FRONT],
            [{ far: 8, near: 0}]
        );

        this.currentDirection = getInitialPlayerDirection(this.mesh.level);
        this.currentIndex = getInitialPlayerIndex(this.mesh.level);
        this.currentPosition = getInitialPlayerPositionForLevel(this.mesh.level);

        this.mesh.position(this.currentPosition);

        this.moving = false;
        this.pressing = false;
        this.over = false;

        this.mesh.addEventListener(PLAYER_GAME_WIN, this.handleWin);

        Input.addEventListener('keyDown', debounce(this.handleKeyDown, 50));
        Input.addEventListener('keyUp', this.handleKeyUp);
    }

    handleWin = () => {
        this.over = true;
    }

    handleKeyUp() {
        this.pressing = false;
    }

    handleKeyDown = (e) => {
        const forward = e.event.keyCode === 87;
        const backwards = e.event.keyCode === 83;
        const right = e.event.keyCode === 68;
        const left = e.event.keyCode === 65;

        const tryingToFeed = e.event.keyCode === 70;

        console.log('inside handle keydown', e);

        this.pressing = forward || backwards || right || left;

        if (backwards) {
            this.currentDirection = DIRECTIONS.DOWN;//getNewDirection(this.currentDirection.type, DOWN)
            console.log(this.currentDirection);

        } else if (right) {
            this.currentDirection = DIRECTIONS.RIGHT;//getNewDirection(this.currentDirection.type, RIGHT);
            console.log(this.currentDirection);
        } else if (left) {
            this.currentDirection = DIRECTIONS.LEFT;//getNewDirection(this.currentDirection.type, LEFT);
            console.log(this.currentDirection);
        } else if (forward) {
            this.currentDirection = DIRECTIONS.UP;
        } else if (tryingToFeed) {
            this.checkIfOnTarget();
        }
    }

    calculateNewIndex() {
        const { row, col } = this.currentIndex;
        const { row: rowDir, col: colDir } = this.currentDirection;

        return {
            row: row + rowDir,
            col: col + colDir
        };
    }

    checkIfOnTarget = () => {
        if (isTarget(this.mesh.level, this.currentIndex.row, this.currentIndex.col)) {
            console.log('robot on target');
            this.mesh.dispatchEvent({
                type: FEEDING
            });
        }
    }

    checkIfCrateBox() {
        if (isCrateBox(this.mesh.level, this.currentIndex.row, this.currentIndex.col)) {
            this.mesh.dispatchEvent({
                type: CRATE_FOUND,
                ...this.currentIndex
            });
        }
    }

    playMovementSound() {
        const sound = new Sound('movement');
        sound.setVolume(0.8);

        sound.start();
    }

    updatePosition(dt) {

        if (!this.moving && this.pressing) {

            const newIndex = this.calculateNewIndex(this.currentIndex, this.currentDirection);

            if (isAllowedMove(this.mesh.level, newIndex.row, newIndex.col)) {
                this.currentIndex = newIndex;
                this.currentPosition = getPlayerPositionFromIndex(this.currentIndex.row, this.currentIndex.col);
            }

            this.moving = true;
            this.pressing = false;
            this.playMovementSound();
            this.mesh.goTo(this.currentPosition, 300).then(() => {
                this.moving = false;
                this.pressing = false;

                this.checkIfCrateBox();
                store.dispatch(playerMovement());
            });
        }
    }

    updateCamera() {
        const { x, y, z } = this.mesh.position();
        SceneManager.camera.lookAt(x, y, z);
    }

    update(dt) {
        if (!this.over) {
            this.updatePosition(dt);
        }
    }
}
