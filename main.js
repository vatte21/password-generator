// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//Copyboof 
clipboardEl.addEventListener('click', ()=>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Pass is copied to clipboard')
})

//generate Event listen
generateEl.addEventListener('click', ()=>{
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
    
    resultEl.innerText = generatePassword(
        hasLower, hasUpper, hasNumber,
        hasSymbol, length)
});

// generate password function
function generatePassword (lower, upper, number, symbol, length) {
    // Init password lab
    // Filter out Unchecked types
    // Loop over the length , call generator function for each type
    // Add final passw to the pass lab and return

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{lower}, {upper}, {number}, {symbol}]
        .filter(item => Object.values(item)[0]);
    
        if(typesCount === 0) {
            return '';
        }

        for(let i = 0; i < length; i +=typesCount){
            typesArr.forEach(type=> {
                const funcName = Object.keys(type)[0];

                generatedPassword += randomFunc[funcName]();
            });
        }
    const finalPass = generatedPassword.slice(0, length);
    return finalPass;
}

// Generator functions net comber charset

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/.,';
   return symbols[Math.floor(Math.random() * symbols.length)];
}

