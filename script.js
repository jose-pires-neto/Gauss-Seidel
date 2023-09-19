// Esta função implementa o método de Gauss-Seidel para resolver um sistema de equações lineares
  function gaussSeidel() {
    
    // Aqui ele obtem os elementos HTML que representam as equações
    const equations = document.getElementsByClassName("equation");
    const a = [];
    const b = [];
    const x = [];

    // Iterar sobre cada equação e extrair os valores dos inputs
    for (let i = 0; i < equations.length; i++) {
      const aRow = [];
      // Obter os coeficientes a[i][0] e a[i][1] da equação i
      const a1 = equations[i].querySelector(`input[name="a${i+1}1"]`);
      const a2 = equations[i].querySelector(`input[name="a${i+1}2"]`);
      if (a1 !== null && a2 !== null && !isNaN(parseFloat(a1.value)) && !isNaN(parseFloat(a2.value))) {
        aRow.push(parseFloat(a1.value));
        aRow.push(parseFloat(a2.value));
        a.push(aRow);
      }
      // Obter o termo independente b[i] da equação i
      const bInput = equations[i].querySelector(`input[name="b${i+1}"]`);
      if (bInput !== null && !isNaN(parseFloat(bInput.value))) {
        b.push(parseFloat(bInput.value));
      }
      // Obter o valor inicial x[i] da solução
      const xInput = document.getElementById(`x${i+1}`);
      if (xInput !== null && !isNaN(parseFloat(xInput.value))) {
        x.push(parseFloat(xInput.value));
      }
    }

    // Definir o número máximo de iterações e a tolerância para o critério de parada
    const maxIterations = 100;
    const tolerance = 0.0001;

    // Inicializar o contador de iterações e o erro máximo
    let iteration = 0;
    let error = 1;

    // Repetir o processo até que o número máximo de iterações seja atingido ou o erro máximo seja menor que a tolerância
    while (iteration < maxIterations && error > tolerance) {
      for (let i = 0; i < equations.length; i++) {
        let sum = 0;
        for (let j = 0; j < equations.length; j++) {
          if (j !== i) {
            // Calcular a soma dos produtos dos coeficientes e as soluções, exceto para o termo diagonal
            sum += a[i][j] * x[j];
          }
        }
        // Calcular o novo valor de x[i] usando a fórmula de Gauss-Seidel
        const xNew = (b[i] - sum) / a[i][i];
        // Calcular o erro absoluto entre o novo e o antigo valor de x[i]
        error = Math.abs(xNew - x[i]);
        // Atualizar o valor de x[i] com o novo valor
        x[i] = xNew;
      }
      // Incrementa o contador de iterações
      iteration++;
    }
    // Iterar sobre cada equação e mostrar o valor final de x[i] no elemento HTML correspondente
    for (let i = 0; i < equations.length; i++) {
      const xInput = document.getElementById(`x${i+1}`);
      if (xInput !== null && !isNaN(parseFloat(x[i]))) {
        // Arredondar o valor de x[i] para quatro casas decimais e atribuí-lo ao input
        xInput.value = x[i].toFixed(4);
      }
    }
  }