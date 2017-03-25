/*--- variables ---*/

var input, op, result, firstNum;
var displayEl = document.getElementById('display');



/*--- event listeners ---*/

document.querySelector('table')
  .addEventListener('click', handleClick);



/*--- function ---*/

function initialize() {
  input = '';
  op = result = firstNum = null;
}

function updateDisplay() {
  if (result) {
    displayEl.textContent = result; //updates display to show result
    initialize();
  } else {
    displayEl.textContent = input ? input : '0'; //shows 0 when clicking AC if there is no input
  }
}

function handleClick(evt) {
  // console.log(evt.target.textContent);
  if (evt.target.id === 'display') return;
  var text = evt.target.textContent;
  switch (text) {
    case 'AC' :
      initialize();
      updateDisplay();
      break;
    case 'C' :
      input = ''; //clearing current input
      break;
    case '±' :
      input = (input.includes('-') ? '' : '-') + input;//if input includes minus, return nothing. otherwise add minus sign before input
      break;
    case '÷' :
      setOp(div); //sets operator to divide Don't want to invoke it. Passing it a reference to some data
      break;
    case '×' :
      setOp(mult);
      break;
    case '−' :
      setOp(sub);
      break;
    case '+' :
      setOp(add);
      break;
    case '=' :
      if (firstNum && op && input) { //requires that there be a first number, an operation and an input
        result = op(firstNum, parseFloat(input)); //op is the function operator
        input = '';
      }
      break;
    case '.' :
      input += input.includes('.') ? '' : '.'; //if input includes decimal, return nothing. otherwise add decimal sign in input
      break;
    default:
      input += text;
  }
  updateDisplay();
}

function setOp(opFunc) {
  if (!input) return; //if no input, nothing
  firstNum = parseFloat(input); //takes string we've typed in, turns into number, and assigns it to a variable
  op = opFunc;
  input = '';
}



initialize();

/*--- operator functions ---*/

function add(a, b) { //sum
  return a + b;
}

function sub(a, b) { //difference
  return a - b;
}

function mult(a, b) { //product
  return a * b;
}

function div(a, b) { //division
  return a / b;
}

