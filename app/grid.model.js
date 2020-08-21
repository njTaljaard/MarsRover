const { blueprint, types, validator } = require('podeng');

const GridItem = blueprint.object({
    X: types.number,
    Y: types.number
}, {
    allowUnknownProperties: false,
    frozen: true
});

const GridValidator = validator(RoverItem);

class GridModel {

    constructor(input, grid) {
        this.assign(input, grid);

        let [errorStatus, errorDetail] = this.validate();

        if (errorStatus) {
            console.log(errorDetail)
            throw 'Not a valid rover'
        }
    }

    /**
     * Parse user string and validate input
     * @param {string} input - is the user string from terminal
     */
    assign(input) {
        //
    }

    validate() {
        return GridValidator.check(this);
    }
}

module.exports = GridModel;