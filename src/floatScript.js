import {
    BaseScript
} from 'mage-engine';

const increase = 0.02;

export default class FloatScript extends BaseScript {

    constructor() {
        super('floatScript');
    }

    start(mesh) {
        this.mesh = mesh;
        this.max = Math.random() * 0.4;
        this.angle = 0;
    }

    update(dt) {
        this.angle += increase;

        this.mesh.position({
            y: Math.sin(this.angle) * this.max
        });
    }
}
