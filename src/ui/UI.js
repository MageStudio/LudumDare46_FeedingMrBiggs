import { Component } from 'inferno';
import { connect } from 'mage-engine';

import {closeAbout, closeMenu, openAbout, openTutorial} from './actions/menu';
import MainMenu from './MainMenu';
import HungerBar from './HungerBar';
import {gameOver, hungerIncrease} from './actions/game';
import GameOver from './GameOver';
import GameWin from './GameWin';
import Tutorial from './Tutorial';

class UI extends Component {

    constructor(props) {
        super(props);
    }

    getContent() {

        const { game, onHungerMax, onHungerIncrease } = this.props;
        const {
            hunger,
            interval,
            rate,
            food,
            over,
            win
        } = game;

        return (
            <div>
                <HungerBar
                    desiredFood={food}
                    onHungerMax={onHungerMax}
                    onHungerIncrease={onHungerIncrease}
                    rate={rate}
                    hunger={hunger}
                    over={over}
                    win={win}
                    interval={interval}/>
            </div>
        )
    }


    render() {
        const { onShowTutorial, onCloseMenu, onCloseAbout, onOpenAbout, menu, game } = this.props;
        const { over = false, win = false, score, level } = game;
        const { open = false, about = false, showTutorial = false } = menu;

        return (
            <div>
                <MainMenu
                    about={about}
                    visible={open}
                    onStartClick={onShowTutorial}
                    onAboutClick={onOpenAbout}
                    onAboutClose={onCloseAbout}
                />
                { showTutorial && <Tutorial onCloseMenu={onCloseMenu}/> }
                { !open && this.getContent()}
                { over && <GameOver score={score}/> }
                { win && <GameWin score={score} level={level}/> }
            </div>

        )
    }
}

const mapStateToProps = ({ menu, game = {} }) => {
    return {
        menu,
        game
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseMenu: () => dispatch(closeMenu()),
        onOpenAbout: () => dispatch(openAbout()),
        onCloseAbout: () => dispatch(closeAbout()),
        onHungerMax: () => dispatch(gameOver()),
        onShowTutorial: () => dispatch(openTutorial()),
        onHungerIncrease: (hunger) => dispatch(hungerIncrease(hunger))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UI);
