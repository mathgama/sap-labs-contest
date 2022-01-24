import { readInputString } from '../utils.js'
//import { MinPriorityQueue } from 'datastructures-js'

const input = readInputString('./src/a/input.txt')

const [fromX, fromY, toX, toY] = input.shift().split(' ').map(el => +el)
const blocked = input.shift().split(' ').map(el => +el)

const getMove = (x, y, cost) => {
  if (x < 0 || y < 0) return false
  if (x == blocked[0] && y >= blocked[1] && y <= blocked[2]) return false

  return {
    x: x,
    y: y,
    cost: cost+1,
    priority: Math.abs(x - toX) + Math.abs(y - toY)
  }
}

const getPossibleMoves = (x, y, cost) => {
  const moves = []

  moves.push(getMove(x+1, y, cost))
  moves.push(getMove(x-1, y, cost))
  moves.push(getMove(x, y+1, cost))
  moves.push(getMove(x, y-1, cost))

  return moves
}

const getMinimumPath = () => {
  const q = []
  const seen = new Set()

  q.push({ x: fromX, y: fromY, cost: 0, priority: 0 })

  while(q.length > 0) {
    q.sort((a, b) => a.priority - b.priority)
    const cur = q.shift()
    const [x, y, cost] = [cur.x, cur.y, cur.cost]

    const stateString = x + ',' + y
    
    if (!seen.has(stateString)) {
      seen.add(stateString)

      if(x == toX && y == toY)
        return cost
      else
        getPossibleMoves(x, y, cost).forEach(move => {
          if (!move) return
          q.push({ x: move.x, y: move.y, cost: move.cost, priority: move.priority})
        })
    }
  }
}

console.log(getMinimumPath())