import { Component } from 'inferno';
import {parseScore} from '../levels';

const MAX = 3;

export default class GameWin extends Component {

    constructor(props) {
        super(props);
    }

    getHref = () => {
        const { level } = this.props;
        const next = (Number(level) + 1);

        return `#${next}`;
    };

    getNext = () => (
        <div className={'action'}>
            <a className={'action-button'} href={this.getHref()}>
                Next
            </a>
        </div>
    );

    getReplay = () => {
        return (
            <div className={'action'}>
                <a className={'action-button'} href={'/'}>
                    Try Again?
                </a>
            </div>
        );
    };

    getTitle = (endgame) => {
        return endgame ? 'Thanks for playing!' : 'Nice!';
    };

    render() {
        const { score, level } = this.props;
        const endgame = level === MAX;
        const title = this.getTitle(endgame);

        const className = 'title-container ' + (endgame ? 'endgame' : '');

        return (
            <div className={'dialog-container'}>
                <div className={'dialog win'}>
                    <div className={className}>
                        <h1>{title}</h1>
                    </div>
                    <div className={'details'}>
                        <h3 className={'score'}>{parseScore(score)}</h3>
                        { !endgame && this.getNext() }
                        { endgame  && this.getReplay() }
                    </div>
                </div>
            </div>
        )
    }
}
