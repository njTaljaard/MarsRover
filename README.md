![Missing Image](https://cdn.slashgear.com/wp-content/uploads/2020/03/mars_2020_rover_main-1280x720.jpg)
# Mars Rover Challenge

### Assumptions
1. A location can only be occupied by a single rover
2. The grid is a bounded box
3. If a move is invalid by above rules, the move is discarded
4. Grid size is capped to the size of your terminal
5. Rover count is limited to the available space of the grid
6. Rovers are executed in the entered order

### Install
- Clone repo
- Run `npm i`

### Test
- Run `npm test`

### Execute
- Run `npm start`
- Enter you desired grid size i.e - '5 5'
- Enter the amount of rovers you want to place i.e. - '2'
- Enter each rover
    - Enter rover inital location and direction i.e. '1 4 N'
    - Enter rover movements i.e. - 'LMLMLMLMM'
    
A initial grid will be printed as reference. Once execution has completed the resulting grid is printed, along with the end rover list.