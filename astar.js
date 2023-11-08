class Astar {
    constructor() {
        this.totalPath = [];
        this.openSet = [];
        this.closedSet = [];
    }

    findPath(start, goal) {
        if (this.openSet.length === 0) {
            this.openSet.push(start);
        }

        // reset totalPath each time through
        this.totalPath = [];

        if (this.openSet.length > 0) {
            let indexOfLowestFScore = 0;
            for (let i = 0; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[indexOfLowestFScore].f) {
                    indexOfLowestFScore = i;
                }
            }

            let current = this.openSet[indexOfLowestFScore];

            if (current === goal) {
                this.totalPath = this.reconstructPath(current);
            } else {
                this.removeFromArray(this.openSet, current);
                this.closedSet.push(current);

                for (let i = 0; i < current.neighbors.length; i++) {
                    let neighbor = current.neighbors[i];
                    if (this.closedSet.includes(neighbor)) {
                        continue;
                    }

                    let tempG = current.g + 1; // assumes distance from one node to the next is 1

                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.cameFrom = current;
                    }

                    if (!this.openSet.includes(neighbor)) {
                        this.openSet.push(neighbor);
                    }
                }
                this.totalPath = this.reconstructPath(current);
            }


        } else {
            // no Solution;
            console.log('No solution');
        }

    }

    reconstructPath(current) {
        this.totalPath.push(current);
        while (current.cameFrom !== undefined) {
            current = current.cameFrom;
            this.totalPath.push(current);
        }
        return this.totalPath;
    }

    removeFromArray(arr, el) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (el === arr[i]) {
                arr.splice(i, 1);
            }
        }
    }
}