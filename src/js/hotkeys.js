import calculator from './index';

document.body.addEventListener('keydown', (event) => {
  if (event.key.match(/\d|\./)) {
    calculator.numberPress(event.key);
  } else if (event.key === 'Enter') {
    if (calculator.currentOperation !== '=') {
      calculator.calculate();
    }
  } else if (event.key === 'Escape') {
    calculator.delete();
  } else if (event.key.match(/\+|\*|-|\//)) {
    if (event.key === '/') {
      calculator.operation('÷');
    } else {
      calculator.operation(event.key);
    }
  }
});
