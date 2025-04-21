const { odd, even } = require("./var");
const checkNumber = require("./func");

function checkStringOddorEven(str) {
    if(str.length%2) {// 홀수면
        return odd;
    }
    return even;

}

console.log(checkNumber(10));
console.log(checkStringOddorEven('hello'));