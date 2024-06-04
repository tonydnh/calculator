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
const negateKey = document.querySelector(".negate-key");
const percentKey = document.querySelector(".percent-key");
const dotKey = document.querySelector(".dot-key");

numberKeys.forEach(key => key.addEventListener("click", () => appendNumber(key.textContent)));
operatorKeys.forEach(key => key.addEventListener("click", () => saveOperator(key.textContent)));

clearKey.addEventListener("click", () => clearMemory());
negateKey.addEventListener("click", () => negate());
percentKey.addEventListener("click", () => convertToPercent());
equalsKey.addEventListener("click", () =>  getAnswer());
dotKey.addEventListener("click", () => addDot());

function clear() {
    numOne = "0";
    numTwo = "";
    operator = "";
}

function clearMemory() {
    display.textContent = "0";
    shouldClear = false;
    operatorPressed = false;
    clear();
}

function negate() {
    if (operatorPressed) {
        if (numTwo.charAt(0) === "-") {
            numTwo = numTwo.slice(1);
        } else {
            numTwo = "-" + numTwo;
        }
        display.textContent = numTwo;
    } else {
        if (numOne.charAt(0) === "-") {
            numOne = numOne.slice(1);
        } else {
            numOne = "-" + numOne;
        }
        display.textContent = numOne;
    }
}

function convertToPercent() {
    if (operatorPressed) {
        numTwo /= 100;
        display.textContent = numTwo;
    } else {
        numOne /= 100;
        display.textContent = numOne;
    }
}

function getAnswer() {
    if (numTwo !== "") {
        console.log(`${numOne} ${operator} ${numTwo}`);
        display.textContent = round(operate(parseFloat(numOne), parseFloat(numTwo), operator));
        operatorPressed = false;
        shouldClear = true;
        clear();
        // Save last computed answer as first operand
        numOne = display.textContent;
    }
}

function addDot() {
    if (operatorPressed) {
        if (!numTwo.includes(".")) {
            numTwo = numTwo === "" ? "0." : numTwo + ".";
            display.textContent = numTwo;
            // Prevent number before decimal from not being shown in second operand
            shouldClear = false;
        }
    } else {
        if (!numOne.includes(".")) {
            numOne = numOne === "" ? "0." : numOne + ".";
            display.textContent = numOne;
        }
    }
}

function appendNumber(text) {
    if (display.textContent === "0" || shouldClear) display.textContent = "";
    if (shouldClear) shouldClear = false;
    // Get rid of initial zero when calculator starts
    if (numOne === "0" && !operatorPressed) numOne = "";

    if (operatorPressed) {
        if (!maxLengthReached(numTwo)){
            numTwo += text;
            display.textContent += text;
        }
    } else {
        if (!maxLengthReached(numOne)) {
            numOne += text;
            display.textContent += text;
        }
    }
}

function maxLengthReached(num) {
    if (num < 0) {
        return num.slice(1).length >= 9;
    }
    return num.length >= 9;
}

function saveOperator(symbol) {
    shouldClear = true;
    operatorPressed = true;

    // Chaining operators
    if (numTwo !== "") {
        numOne = round(operate(parseFloat(numOne), parseFloat(numTwo), operator));
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

function round(num) {
    return Math.round(num * 1e7) / 1e7;
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