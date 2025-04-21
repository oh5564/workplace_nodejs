import {odd,even} from './var.mjs';
import checkNumber from './func.mjs';

function checkStringOddorEven(str) {
    if(str.length % 2 ) { // 홀수이면
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddorEven("hello"));