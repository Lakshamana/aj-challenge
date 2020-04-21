const Heap = require('./heap')

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

function dijkstra(g, s) {
  let dist = {}, prev = {}
  for (const v in g.vertexes()) {
    dist[v] = 1e6
    prev[v] = undefined
  }

  dist[s] = 0
  const h = new Heap('dist')
  const weights = Object
    .entries(dist)
    .map(([k, v]) => ({ vtx: k, dist: v }))
  h.makeHeap(weights)
  console.log('Initial heap:', h.array)
  while (h.array.length > 0) {
    const { vtx: v } = h.root()
    h.delete(0)
    console.log('Partial heap:', h.array)
    for (const edge in g.edges(v)) {
      const [, u] = edge.split(',')
      if (dist[u] > dist[v] + g.weight(edge)) {
        dist[u] = dist[v] + g.weight(edge)
        prev[u] = v
        const i = h.array.findIndex(x => x.vtx === u)
        h.updateAt(i, { vtx: u, dist: dist[u] })
      }
    }
  }

  for (const v in g.vertexes()) {
    if (v !== s) {
      console.log(`${s} -> ${v}:`)
      printPath(prev, s, v)
      console.log('\n')
    }
  }
}

module.exports = {bfs, dijkstra}
