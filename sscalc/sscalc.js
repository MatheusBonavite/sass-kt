let calcWithMemory;

function operationHistory(firstOperand = 0.0, op = '+'){
    let history = firstOperand;
    let opHistory = op;
    return function calculationWithHistory(number){
        const operation = {
            '+' : (numberOne, numberTwo) => numberOne + numberTwo,
            '-' : (numberOne, numberTwo) => numberOne - numberTwo,
            'x' : (numberOne, numberTwo) => numberOne * numberTwo,
            '÷' : (numberOne, numberTwo) => numberOne / numberTwo,
        }
        if(operation && operation[opHistory])
            return operation[opHistory](history, number);
    }
}

function keyHandler(){
    const calcScreen = document.getElementById('screen');
    if(this.innerText == "." && calcScreen.innerText.split('').includes('.')){
        return;
    }
    calcScreen.innerText += this.innerText;
}

function operationHandler(){
    const calcScreen = document.getElementById('screen');
    calcWithMemory = operationHistory(
        Number(calcScreen.innerText || 0.0),
        this.innerText
    );
    calcScreen.innerText = "";
}

function resetHandler(){
    const calcScreen = document.getElementById('screen');
    calcScreen.innerText = "";
}

function equalHandler(){
    const calcScreen = document.getElementById('screen');
    calcScreen.innerText = calcWithMemory(Number(calcScreen.innerText || 0.0));
}

function screenModeHandler(){
    const pageBody = document.getElementsByTagName('body')[0];
    const calc = document.getElementById('ssCalculator');
    const screen = document.getElementById('screen');
    const equal = document.getElementById('equal');
    const C = document.getElementById('key-C');
    const keys = document.getElementsByClassName('key');
    const operators = document.getElementsByClassName('operator');

    if(this.innerText == '🌚'){
        this.innerText = '🌝';
        pageBody.classList.add('dark');
        calc.classList.add('dark');
        screen.classList.add('dark')
        equal.classList.add('dark');
        C.classList.add('dark');

        Array.from(keys).forEach(key => key.classList.add('dark'));
        Array.from(operators).forEach(operator => operator.classList.add('dark'));

    } else{
        this.innerText = '🌚';
        pageBody.classList.remove('dark');
        calc.classList.remove('dark');
        screen.classList.remove('dark');
        equal.classList.remove('dark');
        C.classList.remove('dark');

        Array.from(keys).forEach(key => key.classList.remove('dark'));
        Array.from(operators).forEach(operator => operator.classList.remove('dark'));
    }
}

window.onload = function(){
    const screenMode = document.getElementById('screen-mode');
    const calcKeys = Array.from(document.getElementsByClassName('key'));
    const calcOperators = Array.from(document.getElementsByClassName('operator'));
    const calcReset = document.getElementById('key-C');
    const calcEqual = document.getElementById('equal');

    
    calcKeys.forEach(function(calcKey){
        calcKey.addEventListener('click', keyHandler.bind(calcKey));
    })
    
    calcOperators.forEach(function(calcOp){
        calcOp.addEventListener('click', operationHandler.bind(calcOp));
    })
    
    calcReset.addEventListener('click', resetHandler);
    calcEqual.addEventListener('click', equalHandler);
    screenMode.addEventListener('click', screenModeHandler.bind(screenMode));
}