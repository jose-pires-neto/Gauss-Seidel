function addEquation() {
    const equationsDiv = document.getElementById("equations");
    const equationDiv = document.createElement("div");
    equationDiv.className = "equation";
    const index = equationsDiv.children.length + 1;
    equationDiv.innerHTML = `
      <label for="a${index}1">a${index}1:</label>
      <input type="number" class="a" name="a${index}1" value="0">
      <label for="a${index}2">a${index}2:</label>
      <input type="number" class="a" name="a${index}2" value="0">
      <label for="b${index}">b${index}:</label>
      <input type="number" class="b" name="b${index}" value="0">
    `;
    equationsDiv.appendChild(equationDiv);
  }

  function gaussSeidel() {
    const equations = document.getElementsByClassName("equation");
    const a = [];
    const b = [];
    const x = [];
    for (let i = 0; i < equations.length; i++) {
      const aRow = [];
      const a1 = equations[i].querySelector(`input[name="a${i+1}1"]`);
      const a2 = equations[i].querySelector(`input[name="a${i+1}2"]`);
      if (a1 !== null && a2 !== null && !isNaN(parseFloat(a1.value)) && !isNaN(parseFloat(a2.value))) {
        aRow.push(parseFloat(a1.value));
        aRow.push(parseFloat(a2.value));
        a.push(aRow);
      }
      const bInput = equations[i].querySelector(`input[name="b${i+1}"]`);
      if (bInput !== null && !isNaN(parseFloat(bInput.value))) {
        b.push(parseFloat(bInput.value));
      }
      const xInput = document.getElementById(`x${i+1}`);
      if (xInput !== null && !isNaN(parseFloat(xInput.value))) {
        x.push(parseFloat(xInput.value));
      }
    }
    const maxIterations = 100;
    const tolerance = 0.0001;
    let iteration = 0;
    let error = 1;
    while (iteration < maxIterations && error > tolerance) {
      for (let i = 0; i < equations.length; i++) {
        let sum = 0;
        for (let j = 0; j < equations.length; j++) {
          if (j !== i) {
            sum += a[i][j] * x[j];
          }
        }
        const xNew = (b[i] - sum) / a[i][i];
        error = Math.abs(xNew - x[i]);
        x[i] = xNew;
      }
      iteration++;
    }
    for (let i = 0; i < equations.length; i++) {
      const xInput = document.getElementById(`x${i+1}`);
      if (xInput !== null && !isNaN(parseFloat(x[i]))) {
        xInput.value = x[i].toFixed(4);
      }
    }
  }

