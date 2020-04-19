import { Component } from 'inferno';

export default class GameWin extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { score } = this.props;
        return (
            <div className={'dialog'}>
                <h1>Wohooo</h1>
                <h3>{score}</h3>
            </div>
        )
    }
}
