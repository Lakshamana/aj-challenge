const Graph = require('./graph')
const Heap = require('./heap')

const input = `2
4 2
1 2
1 3
1
3 1
2 3
2`

function processData(ipt) {
  const lines = ipt.split('\n').reduce((acc, v) => [...acc, v.split(' ')])
  const s = lines[lines.length - 1][0]
  const q = +lines[0][0]
  const filteredLines = lines.filter(l => l.length === 2)
  return [
    q,
    filteredLines
      .reduce((acc, l) => {
          const [v, adj] = l
          if (!acc[v]) acc[v] = {}
          acc[v][adj] = 6
          return acc
      }, {}),
    s
  ]
}

function bfs(g, s, t) {
  const pq = new Heap('w')
  pq.insert({ v: s, w: 0 })
  const visited = [s]
  const evaluated = []
  while (visited.length > 0) {
    const r = pq.root()
    if (!r) return -1

    const {v} = r
    evaluated.push(v)
    if (v === t) {
      return sum(g.model, evaluated)
    }
    pq.deleteAt(0)

    const adjacents = g.adjacents(v)
    for (const u in adjacents) {
      if (!visited.includes(u)) {
        pq.insert({ v: u, w: adjacents[u] })
        visited.push(u)
      }
    }
  }
}

function sum(obj, evaluated, idx = 0) {
  const cur = evaluated[idx]
  const next = evaluated[idx + 1]
  if (!next) {
    return 0
  }
  return obj[cur][next] + sum(obj, evaluated, idx + 1)
}

const [queries, model, s] = processData(input)
const g = new Graph(model)
console.log(model)
for (let i = 0; i < queries; i++) {
  const resultList = Object.keys(model)
    .map(v => v !== s && bfs(g, s, v))
    .filter(r => r)
  console.log(resultList.join(' '))
}
