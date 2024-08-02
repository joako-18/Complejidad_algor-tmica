export default class ArrayMatch {
  constructor() {
    this.tornillos = [];
    this.tuercas = [];
    this.iterations = 0;
  }

  insertTornillo(t) {
    this.tornillos.push(t);
  }

  insertTuerca(t) {
    this.tuercas.push(t);
  }

  bubbleSort() {
    const start = performance.now();
    let n = this.tornillos.length;
    let sorted = false;
    this.iterations = 0;

    // Incrementa iteraciones simuladas
    const simulateIterations = () => {
      for (let i = 0; i < 10000; i++) {
        // Simplemente incrementa una variable para simular trabajo
        this.iterations++;
      }
    };

    while (!sorted) {
      sorted = true;
      for (let i = 0; i < n - 1; i++) {
        this.iterations++;
        simulateIterations(); // Simula trabajo extra

        if (this.tornillos[i] > this.tornillos[i + 1]) {
          [this.tornillos[i], this.tornillos[i + 1]] = [this.tornillos[i + 1], this.tornillos[i]];
          sorted = false;
        }
        if (this.tuercas[i] > this.tuercas[i + 1]) {
          [this.tuercas[i], this.tuercas[i + 1]] = [this.tuercas[i + 1], this.tuercas[i]];
          sorted = false;
        }
      }
      n--;
    }
    const end = performance.now();
    return {
      tornillos: this.tornillos,
      tuercas: this.tuercas,
      iterations: this.iterations,
      timeTaken: end - start
    };
  }

  quickSort() {
    const start = performance.now();
    this.iterations = 0;

    // Incrementa iteraciones simuladas
    const simulateIterations = () => {
      for (let i = 0; i < 10000; i++) {
        // Simplemente incrementa una variable para simular trabajo
        this.iterations++;
      }
    };

    const quickSortHelper = (array, left, right) => {
      if (left < right) {
        const pivotIndex = partition(array, left, right);
        quickSortHelper(array, left, pivotIndex - 1);
        quickSortHelper(array, pivotIndex + 1, right);
      }
    };

    const partition = (array, left, right) => {
      const pivot = array[right];
      let i = left - 1;
      for (let j = left; j < right; j++) {
        this.iterations++;
        simulateIterations(); // Simula trabajo extra

        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      [array[i + 1], array[right]] = [array[right], array[i + 1]];
      return i + 1;
    };

    quickSortHelper(this.tornillos, 0, this.tornillos.length - 1);
    quickSortHelper(this.tuercas, 0, this.tuercas.length - 1);
    const end = performance.now();

    return {
      tornillos: this.tornillos,
      tuercas: this.tuercas,
      iterations: this.iterations,
      timeTaken: end - start
    };
  }
}
