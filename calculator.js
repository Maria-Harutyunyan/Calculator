let screen = document.querySelector("#calculator-screen");
let buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.id === "clear") {
      clearScreen();
    } else if (value === "=") {
      calculate();
    } else if (button.classList.contains("operator")) {
      setOperator(value);
    } else {
      appendNumber(value);
    }
  });
});

function clearScreen() {
  currentInput = "";
  previousInput = "";
  operator = "";
  screen.value = "";
}

function calculate() {
  let result;
  let previous = parseFloat(previousInput);
  let current = parseFloat(currentInput);

  if (isNaN(previous) || isNaN(current) || operator === "") {
    return;
  }

  switch (operator) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "/":
      result = current === 0 ? "Error" : previous / current;
      break;
    case "*":
      result = previous * current;
      break;
    default:
      return;
  }
  currentInput = result === "Error" ? "" : result;
  previousInput = "";
  operator = "";
  screen.value = result;
}

function setOperator(oper) {
  if (currentInput === "") return;

  if (previousInput !== "") {
    calculate();
  }
  operator = oper;
  previousInput = currentInput;
  currentInput = "";
}

function appendNumber(num) {
  if (num === "." && currentInput.includes(".")) {
    return;
  }
  currentInput += num;
  screen.value = currentInput;
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    setOperator(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Escape") {
    clearScreen();
  } else if (event.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    screen.value = currentInput;
  } else if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
    appendNumber(event.key);
  }
});
