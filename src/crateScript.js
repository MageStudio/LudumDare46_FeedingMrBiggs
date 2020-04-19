import {
    BaseScript
} from 'mage-engine';

import {
    UPDATE_RELATIVE_POSITION,
    COLLECTED
} from './constants';

const increase = 0.05;

export default class CrateScript extends BaseScript {

    constructor() {
        super('createScript');
    }

    start(mesh) {
        this.mesh = mesh;
        this.max = 0.1;
        this.angle = 0;
        this.collected = false;

        this.mesh.addEventListener(COLLECTED, this.handleCollection);
        this.mesh.addEventListener(UPDATE_RELATIVE_POSITION, this.handleUpdateRelativePosition);
    }

    getCrateRelativePosition = (length = 0) => {
        return {
            x: 0,
            y: length + 0.7,
            z: 0
        };
    }

    handleUpdateRelativePosition = ({ pos }) => {
        console.log('getting rel position', pos);
        this.mesh.position(this.getCrateRelativePosition(pos));
    }

    handleCollection = ({ length }) => {
        this.collected = true;
        this.mesh.rotation({ x: 0, y: 0, z: 0 });

        this.mesh.position(this.getCrateRelativePosition(length));
    }

    update(dt) {
        if (!this.collected) {
            this.angle += increase;

            this.mesh.position({
                y: 5 + (Math.sin(this.angle) * this.max)
            });

            this.mesh.rotation({
                x: this.angle,
                y: -this.angle
            });
        }
    }
}
