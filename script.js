const numberInput = document.getElementById('number-input');
const outputDiv = document.getElementById('output');

function validateInput(value) {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
        return { valid: false, error: "Please enter a valid positive integer." };
    }
    return { valid: true, value: num };
}

function calculateFactorialIterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculateFactorialRecursive(n) {
    if (n === 0 || n === 1) return 1;
    return n * calculateFactorialRecursive(n - 1);
}

function displayOutput(method, result) {
    outputDiv.innerHTML = `<p><strong>Method:</strong> ${method}</p><p><strong>Result:</strong> ${result}</p>`;
}

function handleCalculate(method) {
    const validation = validateInput(numberInput.value);
    if (!validation.valid) {
        outputDiv.innerHTML = `<p class="error">${validation.error}</p>`;
        return;
    }

    const number = validation.value;
    let result;

    if (method === 'iterative') {
        result = calculateFactorialIterative(number);
    } else if (method === 'recursive') {
        result = calculateFactorialRecursive(number);
    }

    displayOutput(method.charAt(0).toUpperCase() + method.slice(1), result);
}

document.getElementById('calculate-iterative').addEventListener('click', () => handleCalculate('iterative'));
document.getElementById('calculate-recursive').addEventListener('click', () => handleCalculate('recursive'));