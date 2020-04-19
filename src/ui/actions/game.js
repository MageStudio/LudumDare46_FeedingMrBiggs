import {
    CHANGE_FOOD,
    GAME_OVER,
    GAME_WIN,
    GOOD_FOOD,
    START_GAME,
    WRONG_FOOD,
    HUNGER_INCREASE,
    PLAYER_MOVEMENT
} from './types';
import {pickRandomFood} from '../../levels';

export const startGame = (level) => {
    return {
        type: START_GAME,
        level
    }
};

export const goodFood = () => {
    // we got the right food
    return {
        type: GOOD_FOOD
    }
};

export const wrongFood = () => {
    // wrong food selected
    return {
        type: WRONG_FOOD
    }
};

export const changeFood = (level) => {
    // mr biggs wants diff food
    return {
        type: CHANGE_FOOD,
        food: pickRandomFood(level)
    }
};

export const gameOver = () => {
    return {
        type: GAME_OVER
    }
};

export const gameWin = (hunger) => {
    return {
        type: GAME_WIN,
        hunger
    }
};

export const hungerIncrease = (hunger) => {
    return {
        type: HUNGER_INCREASE,
        hunger
    }
}

export const playerMovement = () => {
    return {
        type: PLAYER_MOVEMENT
    }

}
