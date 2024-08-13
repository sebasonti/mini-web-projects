export default class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let result = 0;
    const previousOperand = parseFloat(this.previousOperand);
    const currentOperand = parseFloat(this.currentOperand);
    if (isNaN(previousOperand) || isNaN(currentOperand)) return;

    switch (this.operation) {
      case '+':
        result = previousOperand + currentOperand;
        break;
      case '-':
        result = previousOperand - currentOperand;
      default:
        break;
    }

    this.currentOperand = result;
    this.previousOperand = '';
    this.operation = undefined;
  }

  getFormattedNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    }
    return integerDisplay;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.getFormattedNumber(this.previousOperand)} ${this.operation ?? ''}`;
    this.currentOperandTextElement.innerText = this.getFormattedNumber(this.currentOperand);
  }
}
