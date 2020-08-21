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
    const { GridModel } = require('./app/grid.model');
    let grid;

    // TODO check if grid size within terminal row & col
} catch (e) {
    console.log('\nInvalid Grid size');
    process.exit();
}

try {
    // TODO ask rover count
    let roverCount;

    // TODO check if rover count is less then grid slots

    const { RoverModel } = require('./app/rover.model');
    let rovers = [];

    for (let i = 0; i < roverCount; i++) {
        // TODO ask rover input & validated
    }
} catch (e) {
    if (typeof e == 'String') {
        console.log(e);
        process.exit();
    }
    console.log('\nFailed to create rovers');
    process.exit();
}

/**
 * BEGIN Start of game
 */
try {
    const { GameHandler } = require('./app/grid.handler');

    let game = new GameHandler(grid, rovers);

    game.printGrid();

    game.startGame();

    game.printGrid();
} catch (e) {
    if (typeof e == 'String') {
        console.log(e);
        process.exit();
    }
    console.log('\nFailed to execute game');
    process.exit();
}