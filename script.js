// Get the display screen element
const displayScreen = document.querySelector('.display-screen');

// Get all the number buttons
const numberButtons = document.querySelectorAll('.btn:not(.operator, .clear)');

// Get the operator buttons
const operatorButtons = document.querySelectorAll('.operator');

// Get the equal button
const equalButton = document.querySelector('#equals');

const sqrtButton = document.querySelector('#sqrt');

// Get the clear button
const clearButton = document.querySelector('#clear');

const backspaceButton = document.querySelector('#backspace');

let currentExpression = ''; // Stores the current arithmetic expression

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => { 
       currentExpression += button.textContent;
       displayScreen.textContent = currentExpression;
    });
});

// Add event listeners to operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentExpression += button.textContent;
         displayScreen.textContent = currentExpression;
    });
});

sqrtButton.addEventListener('click', () => {
    const expression = displayScreen.textContent;
    const result = Math.sqrt(parseFloat(expression));
    if (Number.isNaN(result)) {
        displayScreen.textContent = 'Error';
    } else {
        displayScreen.textContent = result;
    }
});

backspaceButton.addEventListener('click', () => {
    currentExpression = currentExpression.slice(0, -1);
    displayScreen.textContent = currentExpression;
});

// Add event listener to equal button
equalButton.addEventListener('click', () => {
    try {
        const result = evaluateExpression(currentExpression);
        displayScreen.textContent = result;
        currentExpression = '';
    } catch (error) {
        displayScreen.textContent = 'Error';
        currentExpression = '';
    }
});

// Add event listener to clear button
clearButton.addEventListener('click', () => {
    displayScreen.textContent = '';
    currentExpression = '';
});

// Function to evaluate the arithmetic expression
function evaluateExpression(expression) {
    try {
        const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, ''); // Remove any characters that are not digits, operators, parentheses, or decimal points
        const result = new Function(`return ${sanitizedExpression}`)(); // Evaluates the sanitized expression using a Function constructor
        return parseFloat(result.toFixed(2)); // Round the result to two decimal places and convert it back to a number
      } catch (error) {
        return 'Error';
      }
}
