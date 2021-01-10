import './hotkeys';

const calculator = {
  buttons: null,
  currentOutput: null,
  equalOutput: null,
  currentOperation: null,
  previousNumber: null,
  currentNumber: null,
  newNumber: false,

  init() {
    this.currentOutput = document.querySelector('.output__current-operation');
    this.equalOutput = document.querySelector('.output__equal');
    this.equalOutput.textContent = '0';

    this.buttons = document.querySelectorAll('.button');
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        switch (button.value) {
          case 'AC':
            this.delete();
            break;
          case 'DEL':
            if (this.currentOperation !== '=') {
              this.backspace(button.value);
            }
            break;
          case '√':
          case '^':
          case '÷':
          case '*':
          case '-':
          case '+':
            this.operation(button.value);
            break;
          case '=':
            if (this.currentOperation !== '=') {
              this.calculate();
            }
            break;
          default:
            this.numberPress(button.value);
            break;
        }
      });
    });
  },

  numberPress(number) {
    if (this.currentOperation === '=') {
      this.currentOperation = null;
      this.delete();
    }

    if (this.equalOutput.textContent === '0' || this.newNumber) {
      this.newNumber = false;
      this.equalOutput.textContent = number;
    } else {
      this.equalOutput.textContent += number;
    }
  },

  operation(operation) {
    this.newNumber = true;

    if (this.currentOperation === '=') {
      this.currentOutput.textContent = this.equalOutput.textContent + operation;
    } else if (this.currentOperation && this.currentOperation !== '=') {
      this.calculate();
      this.currentOutput.textContent = this.equalOutput.textContent + operation;
    } else {
      this.currentOutput.textContent += this.equalOutput.textContent + operation;
    }

    this.currentOperation = operation;
  },

  calculate() {
    this.previousNumber = this.currentOutput.textContent.slice(0, -1);
    this.currentNumber = this.equalOutput.textContent;
    this.currentOutput.textContent += this.equalOutput.textContent;

    switch (this.currentOperation) {
      case '+':
        this.equalOutput.textContent = `${+this.previousNumber + +this.currentNumber}`;
        break;
      case '-':
        this.equalOutput.textContent = `${+this.previousNumber - +this.currentNumber}`;
        break;
      case '÷':
        this.equalOutput.textContent = `${+this.previousNumber / +this.currentNumber}`;
        break;
      case '*':
        this.equalOutput.textContent = `${+this.previousNumber * +this.currentNumber}`;
        break;
      case '^':
        this.equalOutput.textContent = `${(+this.previousNumber) ** +this.currentNumber}`;
        break;
      default:
        break;
    }
    this.currentOperation = '=';
  },

  backspace() {
    if (this.equalOutput.textContent.length === 1) {
      this.equalOutput.textContent = '0';
    } else {
      this.equalOutput.textContent = this.equalOutput.textContent.slice(0, -1);
    }
  },

  delete() {
    this.currentOutput.textContent = '';
    this.equalOutput.textContent = '0';
    this.currentOperation = null;
    this.previousNumber = null;
    this.currentNumber = null;
  },
};

calculator.init();

export default calculator;
