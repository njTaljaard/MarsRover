const { blueprint, types, validator } = require('podeng');

const GridItem = blueprint.object({
    X: types.number,
    Y: types.number
}, {
    allowUnknownProperties: false,
    frozen: true
});

const GridValidator = validator(GridItem);

class GridModel {

    constructor(input, outputSpace) {
        this.assign(input, outputSpace);

        let [errorStatus, errorDetail] = this.validate();

        if (errorStatus) {
            throw 'Not a valid grid'
        }
    }

    /**
     * Parse user string and validate input
     * @param {string} input - is the user string from terminal
     * @param {string} outputSpace - grid bounds to validate rover starts on grid
     */
    assign(input, outputSpace) {
        let split = input.split(' ');

        this.X = parseInt(split[0]);
        this.Y = parseInt(split[1]);

        if (this.X >= outputSpace.X && this.Y >= outputSpace.Y) {
            throw 'Grid is to large to output';
        }
    }

    validate() {
        return GridValidator.check(this);
    }
}

module.exports = GridModel;