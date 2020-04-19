import {
    OPEN_MENU,
    CLOSE_MENU,
    OPEN_ABOUT,
    CLOSE_ABOUT,
    OPEN_TUTORIAL
} from '../actions/types';

const DEFAULT_STATE = {
    open: true,
    about: false,
    showTutorial: false
};

export default (state = DEFAULT_STATE, action = {}) => {
    switch(action.type) {
        case OPEN_TUTORIAL:
            return {
                ...state,
                showTutorial: true
            };
        case OPEN_MENU:
            return {
                ...state,
                open: true
            };
        case CLOSE_MENU:
            return {
                ...state,
                open: false,
                showTutorial: false
            };
        case OPEN_ABOUT:
            return {
                ...state,
                about: true
            };
        case CLOSE_ABOUT:
            return {
                ...state,
                about: false
            };
        default:
            return state;
    }
};
