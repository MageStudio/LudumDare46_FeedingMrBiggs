import {
    CHANGE_FOOD,
    GAME_OVER,
    GAME_WIN,
    GOOD_FOOD,
    START_GAME,
    WRONG_FOOD,
    HUNGER_INCREASE,
    PLAYER_MOVEMENT
} from '../actions/types';

const DEFAULT_STATE = {
    hunger: 0,
    interval: 2000,
    rate: 5, // will add 5% every interval
    food: 'corn',
    over: false,
    win: false,
    score: 0,
    level: 0
};

const GOOD_FOOD_DEC = 5;
const MAX_HUNGER = 100;
const BAD_FOOD_INC = 10;
const MOVEMENT_INC = 5;

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case GOOD_FOOD:
            return {
                ...state,
                hunger: state.hunger > GOOD_FOOD_DEC ? state.hunger - GOOD_FOOD_DEC : 0,
                score: state.score + GOOD_FOOD_DEC
            };
        case WRONG_FOOD:
            return {
                ...state,
                hunger: state.hunger < (MAX_HUNGER - BAD_FOOD_INC) ? state.hunger + BAD_FOOD_INC : MAX_HUNGER,
                score: state.score > BAD_FOOD_INC ? state.score - BAD_FOOD_INC : 0
            };
        case CHANGE_FOOD:
            return {
                ...state,
                food: action.food
            };
        case GAME_OVER:
            return {
                ...state,
                over: true
            };
        case GAME_WIN:
            return {
                ...state,
                over: false,
                win: true,
                score: state.score - (action.hunger / 10)
            };
        case HUNGER_INCREASE:
            return {
                ...state,
                hunger: action.hunger
            };
        case PLAYER_MOVEMENT:
            return {
                ...state,
                hunger: state.hunger < (MAX_HUNGER - MOVEMENT_INC) ? state.hunger + MOVEMENT_INC : MAX_HUNGER,
            }
        case START_GAME:
            return {
                ...DEFAULT_STATE,
                level: action.level
            };
        default:
            return state;
    }
};
