import { readInputString } from '../utils.js'

const lines = readInputString('./src/e/input.txt')

const calculateLCM = (arr) => {
  const gcd2 = (a, b) => {
     if(!b) return b===0 ? a : NaN
        return gcd2(b, a%b)
  }

  const lcm2 = (a, b) => {
     return a * b / gcd2(a, b)
  }
  
  let n = 1

  for(let i = 0; i < arr.length; ++i){
     n = lcm2(arr[i], n)
  }

  return n
}

let [n, timeLimit] = lines.shift().split(' ')

timeLimit *= 60

const capacitorsTimeConstant = []

for (let i = 0; i < n; i++) {
  const [r, c] = lines.shift().split(' ')
  capacitorsTimeConstant.push(r * c * 5)
}

let lcm = calculateLCM(capacitorsTimeConstant)
let result

let crossTime = lcm

while (crossTime <= timeLimit) {
  result = 'APROVADO'
  
  capacitorsTimeConstant.forEach(tc => {
    if ((crossTime / tc) % 2 != 0) result = 'REPROVADO'
  })

  if (result == 'APROVADO') crossTime = timeLimit + 1
  else crossTime += lcm
}

console.log(result)