import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/j/input.txt')

const processInput = () => {
  const input = [...originalInput]
  

  const [numberOfIslands, numberOfFerries] = input.shift().split(' ').map(el => +el)

  const islandConnections = new Array(numberOfIslands + 1)
  const ferries = []
  const operations = []

  for (let i = 0; i < numberOfFerries; i++) {
    const connection = input.shift().split(' ').map(el => +el)
    connection.sort()
    
    ferries.push(connection)

    if (!islandConnections[connection[0]]) islandConnections[connection[0]] = []
    islandConnections[connection[0]].push(connection[1])
  }

  const numberOfOperations = input.shift()

  for (let i = 0; i < numberOfOperations; i++) {
    const operation = input.shift().split(' ')
    operations.push(operation)
  }

  return [islandConnections, ferries, operations]
}

const removeConnection = (attackedFerry, islandConnections) => {
  const index = islandConnections[attackedFerry[0]].indexOf(attackedFerry[1])
  islandConnections[attackedFerry[0]].splice(index, 1)
}

const getProtectedIslands = (islandConnections, current=0) => {
  let visitted = new Set()

  if (current != 0)
    visitted.add(current)

  if (!islandConnections[current]) return visitted

  islandConnections[current].forEach(island => {
    visitted = new Set([...visitted, ...getProtectedIslands(islandConnections, island)])
  })

  return visitted
}

const [islandConnections, ferries, operations] = processInput()

operations.forEach(operation => {
  const type = operation[0]
  switch (type) {
    case '1':
      const index = operation[1]
      const attackedFerry = ferries[index - 1]
      removeConnection(attackedFerry, islandConnections)
      break
    case '2':
      const protectedIslands = getProtectedIslands(islandConnections)
      console.log(protectedIslands.size)
      break
  }
})

