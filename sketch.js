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
}

function draw() {
    background(100);

    totalPath = [];

    if (openSet.length > 0) {
        let indexOfLowestFScore = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[indexOfLowestFScore].f) {
                indexOfLowestFScore = i;
            }
        }

        let current = openSet[indexOfLowestFScore];

        if (current === end) {
            totalPath = reconstructPath(current);
        } else {
            removeFromArray(openSet, current);
            closedSet.push(current);

            for (let i = 0; i < current.neighbors.length; i++) {
                let neighbor = current.neighbors[i];
                if (closedSet.includes(neighbor)) {
                    continue;
                }

                let tempG = current.g + 1; // assumes distance from one node to the next is 1

                if (tempG < neighbor.g) {
                    neighbor.g = tempG;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.cameFrom = current;
                }

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
            totalPath = reconstructPath(current);
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].show(color(255));
            }
        }
        // for (let i = 0; i < closedSet.length; i++) {
        //     closedSet[i].show(color(255, 0, 0));
        // }
        for (let i = 0; i < openSet.length; i++) {
            openSet[i].show(color(0, 255, 0));
        }
        for (let i = 0; i < totalPath.length; i++) {
            totalPath[i].show(color(0, 0, 255));
        }

    } else {
        // no Solution;
        console.log('No solution');
    }
}

function reconstructPath(current) {
    totalPath.push(current);
    while (current.cameFrom !== undefined) {
        current = current.cameFrom;
        totalPath.push(current);
    }
    return totalPath;
}

function removeFromArray(arr, el) {
    for (let i = arr.length-1; i >= 0; i--) {
        if (el === arr[i]) {
            arr.splice(i, 1);
        }
    }
}
