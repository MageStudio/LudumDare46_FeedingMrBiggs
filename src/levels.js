export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export const DIRECTIONS = {
    [UP]: { row: -1, col: 0, type: UP },
    [DOWN]: { row: 1, col: 0, type: DOWN },
    [LEFT]: { row: 0, col: -1, type: LEFT },
    [RIGHT]: { row: 0, col: 1, type: RIGHT }
};

export const DIRECTIONS_MAP = {
    [UP]: {
        [LEFT]: DIRECTIONS.LEFT,
        [RIGHT]: DIRECTIONS.RIGHT,
        [DOWN]: DIRECTIONS.DOWN
    },
    [DOWN]: {
        [LEFT]: DIRECTIONS.RIGHT,
        [RIGHT]: DIRECTIONS.LEFT,
        [DOWN]: DIRECTIONS.UP
    },
    [RIGHT]: {
        [LEFT]: DIRECTIONS.UP,
        [RIGHT]: DIRECTIONS.DOWN,
        [DOWN]: DIRECTIONS.LEFT
    },
    [LEFT]: {
        [LEFT]: DIRECTIONS.DOWN,
        [RIGHT]: DIRECTIONS.UP,
        [DOWN]: DIRECTIONS.RIGHT
    }
};

const TARGET = 9;
const EMPTY = 0;
const BLOCK = 1;

export const CORN = 2;
export const CORN_LABEL = 'corn';

export const BURGER = 3;
export const BURGER_LABEL = 'burger';

export const APPLE = 4;
export const APPLE_LABEL = 'apple';

export const PIZZA = 5;
export const PIZZA_LABEL = 'pizza';

export const ORANGE = 6;
export const ORANGE_LABEL = 'orange';

export const PASTA = 7;
export const PASTA_LABEL = 'pasta';

export const FOODS = [CORN, BURGER, APPLE, PIZZA, ORANGE, PASTA];
export const FOODS_TYPES = [CORN_LABEL, BURGER_LABEL, APPLE_LABEL, PIZZA_LABEL, ORANGE_LABEL, PASTA_LABEL];

export const pickRandomFood = (level) => {
    const available = foodLevels[level];
    const index = Math.floor(Math.random() * available.length);

    return available[index];
};

const level0 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 2, 1, 1, 2, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, -1, 9, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const level1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 4, 0, 0, 0],
    [0, 0, 1, 2, 1, 1, 5, 0, 0],
    [0, 0, 0, 1, -1, 0, 0, 0, 0],
    [0, 0, 1, 1, 9, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const level2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 2, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 3, 0, 0],
    [0, 0, 1, 9, -1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const level3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 7, 0, 0],
    [0, 0, 0, 4, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 3, 0, 0],
    [0, 0, 0, 9, -1, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 1, 5, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const level0PlayerPosition = { row: 5, col: 3 };
const level0PlayerDirection = { ...DIRECTIONS.UP };

const level1PlayerPosition = { row: 5, col: 2 };
const level1PlayerDirection = { ...DIRECTIONS.UP };

const level2PlayerPosition = { row: 5, col: 2 };
const level2PlayerDirection = { ...DIRECTIONS.UP };

const level3PlayerPosition = { row: 6, col: 3 };
const level3PlayerDirection = { ...DIRECTIONS.UP };


const levels = [
    level0,
    level1,
    level2,
    level3
];

const playerPositions = [
    level0PlayerPosition,
    level1PlayerPosition,
    level2PlayerPosition,
    level3PlayerPosition
];

const playerDirections = [
    level0PlayerDirection,
    level1PlayerDirection,
    level2PlayerDirection,
    level3PlayerDirection
];

export const foodLevels = [
    [CORN_LABEL],
    [CORN_LABEL, APPLE_LABEL, PIZZA_LABEL],
    [CORN_LABEL, BURGER_LABEL],
    [BURGER_LABEL, APPLE_LABEL, PIZZA_LABEL, ORANGE_LABEL, PASTA_LABEL]
];

export const getLevelDescription = (id) => {
    return levels[id];
}

export const getInitialPlayerIndex = (id) => {
    return playerPositions[id];
}

export const getInitialPlayerDirection = (id) => {
    return playerDirections[id];
}

export const getInitialPlayerPositionForLevel = (id) => {
    const { row, col } = getInitialPlayerIndex(id);

    return {
        ...getPositionFromIndex(row, col),
        y: 5
    }
}

export const getPlayerPositionFromIndex = (row, col) => ({
    ...getPositionFromIndex(row, col),
    y: 5
});

export const getNewDirection = (old, action) => {
    return DIRECTIONS_MAP[old][action];
}

export const CENTER = { row: 4, col: 4 };
const SIZE = 10;
export const getPositionFromIndex = (row, col) => {
    return {
        x: (col - CENTER.col) * SIZE,
        y: 0,
        z: (row - CENTER.row) * SIZE
    }
}

export const isAllowedMove = (level, row, col) => levels[level][row][col] > EMPTY;
export const isCrateBox = (level, row, col) => FOODS.includes(levels[level][row][col]);
export const isTarget = (level, row, col) => levels[level][row][col] === TARGET;

export const removeCrateBox = (level, row, col) => levels[level][row][col] = BLOCK;

export const getRandomRotation = () => {
    const ANGLES = [-Math.PI, -Math.PI/2, Math.PI/2, Math.PI];
    const randomIndex = Math.floor(Math.random() * ANGLES.length);

    return {
        x: 0,
        z: 0,
        y: ANGLES[randomIndex]
    };
}

export const getFoodCratePositionFromIndex = (row, col) => ({
    ...getPositionFromIndex(row, col),
    y: 3
});

export const getTargetPositionFromIndex = (row, col) => ({
    ...getPositionFromIndex(row, col),
    y: 3
});

export const parseScore = (score) => {
    const split = String(score).split('.');
    const getDecimals = value => value.length ? value : '0';

    return split.length > 1 ?
        `${split[0]}.${getDecimals(split[1])}` :
        `${split[0]}`;
};
