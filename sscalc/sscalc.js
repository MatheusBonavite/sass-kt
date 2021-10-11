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

window.onload = function(){
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
}