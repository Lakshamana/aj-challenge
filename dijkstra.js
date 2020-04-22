const Heap = require('./heap')
const Graph = require('./graph')

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

function printPath(prev, s, v) {
  if (s === v) {
    process.stdout.write(v)
  } else if (s !== v && !prev[v]) {
    process.stdout.write(`No path from ${s} to v`)
  } else {
    printPath(prev, s, prev[v])
    process.stdout.write(` -> ${v}`)
  }
}

function dijkstra(s) {
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
    h.deleteAt(0)
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

const s = 'a'
dijkstra(s)
