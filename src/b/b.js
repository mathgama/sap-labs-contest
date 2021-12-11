import { readInputString } from '../utils.js'

const input = readInputString('./src/b/input.txt')

let clusters = input.shift().split(/[0]+/)
let result = 0

clusters = clusters.filter(el => el.length > 0)
clusters.sort((a, b) => b.length - a.length)

clusters.shift()

clusters.forEach(cluster => result += cluster.length)

console.log(result)