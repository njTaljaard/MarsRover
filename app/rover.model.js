const { blueprint, types, validator } = require('podeng');

const MoveItem = blueprint.object({
    m: types.options(['L', 'R', 'M'])
});
const RoverItem = blueprint.object({
    X: types.number,
    Y: types.number,
    D: types.options(['N', 'E', 'S', 'W']),
    M: blueprint.array(MoveItem)
}, {
    allowUnknownProperties: false,
    frozen: true
});

const RoverValidator = validator(RoverItem);

class RoverModel {

    constructor(location, moves, outputSpace) {
        this.assign(location, moves, outputSpace);

        let [errorStatus, errorDetail] = this.validate();

        if (errorStatus) {
            throw 'Not a valid rover'
        }
    }

    /**
     * Parse user string and validate input
     * @param {string} location - parse rover initial location and direction
     * @param {string} moves - parse list of moves to individual move
     * @param {string} outputSpace - grid bounds to validate rover starts on grid
     */
    assign(location, moves, outputSpace) {
        const loc = location.split(' ');
        this.X = parseInt(loc[0]);
        this.Y = parseInt(loc[1]);
        this.D = loc[2];

        if (this.X >= outputSpace.X && this.Y >= outputSpace.Y) {
            throw 'Rover is out of bounds';
        }

        this.M = moves.split('');
    }

    validate() {
        return RoverValidator.check(this);
    }
}

module.exports = RoverModel;