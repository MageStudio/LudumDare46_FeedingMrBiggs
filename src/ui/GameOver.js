import { Component } from 'inferno';

export default class GameOver extends Component {

    constructor(props) {
        super(props);
    }

    onClick = () => {
        window.location.reload();
    };

    render() {
        const { score } = this.props;
        return (
            <div className={'dialog'}>
                <h1>GAME OVER</h1>
                <h3>{score}</h3>

                <button onClick={this.onClick}>Try again?</button>
            </div>
        )
    }
}
