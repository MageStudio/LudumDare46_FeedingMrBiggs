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
            <div className={'dialog-container'}>
                <div className={'dialog lose'}>
                    <div className={'title-container'}>
                        <h1>Game Over :(</h1>
                    </div>
                    <div className={'details'}>
                        <h3 className={'score'}>{score}</h3>
                        <div className={'action'}>
                            <button className={'action-button'} onClick={this.onClick}>
                                Try Again?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
