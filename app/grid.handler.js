const debug = require('debug')('MarsRover:grid.handler');

let grid;
let gridHeight;
let rovers;

class GameHandler {

    /**
     * GameHandler constructor
     * @param {*} g : GridModel - X & Y max of grid
     * @param {*} r : RoverModel[] - all rover items
     */
    constructor(g, r) {
        rovers = r;

        grid = initGrid(g);

        placeRovers();
    }

    // init grid to given size & fill with blank spots
    initGrid(g) {
        // store a reference to grid height
        gridHeight = g.Y;

        grid = new Array(g.X);

        for (let x = 0; x < g.X; x++) {
            grid[x] = new Array(g.Y);

            for (let y = 0; y < g.Y; y++) {
                grid[x][y] = 'O';
            }
        }
    }

    // place rovers on grid at their initial locations
    placeRovers() {
        for (const rover of rovers) {
            grid[rover.X][gridHeight - rover.Y] = rover.D;
        }
    }

    // process rover list as stack
    startGame() {
        for (let r = 0; r < rovers.length; r++) {
            let rover = rovers.shift();

            processRover(rover);

            rovers.push(rover);
        }
    }

    // process a single rover's moves
    processRover(rover) {
        // TODO check if move is available / valid
    }

    // check if rover's new location is available
    verifyLocation(location) {
        // TODO check if location with grid bounds
        // TODO check if location is unoccupied
    }

    // get a copy of current rover locations
    getRover() {
        return rovers;
    }

    // loop array and print each index
    printGrid() {
        // TODO loop array and print each index
    }
}

module.exports = GameHandler;