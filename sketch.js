let cols = 25;
let rows = 25;
let grid = [];
let obstaclesCount = Math.floor(cols * rows * 0.3);
let start, end;
let w, h;

function setup() {
    createCanvas(400, 400);

    w = width / cols;
    h = height / rows;

    // define grid
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    // fill grid with nodes
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Node(i, j);
        }
    }

    // make obstacles
    for (let i = 0; i < obstaclesCount; i++) {
        let col = Math.floor(random(1, cols));
        let row = Math.floor(random(1, rows));
        if (col === cols-1 && row === rows-1) {
            continue;
        }
        grid[col][row].blocked = true;
    }

    // define neighbors to all nodes
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    // set start and end nodes
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    // set heuristic for each node on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].setHeuristic(end);
        }
    }

    start.g = 0;
    start.f = start.h;

    astar = new Astar();
}

function draw() {
    background(100);

    astar.findPath(start, end);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    // for (let i = 0; i < astar.openSet.length; i++) {
    //     astar.openSet[i].show(color(0, 255, 0));
    // }
    for (let i = 0; i < astar.totalPath.length; i++) {
        astar.totalPath[i].show(color(0, 0, 255));
    }
    if (astar.success) {
        noLoop();
    }
}
