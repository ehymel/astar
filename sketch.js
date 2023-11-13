let cols = 50;
let rows = 50;
let grid = [];
let start, end;
let w, h;
let search = false;

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

    // set start and end nodes
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.blocked = false;
    end.blocked = false;

    // set heuristic for each node on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
            grid[i][j].setHeuristic(end);
        }
    }

    start.g = 0;
    start.f = start.h;

    astar = new Astar();

    startSearchButton = createButton('Start search');
    startSearchButton.position(50, 25);
    startSearchButton.mouseClicked(startSearch);
}

function draw() {
    background(255);

    if (search) {
        astar.findPath(start, end);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    start.show(color(0, 255, 0));
    end.show(color(255, 0, 0));

    // for (let i = 0; i < astar.openSet.length; i++) {
    //     astar.openSet[i].show(color(0, 255, 0));
    // }

    noFill();
    stroke('orange');
    strokeWeight(h/3);
    beginShape();
    for (let i = 0; i < astar.totalPath.length; i++) {
        let path = astar.totalPath[i];
        vertex(path.i * w + w/2, path.j * h + h/2);
    }
    endShape();
}

function mouseClicked() {
    let i = Math.floor(mouseX / w);
    let j = Math.floor(mouseY / h);

    if (i >= 0 && i <= cols-1 && j >=0 && j <= rows-1) {
        if (i === 0 && j === 0) {
            return;
        }
        if (i === cols-1 && j === rows-1) {
            return;
        }
        grid[i][j].blocked = !grid[i][j].blocked;
    }
}

function startSearch() {
    resetNodes();

    start.g = 0;
    start.f = start.h;

    astar = new Astar();
    search = true;
}

function resetNodes() {
    // since grid is passed to addNeighbors function,
    // reset all nodes, then separately add neighbors
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].cameFrom = undefined;
            grid[i][j].f = 999999999;
            grid[i][j].g = 999999999;
        }
    }
}