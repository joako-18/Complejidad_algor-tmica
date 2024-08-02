import ArrayMatch from '../models/box.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('matchForm');
  const generateButton = document.getElementById('generateArrays');

  let tornillos = [];
  let tuercas = [];

  // Inicializa los gráficos
  const ctxIterations = document.getElementById('iterationsChart').getContext('2d');
  const ctxTime = document.getElementById('timeChart').getContext('2d');

  const iterationsChart = new Chart(ctxIterations, {
    type: 'bar',
    data: {
      labels: ['Bubble Sort', 'Quick Sort', 'Matching'],
      datasets: [{
        label: 'Número de Iteraciones',
        data: [0, 0, 0],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const timeChart = new Chart(ctxTime, {
    type: 'bar',
    data: {
      labels: ['Bubble Sort', 'Quick Sort', 'Matching'],
      datasets: [{
        label: 'Tiempo (ms)',
        data: [0, 0, 0],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

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
    const arrayMatchLinear = new ArrayMatch();

    // Inserta tornillos y tuercas en las instancias correspondientes
    tornillos.forEach(t => {
      arrayMatchBubble.insertTornillo(t);
      arrayMatchQuick.insertTornillo(t);
      arrayMatchLinear.insertTornillo(t);
    });
    tuercas.forEach(t => {
      arrayMatchBubble.insertTuerca(t);
      arrayMatchQuick.insertTuerca(t);
      arrayMatchLinear.insertTuerca(t);
    });

    // Ejecuta el ordenamiento de burbuja y captura el resultado
    let bubbleResult = arrayMatchBubble.bubbleSort();
    console.log('Bubble Sort Result:', bubbleResult);

    // Ejecuta el ordenamiento rápido y captura el resultado
    let quickResult = arrayMatchQuick.quickSort();
    console.log('Quick Sort Result:', quickResult);

    // Ejecuta el emparejamiento lineal y captura el resultado
    let linearResult = arrayMatchLinear.matchNutsAndBolts();
    console.log('Matching Result:', linearResult);

    // Actualiza los gráficos con los resultados
    iterationsChart.data.datasets[0].data = [
      bubbleResult.iterations,
      quickResult.iterations,
      linearResult.iterations
    ];
    iterationsChart.update();

    timeChart.data.datasets[0].data = [
      bubbleResult.timeTaken.toFixed(2),
      quickResult.timeTaken.toFixed(2),
      linearResult.timeTaken.toFixed(2)
    ];
    timeChart.update();
  });
});

function generateUniqueRandomArray(size) {
  const array = [];
  while (array.length < size) {
    const num = Math.floor(Math.random() * 1000000);
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
