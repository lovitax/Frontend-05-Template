class Sorted {
    constructor(data, compare) {
        this.data = data.slice();
        this.compare = compare ? compare : ((a, b) => a - b > 0);
    }

    give(el) {
        this.data.push(el);
    }

    take() {
        if (!this.data.length) return;
        let min = this.data[0];
        let index = 0;
        for (let i = 0; i < this.data.length; i++) {
            const el = this.data[i];
            // console.log(el);
            if (this.compare(min, el)) {
                min = el;
                index = i;
            }
        }
        this.data[index] = this.data[this.data.length - 1];
        this.data.pop();
        return min;
    }
}

let s = new Sorted([9, 8, 3, 5, 6, 3, 1, 2]);
// s.take();