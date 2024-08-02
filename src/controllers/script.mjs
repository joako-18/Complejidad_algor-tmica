import ArrayMatch from '../models/box.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('matchForm');
  const generateButton = document.getElementById('generateArrays');

  let tornillos = [];
  let tuercas = [];

  generateButton.addEventListener('click', () => {
    const size = parseInt(document.getElementById('arraySize').value, 10);
    if (isNaN(size) || size <= 0) {
      alert('Por favor, introduce un tamaño de arreglo válido.');
      return;
    }

    // Genera un array de números únicos aleatorios
    tornillos = generateUniqueRandomArray(size);
    // Desordena el array para crear las tuercas
    tuercas = [...tornillos];
    shuffleArray(tuercas);

    console.log('Tornillos Generados:', tornillos);
    console.log('Tuercas Generadas:', tuercas);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const arrayMatchBubble = new ArrayMatch();
    const arrayMatchQuick = new ArrayMatch();
    const arrayMatchCounting = new ArrayMatch();

    // Inserta tornillos y tuercas en las instancias correspondientes
    tornillos.forEach(t => {
      arrayMatchBubble.insertTornillo(t);
      arrayMatchQuick.insertTornillo(t);
      arrayMatchCounting.insertTornillo(t);
    });
    tuercas.forEach(t => {
      arrayMatchBubble.insertTuerca(t);
      arrayMatchQuick.insertTuerca(t);
      arrayMatchCounting.insertTuerca(t);
    });

    // Ejecuta el ordenamiento de burbuja y captura el resultado
    let bubbleResult = arrayMatchBubble.bubbleSort();
    console.log('Bubble Sort Result:', bubbleResult);

    // Ejecuta el ordenamiento rápido y captura el resultado
    let quickResult = arrayMatchQuick.quickSort();
    console.log('Quick Sort Result:', quickResult);

    // Ejecuta el ordenamiento por conteo y captura el resultado
    let countingResult = arrayMatchCounting.countingSort();
    console.log('Counting Sort Result:', countingResult);

    // Muestra resultados para Bubble Sort
    document.getElementById('bubbleSortedTornillos').textContent = `Bubble Sort - Tornillos Ordenados: ${bubbleResult.tornillos.join(', ')}`;
    document.getElementById('bubbleSortedTuercas').textContent = `Bubble Sort - Tuercas Ordenadas: ${bubbleResult.tuercas.join(', ')}`;
    document.getElementById('bubbleIterations').textContent = `Bubble Sort - Iteraciones: ${bubbleResult.iterations}`;
    document.getElementById('bubbleTimeTaken').textContent = `Bubble Sort - Tiempo Tomado: ${bubbleResult.timeTaken.toFixed(2)} ms`;

    // Muestra resultados para Quick Sort
    document.getElementById('quickSortedTornillos').textContent = `Quick Sort - Tornillos Ordenados: ${quickResult.tornillos.join(', ')}`;
    document.getElementById('quickSortedTuercas').textContent = `Quick Sort - Tuercas Ordenadas: ${quickResult.tuercas.join(', ')}`;
    document.getElementById('quickIterations').textContent = `Quick Sort - Iteraciones: ${quickResult.iterations}`;
    document.getElementById('quickTimeTaken').textContent = `Quick Sort - Tiempo Tomado: ${quickResult.timeTaken.toFixed(2)} ms`;

    // Muestra resultados para Counting Sort
    document.getElementById('countingSortedTornillos').textContent = `Counting Sort - Tornillos Ordenados: ${countingResult.tornillos.join(', ')}`;
    document.getElementById('countingSortedTuercas').textContent = `Counting Sort - Tuercas Ordenadas: ${countingResult.tuercas.join(', ')}`;
    document.getElementById('countingIterations').textContent = `Counting Sort - Iteraciones: ${countingResult.iterations}`;
    document.getElementById('countingTimeTaken').textContent = `Counting Sort - Tiempo Tomado: ${countingResult.timeTaken.toFixed(2)} ms`;
  });
});

function generateUniqueRandomArray(size) {
  const array = [];
  while (array.length < size) {
    const num = Math.floor(Math.random() * 100000) + 1;
    if (!array.includes(num)) {
      array.push(num);
    }
  }
  return array;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
