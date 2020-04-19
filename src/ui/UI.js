import { Component } from 'inferno';
import { connect } from 'mage-engine';

import {closeAbout, closeMenu, openAbout} from './actions/menu';
import MainMenu from './MainMenu';
import HungerBar from './HungerBar';

class UI extends Component {

    constructor(props) {
        super(props);
    }

    getContent() {
        return (
            <div>
                <HungerBar/>
            </div>
        )
    }


    render() {
        const { onCloseMenu, onCloseAbout, onOpenAbout, menu } = this.props;
        const { open = false, about = false } = menu;

        return (
            <div>
                <MainMenu
                    about={about}
                    visible={open}
                    onStartClick={onCloseMenu}
                    onAboutClick={onOpenAbout}
                    onAboutClose={onCloseAbout}
                />
                { !open && this.getContent()}
            </div>

        )
    }
}

const mapStateToProps = ({ menu }) => {
    return {
        menu
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseMenu: () => dispatch(closeMenu()),
        onOpenAbout: () => dispatch(openAbout()),
        onCloseAbout: () => dispatch(closeAbout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UI);
