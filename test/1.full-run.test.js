/**/
'use strict'

const GameHandler = require('../app/grid.handler');
const RoverModel = require('../app/rover.model');
const GridModel = require('../app/grid.model');

var chai = require('chai'),
    expect = chai.expect;

describe('Full run', () => {
    it('should initial grid creation', () => {
        let grid = new GridModel('5 5', { X: 10, Y: 10 });
        let rovers = [new RoverModel('1 2 N', 'LMLMLMLMM', grid), new RoverModel('3 3 E', 'MMRMMRMRRM', grid)];
        let game = new GameHandler(grid, rovers);

        let result = game.getGrid();

        expect(result).to.eql([
            ['O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'N', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'E', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O']]);
    })

    it('should succeed example, test rovers', () => {
        let grid = new GridModel('5 5', { X: 10, Y: 10 });
        let rovers = [new RoverModel('1 2 N', 'LMLMLMLMM', grid), new RoverModel('3 3 E', 'MMRMMRMRRM', grid)];
        let game = new GameHandler(grid, rovers);

        game.startGame();

        let result = game.getRovers();

        expect(result[0].X).to.equal(1);
        expect(result[0].Y).to.equal(3);
        expect(result[0].D).to.equal('N');

        expect(result[1].X).to.equal(5);
        expect(result[1].Y).to.equal(1);
        expect(result[1].D).to.equal('E');
    })

    it('should succeed example, test grid', () => {
        let grid = new GridModel('5 5', { X: 10, Y: 10 });
        let rovers = [new RoverModel('1 2 N', 'LMLMLMLMM', grid), new RoverModel('3 3 E', 'MMRMMRMRRM', grid)];
        let game = new GameHandler(grid, rovers);

        game.startGame();

        let result = game.getGrid();

        expect(result).to.eql([
            ['O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'N', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'E', 'O', 'O', 'O', 'O']]);
    })
})
//*/