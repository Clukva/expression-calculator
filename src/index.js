
function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let inputArray = expr.split('');
    validArray(inputArray);
    let numbArray = numberArray(inputArray);


    numbArray.push(')');
    numbArray.unshift('(')
    let arr = [];
    let x =0;
    
    for(let i =0; numbArray.length>1; i++){
        if(numbArray[i] === ')'){
            let j =i-1; 
                while(numbArray[j] !== '('){
                    j--;
                }
                arr = numbArray.splice(j+1, i-j-1)
                x = freeBracketsCalculator(arr);
                numbArray.splice(j, 2, x);
                i = 1;
            }
        }
 
return numbArray[0];
}
module.exports = {
    expressionCalculator
}

function freeBracketsCalculator(numbArray){
    let n= 0;
    let m = 0;
    let operator = '';

    n= numbArray[0];

    
        for (let i = 1; i< numbArray.length; i++){
        if(/[\-\+]/.test(numbArray[i]) && numbArray[i].length==1){
            if(operator == ''){
                operator = numbArray[i];
                m =numbArray[i+1];
            }else{
                n = basicCalcul(n,m, operator);
                operator = numbArray[i];
                m = numbArray[i+1];
            }
        }
        if(/[\*\/]/.test(numbArray[i])){
            if(operator == ''){
                n = basicCalcul(n, numbArray[i+1], numbArray[i]);
            }else{
                m = basicCalcul(m, numbArray[i+1], numbArray[i]);
            }
        }
    }
if (operator !=''){
    n =basicCalcul(n,m,operator);
}
    return n;
}


function numberArray(inputArray){
    let accumulator = '';
    let numbArray = [];
    inputArray.forEach(el => {
        if(/[0-9]/.test(el)){
            accumulator += el;
        }
        if(/[\/\*\-\+()]/.test(el)){
            if(accumulator != ''){
                numbArray.push(Number(accumulator));
                accumulator ='';
            }
            numbArray.push(el);
        }
        
    });
if (accumulator!= ''){
    numbArray.push(Number(accumulator));
}
return numbArray;
}


function basicCalcul(x, y, operator){
    if(operator == '/' && y ==0){
        throw new Error("TypeError: Division by zero.");
    }
    if (operator === '+'){
        return x + y;
    }
    if (operator === '-'){
        return x - y;
    } if (operator === '*'){
        return x * y;
    } if (operator === '/'){
        return x / y;
    }
  

}


function validArray(inputArray){
    let i = 0;
    let j = 0;
    inputArray.forEach(el => {
        if(el == '('){
            i++;
        } else if(el == ')'){
             j++;
        }
         });
    if(i != j){
        throw new Error("ExpressionError: Brackets must be paired");
    }
}