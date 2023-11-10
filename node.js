class Node {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 999999999;
        this.g = 999999999;
        this.h = undefined;
        this.neighbors = [];
        this.cameFrom = undefined;
        this.blocked = random(1) < 0.3;
    }

    show(col) {
        if (this.blocked) {
            col = color(0);
        }

        fill(col);
        noStroke();
        rect(this.i * w, this.j * h, w-1, h-1);
    }

    addNeighbors(grid) {
        if (this.blocked) {
            return;
        }

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
