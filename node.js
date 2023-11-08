class Node {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 999999999;
        this.g = 999999999;
        this.h = undefined;
        this.neighbors = [];
        this.cameFrom = undefined;
        this.blocked = false;
    }

    show(col) {
        if (this.blocked) {
            col = color(0, 0, 0);
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
        let nbr;

        if (i > 0) {
            nbr = grid[i-1][j];
            if (!nbr.blocked) {
                this.neighbors.push(nbr);
            }
        }
        if (i < cols - 1) {
            nbr = grid[i+1][j];
            if (!nbr.blocked) {
                this.neighbors.push(nbr);
            }
        }
        if (j > 0) {
            nbr = grid[i][j - 1];
            if (!nbr.blocked) {
                this.neighbors.push(nbr);
            }
        }
        if (j < rows - 1) {
            nbr = grid[i][j + 1];
            if (!nbr.blocked) {
                this.neighbors.push(nbr);
            }
        }
    }

    setHeuristic(goalNode) {
        this.h = dist(this.i, this.j, goalNode.i, goalNode.j);
    }
}
