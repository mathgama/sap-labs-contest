import { readInputString } from '../utils.js'

const lines = readInputString('./src/c/input.txt')

const modulo = 1000000009

const factorialize = (num) => {
  let result = num
   
  if (num === 0 || num === 1) 
    return 1
 
  while (num > 1) { 
    num--
    result = result * num
  }

  return result;
}

let [n, k] = lines.shift().split(' ')

let result = k

for (let i = 0; i < n - 2; i++) {
  result *= (k - 1)
}

result *= (k - 2)

result += factorialize(n)

console.log(result)
console.log(result % modulo)