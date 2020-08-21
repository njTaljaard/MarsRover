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

        this.initGrid(g);

        this.placeRovers();
    }

    // init grid to given size & fill with blank spots
    initGrid(g) {
        gridHeight = g.Y;
        grid = new Array(g.X + 1);

        for (let x = 0; x < g.X + 1; x++) {
            grid[x] = new Array(g.Y + 1);

            for (let y = 0; y < g.Y + 1; y++) {
                grid[x][y] = 'O';
            }
        }
    }

    // place rovers on grid at their initial locations
    placeRovers() {
        for (const rover of rovers) {
            grid[rover.X][rover.Y] = rover.D;
        }
    }

    // process rover list as stack
    startGame() {
        for (let r = 0; r < rovers.length; r++) {
            let rover = rovers.shift();

            rovers.push(this.processRover(rover));
        }
    }

    // process a single rover's moves
    processRover(rover) {
        for (const move of rover.M) {
            if (move == 'M') {
                let { x, y } = this.getNewLocation(rover);

                if (this.verifyLocation(x, y)) {
                    // reset grid old location
                    grid[rover.X][rover.Y] = 'O';

                    rover.X = x;
                    rover.Y = y;

                    // assign grid new location
                    grid[rover.X][rover.Y] = rover.D;
                }
            } else {
                rover.D = this.getNewOrientation(rover.D, move);
            }
        }

        return rover;
    }

    // translate rover to new location
    getNewLocation(rover) {
        switch (rover.D) {
            case 'N':
                return { x: rover.X, y: rover.Y + 1 };
            case 'S':
                return { x: rover.X, y: rover.Y - 1 };
            case 'E':
                return { x: rover.X + 1, y: rover.Y };
            case 'W':
                return { x: rover.X - 1, y: rover.Y };
        }
    }

    // rotate rover
    getNewOrientation(pointing, move) {
        switch (pointing) {
            case 'N':
                return move == 'L' ? 'W' : 'E';
            case 'S':
                return move == 'L' ? 'E' : 'W';
            case 'E':
                return move == 'L' ? 'N' : 'S';
            case 'W':
                return move == 'L' ? 'S' : 'N';
        }
    }

    // check if rover's new location is available
    verifyLocation(x, y) {
        return (x >= 0 && y >= 0 &&
            x < grid.length && y < gridHeight &&
            grid[x][y] == 'O');
    }

    // loop array and print each index
    printGrid() {
        let line;
        for (let y = gridHeight; y >= 0; y--) {
            line = '';
            for (let x = 0; x < grid.length; x++) {
                line += grid[x][y] + '\t';
            }
            console.log(line);
        }
        console.log('');
    }

    // loop through rovers and print
    printRovers() {
        rovers.forEach(el => {
            console.log(`${el.X} ${el.Y} ${el.D}\n`);
        });
    }
}

module.exports = GameHandler;