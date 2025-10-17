// Track the selected operation (default is 'add')
let selectedOperation = 'add';

function selectOperation(operation) {
    // Update the selected operation
    selectedOperation = operation;

    // Update the UI - remove active class from all pills
    const pills = document.querySelectorAll('.operation-pill');
    pills.forEach(pill => pill.classList.remove('active'));

    // Add active class to the selected pill
    const selectedPill = document.querySelector(`[data-operation="${operation}"]`);
    if (selectedPill) {
        selectedPill.classList.add('active');
    }
}

function calculate() {
    // Get the input values
    const number1 = parseFloat(document.getElementById('number1').value);
    const number2 = parseFloat(document.getElementById('number2').value);

    // Get the result display element
    const resultElement = document.getElementById('result');

    // Validate inputs
    if (isNaN(number1) || isNaN(number2)) {
        resultElement.textContent = 'Please enter valid numbers';
        resultElement.style.color = '#e74c3c';
        return;
    }

    // Perform the calculation based on selected operation
    let result;
    switch(selectedOperation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                resultElement.textContent = 'Cannot divide by zero';
                resultElement.classList.add('corrupted');
                return;
            }
            result = number1 / number2;
            break;
        default:
            result = number1 + number2;
    }

    // Display the result
    resultElement.textContent = result;
    resultElement.classList.remove('corrupted');

    // Remove any error states
    const resultContainer = document.querySelector('.result');
    resultContainer.classList.remove('error-state', 'glitching');
}

function corruptResult() {
    const resultElement = document.getElementById('result');
    const resultContainer = document.querySelector('.result');
    
    // Only corrupt if there's a valid number
    if (resultElement.textContent === '--' || resultElement.textContent === 'Please enter valid numbers') {
        resultElement.textContent = 'ERR0R: N0 D4TA';
        resultElement.classList.add('corrupted');
        resultContainer.classList.add('error-state', 'glitching');
        return;
    }
    
    const originalNumber = parseFloat(resultElement.textContent);
    
    if (!isNaN(originalNumber)) {
        // Add glitch effect
        resultContainer.classList.add('glitching');
        
        // Different types of corruption
        const corruptionTypes = [
            () => originalNumber * -1 - Math.random() * 100,
            () => originalNumber * Math.random() * 5,
            () => originalNumber + (Math.random() > 0.5 ? 666 : -666),
            () => parseInt(originalNumber.toString().split('').reverse().join('')),
            () => originalNumber * originalNumber - Math.random() * 1000
        ];
        
        // Pick a random corruption type
        const corruptedValue = corruptionTypes[Math.floor(Math.random() * corruptionTypes.length)]();
        
        // Update display with corrupted value
        setTimeout(() => {
            resultElement.textContent = Math.round(corruptedValue * 100) / 100;
            resultElement.classList.add('corrupted');
            resultContainer.classList.add('error-state');
        }, 100);
        
        // Remove glitch animation after it completes
        setTimeout(() => {
            resultContainer.classList.remove('glitching');
        }, 500);
    }
}

// Allow pressing Enter to calculate
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');

    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calculate();
            }
        });
    });
});
