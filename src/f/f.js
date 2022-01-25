import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/f/input.txt')

const processInput = () => {
  const board = [...originalInput]
  board.shift()

  const pawns = []

  for (let i = 0; i < board.length; i++) {
    board[i] = board[i].split('')
    
    for (let j = 0; j < board[i].length; j++) if (board[i][j] == 'P') pawns.push([i, j])
  }
  return [board, pawns]
}

const getNumberAttackedPawns = (knightPos, pawns) => {
  let counter = 0
  pawns.forEach(pawn => {
    if (Math.abs(pawn[0] - knightPos[0]) == 1 && Math.abs(pawn[1] - knightPos[1]) == 2)
      counter++
    if (Math.abs(pawn[0] - knightPos[0]) == 2 && Math.abs(pawn[1] - knightPos[1]) == 1)
      counter++
  })
  return counter
}

const removeAttackedPawns = (knightPos, pawns) => {
  for (let i = 0; i < pawns.length; i++) {
    const pawn = pawns[i]

    if (Math.abs(pawn[0] - knightPos[0]) == 1 && Math.abs(pawn[1] - knightPos[1]) == 2) {
      pawns.splice(i, 1)
      i--
    }
    if (Math.abs(pawn[0] - knightPos[0]) == 2 && Math.abs(pawn[1] - knightPos[1]) == 1) {
      pawns.splice(i, 1)
      i--
    }
  }
}

let knightCounter = 0
const [board, pawns] = processInput()

while (pawns.length > 0) {
  let max = 0
  let maxPos

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 'P') continue
      
      const numberAttackedPawns = getNumberAttackedPawns([i, j], pawns)

      if (numberAttackedPawns > max) {
        max = numberAttackedPawns
        maxPos = [i, j]
      }
    }
  }

  if (max == 0) console.log(':(')
  else if (max > 0) {
    removeAttackedPawns(maxPos, pawns)
    knightCounter++
  }
}

console.log(knightCounter)