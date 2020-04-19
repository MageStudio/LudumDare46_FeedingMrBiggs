import { store } from 'mage-engine';
import menu from './menu';
import test from './test';
import game from './game';

const reducers = store.combineReducers({
    test,
    menu,
    game
});

export default reducers;
