const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => a/b;

const operate = (operator,a,b) => {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            if (b === 0) return undefined;
            else return divide(a,b);
        default:
            return null;
    }
}

let firstNumber = '';
let secondNumber = '';
let currentOperation = '';

const displayCurrentOperation = document.querySelector("#currentOperation");
const displayPreviousOperation = document.querySelector("#previousOperation");
const numberButton = document.querySelectorAll("[data-number]");
const operatorButton = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const decimalButton = document.querySelector("[data-decimal]");
const deleteButton = document.querySelector("#c");
const clearButton = document.querySelector("#ac");

numberButton.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent))
})
operatorButton.forEach((button) => {
    button.addEventListener('click', () => operation(button.textContent))
})
deleteButton.addEventListener('click', () => del())
decimalButton.addEventListener('click', () => decimal())
equalButton.addEventListener('click', () => equals())
clearButton.addEventListener('click', () => clearAll())

function appendNumber(number) {
    displayCurrentOperation.textContent += number;
    firstNumber = roundResult(displayCurrentOperation.textContent);
}
function operation(operator) {
    displayPreviousOperation.textContent = `${firstNumber} ${operator}`;
    secondNumber = firstNumber;
    currentOperation = displayPreviousOperation.textContent.split(" ").pop();
    displayCurrentOperation.textContent = '';
}
function del(){
    displayCurrentOperation.textContent = displayCurrentOperation.textContent
    .toString()
    .slice(0,-1)   
}
function decimal() {
    if (displayCurrentOperation.textContent.includes('.')){
        return
    }
        displayCurrentOperation.textContent += '.';
}
function roundResult(number){
    return Math.round(number * 1000) / 1000
}
function equals() {
    if (firstNumber === 0 && currentOperation === '/') 
    {
        clearAll()
        return displayPreviousOperation.textContent = "Learn Mathematics!";
    }
    displayCurrentOperation.textContent = operate(currentOperation, secondNumber, firstNumber)
    displayPreviousOperation.textContent = `${secondNumber} ${currentOperation} ${firstNumber}`;
    firstNumber = roundResult(displayCurrentOperation.textContent); 
    return firstNumber;
}
function clearAll() {
    firstNumber = '';
    secondNumber = '';
    currentOperation = '';
    displayCurrentOperation.textContent = '';
    displayPreviousOperation.textContent = '';
}