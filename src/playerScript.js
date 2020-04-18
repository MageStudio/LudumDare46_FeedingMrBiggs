import {
    BaseScript,
    Input,
    constants,
    SceneManager,
    Universe,
    debounce
} from 'mage-engine';

import {
    getInitialPlayerDirection,
    getInitialPlayerPositionForLevel,
    getInitialPlayerIndex,
    isAllowedMove,
    getPlayerPositionFromIndex,
    getNewDirection,
    DOWN,
    UP,
    LEFT,
    RIGHT
} from './levels';

export default class PlayerScript extends BaseScript {

    constructor() {
        super('playerScript');
    }

    start(mesh) {
        Input.enable();

        this.mesh = mesh;

        this.currentDirection = getInitialPlayerDirection(this.mesh.level);
        this.currentIndex = getInitialPlayerIndex(this.mesh.level);
        this.currentPosition = getInitialPlayerPositionForLevel(this.mesh.level);

        this.mesh.position(this.currentPosition);

        this.moving = false;
        this.maxSpeed = 10;
        this.maxReverseSpeed = -this.maxSpeed;

        this.forward = false;
        this.backwards = false;
        this.left = false;
        this.right = false;

        this.speed = 0;
        this.speed_y = 0;
        this.orientation = 0;

        Input.addEventListener('keyDown', debounce(this.handleKeyDown.bind(this), 200));
    }

    handleKeyDown(e) {
        this.forward = e.event.keyCode === 87;
        this.backwards = e.event.keyCode === 83;
        this.right = e.event.keyCode === 68;
        this.left = e.event.keyCode === 65;
        console.log('inside handle keydown', e);

        if (this.backwards) {
            this.currentDirection = getNewDirection(this.currentDirection.type, DOWN)
            console.log(this.currentDirection);

        } else if (this.right) {
            this.currentDirection = getNewDirection(this.currentDirection.type, RIGHT);
            console.log(this.currentDirection);
        } else if (this.left) {
            this.currentDirection = getNewDirection(this.currentDirection.type, LEFT);
            console.log(this.currentDirection);
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

    updatePosition(dt) {

        if (!this.moving && this.forward) {

            const newIndex = this.calculateNewIndex(this.currentIndex, this.currentDirection);

            if (isAllowedMove(this.mesh.level, newIndex.row, newIndex.col)) {
                this.currentIndex = newIndex;
                this.currentPosition = getPlayerPositionFromIndex(this.currentIndex.row, this.currentIndex.col);
            }


            this.moving = true;
            this.mesh.goTo(this.currentPosition, 300).then(() => {
                this.moving = false;
                this.forward = false;
            });
        }
    }

    updateCamera() {
        const { x, y, z } = this.mesh.position();
        SceneManager.camera.lookAt(x, y, z);
    }

    update(dt) {
        this.updatePosition(dt)
    }
}
