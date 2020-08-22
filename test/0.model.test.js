/**/
'use strict'

const GridModel = require('../app/grid.model');
const RoverModel = require('../app/rover.model');

var chai = require('chai'),
    expect = chai.expect;

describe('Model Creation', () => {
    /**
     * Grid create tests
     */
    it('should create grid', () => {
        let result = new GridModel('5 5', { X: 10, Y: 10 });

        expect(result).to.eql({ X: 5, Y: 5 });
    })

    it('should fail to create grid, to large', () => {
        try {
            new GridModel('10 10', { X: 5, Y: 5 });
        } catch (e) {
            expect(e).to.be.string;
            expect(e).to.eql('Grid is to large to output');
        }
    })

    it('should fail to create grid, not valid', () => {
        try {
            new GridModel('5', { X: 10, Y: 10 });
        } catch (e) {
            expect(e).to.be.string;
            expect(e).to.eql('Not a valid grid');
        }
    })

    /**
     * Rover create tests
     */
    it('should create rover', () => {
        let grid = new GridModel('5 5', { X: 10, Y: 10 });
        let result = new RoverModel('1 2 N', 'M', grid);

        expect(result).to.eql({ X: 1, Y: 2, D: 'N', M: ['M'] });
    })

    it('should fail create rover, out of grid space', () => {
        try {
            let grid = new GridModel('5 5', { X: 10, Y: 10 });
            new RoverModel('1 2 N', 'M', grid);
        } catch (e) {
            expect(e).to.be.string;
            expect(e).to.eql('Rover is out of bounds');
        }
    })

    it('should fail create rover, missing coordinate', () => {
        try {
            let grid = new GridModel('5 5', { X: 10, Y: 10 });
            new RoverModel('1 N', 'M', grid);
        } catch (e) {
            expect(e).to.be.string;
            expect(e).to.eql('Not a valid rover');
        }
    })

    it('should fail create rover, missing direction', () => {
        try {
            let grid = new GridModel('5 5', { X: 10, Y: 10 });
            new RoverModel('1 2 N', '', grid);
        } catch (e) {
            expect(e).to.be.string;
            expect(e).to.eql('Not a valid rover');
        }
    })

    it('should fail create rover, missing moves', () => {
        try {
            let grid = new GridModel('5 5', { X: 10, Y: 10 });
            new RoverModel('1 2 N', '', grid);
        } catch (e) {
            expect(e).to.be.string;
            expect(e).to.eql('Not a valid rover');
        }
    })
})
//*/