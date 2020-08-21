const debug = require('debug')('MarsRover:main.app');
const readline = require('readline');

/**
 * BEGIN Application
 */
(async () => {
    let grid;
    let rovers = [];

    try {
        /**
         * BEGIN Gid input
         */
        try {
            let mWidth;
            let mHeight;

            try {
                mWidth = process.stdout.columns / 5;
                mHeight = process.stdout.rows;
            } catch (e) {
                console.log('\nFailed to retrieve grid display size');
                process.exit();
            }

            let gridInput = await getUserInput('Enter the width and height of grid (ie. max: ' + mWidth + ' ' + mHeight + '): ')

            const GridModel = require('./app/grid.model');

            grid = new GridModel(gridInput, { X: mWidth, Y: mHeight });
        } catch (e) {
            if (typeof e == 'string') {
                console.log(e);
                process.exit();
            }
            console.log('\nInvalid Grid size');
            process.exit();
        }

        /**
         * BEGIN Rover input
         */
        try {
            let roverCount = parseInt(await getUserInput('How many rover do you want: '));

            if (roverCount > grid.X * grid.Y) {
                throw 'Grid can support that many rovers';
            }

            const RoverModel = require('./app/rover.model');

            let r, roverInit, roverMoves;
            for (let i = 0; i < roverCount; i++) {
                roverInit = await getUserInput('Enter rover initial position: ');
                roverMoves = await getUserInput('Enter rover moves: ');

                r = new RoverModel(roverInit, roverMoves, grid);

                rovers.push(r);
            }
        } catch (e) {
            if (typeof e == 'string') {
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
            const GameHandler = require('./app/grid.handler');

            let game = new GameHandler(grid, rovers);

            console.log('----START GRID----')
            game.printGrid();

            game.startGame();

            console.log('----END GRID----')
            game.printGrid();

            console.log('----ROVERS----')
            game.printRovers();
        } catch (e) {
            if (typeof e == 'string') {
                console.log(e);
                process.exit();
            }
            console.log('\nFailed to execute game');
            process.exit();
        }
    } catch (e) {
        // Deal with the fact the chain failed
        debug(e);
    }
})();

/**
 * Handle request user input
 * @param {string} query - question to user
 */
async function getUserInput(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}