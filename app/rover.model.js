const { blueprint, types, validator } = require('podeng');

const RoverItem = blueprint.object({
    X: types.number,
    Y: types.number,
    D: types.string(['N', 'E', 'S', 'W']),
    M: blueprint.array(types.string)
}, {
    allowUnknownProperties: false,
    frozen: true
});

const RoverValidator = validator(RoverItem);

class RoverModel {

    constructor(location, moves, grid) {
        this.assign(location, moves, grid);

        let [errorStatus, errorDetail] = this.validate();

        if (errorStatus) {
            console.log(errorDetail)
            throw 'Not a valid rover'
        }
    }

    /**
     * Parse user string and validate input
     * @param {string} location - parse rover initial location and direction
     * @param {string} moves - parse list of moves to individual move
     * @param {string} grid - grid bounds to validate rover starts on grid
     */
    assign(location, moves, grid) {
        // TODO parse location

        // TODO validate rover within grid bounds

        // TODO prase moves
    }

    validate() {
        return RoverValidator.check(this);
    }
}

module.exports = RoverModel;