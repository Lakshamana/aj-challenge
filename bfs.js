const Graph = require('./graph')
const Heap = require('./heap')

const g = new Graph({
  a: {
    b: 6,
    d: 1
  },
  b: {
    a: 6,
    c: 5,
    d: 2,
    e: 2
  },
  c: {
    b: 5,
    e: 5
  },
  d: {
    a: 1,
    b: 2,
    e: 1
  },
  e: {
    b: 2,
    d: 1,
    c: 5
  }
})

function bfs(g, s, t) {
  const pq = new Heap('w')
  pq.insert({ v: s, w: 0 })
  const visited = [s]
  const evaluated = []
  while (visited.length > 0) {
    console.log(pq.array)
    const r = pq.root()

    if (!r) return

    const {v} = r
    if (v === t) return evaluated
    pq.deleteAt(0)
    evaluated.push(v)

    const adjacents = g.adjacents(v)
    for (const u in adjacents) {
      if (!visited.includes(u)) {
        pq.insert({ v: u, w: adjacents[u] })
        visited.push(u)
      }
    }
  }
}

const s = 'a'
console.log(bfs(s, 'c'))

module.exports = bfs
