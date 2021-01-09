const calculator = {
  buttons: null,
  currentOutput: null,
  currentOperation: null,
  previousNumber: null,
  currentNumber: null,

  init() {
    this.currentOutput = document.querySelector('.output__current-operation');
    this.currentOutput.textContent = '0';

    this.buttons = document.querySelectorAll('.button');
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        switch (button.value) {
          case 'AC':
            this.delete();
            break;
          case 'DEL':
            this.backspace(button.value);
            break;
          case '√':
          case '^':
          case '/':
          case '*':
          case '-':
          case '+':
            this.operation(button.value);
            break;
          case '=':
            this.calculate();
            break;
          default:
            this.numberPress(button.value);
            break;
        }
      });
    });
  },

  numberPress(number) {
    if (this.currentOutput.textContent === '0') {
      this.currentOutput.textContent = number;
    } else {
      this.currentOutput.textContent += number;
    }
  },

  operation(operation) {
    this.currentOperation = operation;
    this.currentOutput.textContent += operation;
  },

  calculate() {},

  backspace() {
    if (this.currentOutput.textContent.length === 1) {
      this.currentOutput.textContent = '0';
    } else {
      this.currentOutput.textContent = this.currentOutput.textContent.slice(0, -1);
    }
  },

  delete() {},

};

calculator.init();
