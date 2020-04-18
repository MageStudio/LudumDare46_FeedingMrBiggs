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
}

const level1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 2, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const level1PlayerPosition = { row: 7, col: 4 };
const level1PlayerDirection = { ...DIRECTIONS.LEFT };

const levels = [
    level1
];

const playerPositions = [
    level1PlayerPosition
];

const playerDirections = [
    level1PlayerDirection
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

const CENTER = { row: 4, col: 4 };
const SIZE = 10;
export const getPositionFromIndex = (row, col) => {
    return {
        x: (col - CENTER.col) * SIZE,
        y: 0,
        z: (row - CENTER.row) * SIZE
    }
}

export const isAllowedMove = (level, row, col) => levels[level][row][col] > 0;
export const isCrateBox = (level, row, col) => levels[level][row][col] > 1;

export const removeCrateBox = (level, row, col) => levels[level][row][col] = 1;

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
})
