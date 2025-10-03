function addNumbers() {
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
    
    // Calculate the sum
    const sum = number1 + number2;
    
    // Display the result
    resultElement.textContent = sum;
    resultElement.style.color = '#333';
}

// Allow pressing Enter to calculate
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addNumbers();
            }
        });
    });
});
