let cols = 5;
let rows = 5;
let grid = [];
let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;

class Node {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
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
        if (i < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
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

    console.log(grid);

    start = grid[0][0];
    openSet.push(start);

    end = grid[cols - 1][rows - 1];
}

function draw() {
    background(100);

    if (openSet.length > 0) {
        let indexOfLowestFScore = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[indexOfLowestFScore].f) {
                indexOfLowestFScore = i;
            }
        }

        let current = openSet[indexOfLowestFScore];

        console.log(current);

        if (current === end) {
            console.log('DONE!');
            noLoop();
        } else {
            removeFromArray(openSet, current);
            closedSet.push(current);

            for (let i = 0; i < current.neighbors.length; i++) {
                let neighbor = current.neighbors[i];
                if (closedSet.includes(neighbor)) {
                    continue;
                }

                let tempG = current.g + 1;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                } else if (tempG >= neighbor.g) {
                    continue;
                }

                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
            }

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    grid[i][j].show(color(255));
                }
            }
            for (let i = 0; i < closedSet.length; i++) {
                closedSet[i].show(color(255, 0, 0));
            }
            for (let i = 0; i < openSet.length; i++) {
                openSet[i].show(color(0, 255, 0));
            }
        }

    } else {
        // no Solution;
        console.log('No solution');
    }
}

function removeFromArray(arr, el) {
    for (let i = arr.length-1; i >= 0; i--) {
        if (el === arr[i]) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(node1, node2) {
    return (dist(node1.i, node1.j, node2.i, node2.j));
}
