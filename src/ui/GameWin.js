import { Component } from 'inferno';

export default class GameWin extends Component {

    constructor(props) {
        super(props);
    }

    onClick = () => {
        const { level } = this.props;
        console.log(level + 1);
    }

    render() {
        const { score } = this.props;
        return (
            <div className={'dialog-container'}>
                <div className={'dialog win'}>
                    <div className={'title-container'}>
                        <h1>Nice!</h1>
                    </div>
                    <div className={'details'}>
                        <h3>{score}</h3>
                        <div className={'action'}>
                            <button className={'action-button'} onClick={this.onClick}>
                               Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
