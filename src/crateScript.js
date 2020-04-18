import {
    BaseScript
} from 'mage-engine';

const increase = 0.1;

export default class CrateScript extends BaseScript {

    constructor() {
        super('createScript');
    }

    start(mesh) {
        this.mesh = mesh;
        this.max = 0.1;
        this.angle = 0;
    }

    update(dt) {
        if (!this.mesh.collected) {
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
