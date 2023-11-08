class Obstacle {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    show() {
        fill(0);
        noStroke();
        rect(this.i * w, this.j * h, w-1, h-1);
    }
}
