let numOne = "0";
let numTwo = "";
let operator = "";
let shouldClear = false;
let operatorPressed = false;
const display = document.querySelector(".display-screen");
const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const equalsKey = document.querySelector(".equals-key");
const clearKey = document.querySelector(".clear-key");

numberKeys.forEach(key => key.addEventListener("click", () => appendNumber(key.textContent)));
operatorKeys.forEach(key => key.addEventListener("click", () => saveOperator(key.textContent)));

clearKey.addEventListener("click", () => {
    display.textContent = "0";
    operatorPressed = false;
    clear();
});

equalsKey.addEventListener("click", () =>  {
    if (numTwo !== "") {
        console.log(`${numOne} ${operator} ${numTwo}`);
        display.textContent = operate(parseFloat(numOne), parseFloat(numTwo), operator);
        operatorPressed = false;
        shouldClear = true;
        clear();
        // Save last computed answer as first operand
        numOne = display.textContent;
    }
});

function clear() {
    numOne = "";
    numTwo = "";
    operator = "";
}

function appendNumber(text) {
    if (display.textContent === "0" || shouldClear) display.textContent = "";
    if (shouldClear) shouldClear = false;
    // Get rid of initial zero when calculator starts
    if (numOne === "0" && !operatorPressed) numOne = "";

    if (operatorPressed) {
        numTwo += text;
    } else {
        numOne += text;
    }

    display.textContent += text;
}

function saveOperator(symbol) {
    shouldClear = true;
    operatorPressed = true;

    if (numTwo !== "") {
        numOne = operate(parseFloat(numOne), parseFloat(numTwo), operator);
        numTwo = "";
        display.textContent = numOne;
    }

    operator = getOperator(symbol);
}

function getOperator(symbol) {
    if (symbol === "÷") {
        return "/";
    } else if (symbol === "×") {
        return "*";
    } else if (symbol === "−") {
        return "-";
    }
    return "+";
}

function operate(a, b, operator) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    }
    return divide(a, b);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}