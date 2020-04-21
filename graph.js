function Graph(model = {}) {
  this.model = model

  this.edges = v => {
    const edges = {}
    for (const adj in this.model[v]) {
      edges[`${v},${adj}`] = this.model[v][adj]
    }
    return edges
  }

  this.vertexes = () => {
    return this.model
  }

  this.weight = edge => {
    const [v, adj] = edge.split(',')
    return this.model[v][adj]
  }

  this.adjacents = v => {
    return this.model[v]
  }
}

module.exports = Graph
