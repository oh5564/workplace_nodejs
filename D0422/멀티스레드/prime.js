const min = 2;
const max= 10_000_000;
const primes = [];

function generatePrimes(start, range) {
    let isPrime = true;
    const end = start+range;
    for(let i = start; i< end; i++){ 
        for(let j = min; j<=Math.sqrt(end); j++) {
            if(i!==j && i%j===0) {
                isPrime=false;
                break;
            }
        }
        if(isPrime) {
            primes.push(i);
        }
        isPrime=true;
    }
}

console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);




// const min = 2;
// const max= 10_000_000;

// function sieveOfEratosthenes(max) {
//     const sieve = new Array(max + 1).fill(true); // 모든 숫자를 소수로 가정
//     sieve[0] = sieve[1] = false; // 0과 1은 소수가 아님

//     for (let i = 2; i <= Math.sqrt(max); i++) {
//         if (sieve[i]) {
//             // i의 배수를 모두 소수가 아니라고 표시
//             for (let j = i * i; j <= max; j += i) {
//                 sieve[j] = false;
//             }
//         }
//     }

//     // 소수만 배열로 반환
//     const primes = [];
//     for (let i = min; i <= max; i++) {
//         if (sieve[i]) {
//             primes.push(i);
//         }
//     }
//     return primes;
// }

// // 실행 예시
// console.time('prime');
// const primes = sieveOfEratosthenes(max);
// console.log(primes.length);
// console.timeEnd('prime');
