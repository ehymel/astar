let cols = 25;
let rows = 25;
let grid = [];
let openSet = [];
let closedSet = [];
let totalPath = [];
let start;
let end;
let w, h;

class Node {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 999999999;
        this.g = 999999999;
        this.h = undefined;
        this.neighbors = [];
        this.cameFrom = undefined;
    }

    show(col) {
        fill(col);
        noStroke();
        rect(this.i * w, this.j * h, w-1, h-1);
    }

    addNeighbors(grid) {
        let i = this.i;
        let j = this.j;

        if (i > 0) {
            this.neighbors.push(grid[i-1][j]);
        }
        if (i < cols - 1) {
            this.neighbors.push(grid[i+1][j]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
    }

    setHeuristic(goalNode) {
        this.h = dist(this.i, this.j, goalNode.i, goalNode.j);
    }
}

function setup() {
    createCanvas(400, 400);

    w = width / cols;
    h = height / rows;

    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Node(i, j);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].setHeuristic(end);
        }
    }

    openSet.push(start);
    start.g = 0;
    start.f = start.h;

    astar = new Astar()
}

function draw() {
    background(100);

    astar.findPath(start, end);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    // for (let i = 0; i < this.closedSet.length; i++) {
    //     this.closedSet[i].show(color(255, 0, 0));
    // }
    for (let i = 0; i < astar.openSet.length; i++) {
        astar.openSet[i].show(color(0, 255, 0));
    }
    for (let i = 0; i < astar.totalPath.length; i++) {
        astar.totalPath[i].show(color(0, 0, 255));
    }
}
