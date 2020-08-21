const debug = require('debug')('MarsRover:main.app');

let grid;
let rovers;

/**
 * BEGIN User input
 */
try {
    // TODO get max height and with of terminal
} catch (e) {
    console.log('\nFailed to retrieve grid display size');
    process.exit();
}


try {
    // TODO ask user input for grid size
    const GridModel = require('./app/grid.model');
    // FIXME remove test data
    grid = new GridModel('5 5', { X: 20, Y: 20 });

    // TODO check if grid size within terminal row & col
} catch (e) {
    if (typeof e == 'string') {
        debug(e);
        process.exit();
    }
    debug('\nInvalid Grid size');
    process.exit();
}

try {
    // TODO ask rover count
    // FIXME remove test data
    let roverCount = 2;

    // TODO check if rover count is less then grid slots

    const RoverModel = require('./app/rover.model');
    // FIXME remove test data
    rovers = [new RoverModel('1 2 N', 'LMLMLMLMM', grid), new RoverModel('3 3 E', 'MMRMMRMRRM', grid)];

    for (let i = 0; i < roverCount; i++) {
        // TODO ask rover input & validated
    }
} catch (e) {
    debug(e)
    if (typeof e == 'string') {
        debug(e);
        process.exit();
    }
    debug('\nFailed to create rovers');
    process.exit();
}

/**
 * BEGIN Start of game
 */
try {
    const GameHandler = require('./app/grid.handler');

    let game = new GameHandler(grid, rovers);

    console.log('----START GRID----')
    game.printGrid();

    game.startGame();

    console.log('----END GRID----')
    game.printGrid();
} catch (e) {
    if (typeof e == 'string') {
        console.log(e);
        process.exit();
    }
    debug('\nFailed to execute game');
    process.exit();
}